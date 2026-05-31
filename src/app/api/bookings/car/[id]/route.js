import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET(request, { params }) {
  await connectDB();

  const { id } = await params;

  const bookings = await Booking.find({
    carId: id,
  });

  return Response.json({
    success: true,
    bookings,
  });
}