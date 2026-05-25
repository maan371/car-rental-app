import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";

// GET all cars
export async function GET() {
  try {
    await connectDB();

    const cars = await Car.find();

    return Response.json({
      success: true,
      cars,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// ADD car
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const car = await Car.create(body);

    return Response.json({
      success: true,
      car,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}