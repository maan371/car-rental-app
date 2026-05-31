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
    const isAdmin = body.isAdmin === true || body.role === "admin";

    if (!isAdmin) {
      return Response.json(
        { success: false, message: "Unauthorized: admin access required" },
        { status: 401 }
      );
    }

    const requiredFields = [
      "name",
      "brand",
      "model",
      "year",
      "type",
      "pricePerDay",
      "image",
      "description",
    ];
    const missingField = requiredFields.find((field) => !body[field]);

    if (missingField) {
      return Response.json(
        { success: false, message: `${missingField} is required` },
        { status: 400 }
      );
    }

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