import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { getUserFromToken } from "@/lib/authMiddleware";

// GET all bookings
export async function GET(request) {
  try {
    await connectDB();

    const user = getUserFromToken(request);

    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const bookings = await Booking.find({ userId: user.userId })
      .populate("carId");

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

// CREATE booking
export async function POST(request) {
  try {
    await connectDB();

    const user = getUserFromToken(request);

    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const booking = await Booking.create({
      userId: user.userId,
      carId: body.carId,
      startDate: body.startDate,
      endDate: body.endDate,
      totalPrice: body.totalPrice,
    });

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