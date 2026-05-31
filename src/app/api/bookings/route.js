import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Car from "@/models/Car";
import User from "@/models/User";
import nodemailer from "nodemailer";

async function sendBookingEmail(userEmail, car, booking) {
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_FROM) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <div style="font-family:Arial, sans-serif; color:#111; line-height:1.5;">
      <h1>Booking Confirmed</h1>
      <p>Your car rental is confirmed.</p>
      <p><strong>Car:</strong> ${car.name} (${car.brand} ${car.model})</p>
      <p><strong>From:</strong> ${new Date(booking.startDate).toLocaleDateString()}</p>
      <p><strong>To:</strong> ${new Date(booking.endDate).toLocaleDateString()}</p>
      <p><strong>Total:</strong> $${booking.totalPrice}</p>
      <p>Thank you for booking with us.</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: `Booking confirmed: ${car.name}`,
    html,
  });
}

export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get("id");

    await Booking.findByIdAndDelete(bookingId);

    return Response.json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json(
        { success: false, message: "userId is required" },
        { status: 400 }
      );
    }

    const bookings = await Booking.find({ userId }).populate("carId");

    return Response.json({
      success: true,
      bookings,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, carId, startDate, endDate, totalPrice } = body;

    if (!userId || !carId || !startDate || !endDate || !totalPrice) {
      return Response.json(
        { success: false, message: "All booking fields are required." },
        { status: 400 }
      );
    }

    const car = await Car.findById(carId);
    const existingBooking = await Booking.findOne({
  carId,
  $or: [
    {
      startDate: {
        $lte: new Date(endDate),
      },
      endDate: {
        $gte: new Date(startDate),
      },
    },
  ],
});

if (existingBooking) {
  return Response.json(
    {
      success: false,
      message: "Car is already booked for the selected dates.",
    },
    { status: 400 }
  );
}

    const booking = await Booking.create({
      userId,
      carId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice,
      status: "confirmed",
    });

    const userRecord = await User.findById(userId);
    if (userRecord?.email) {
      try {
        await sendBookingEmail(userRecord.email, car, booking);
      } catch (emailError) {
        console.error("Booking email error:", emailError);
      }
    }

    return Response.json({
      success: true,
      booking,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}