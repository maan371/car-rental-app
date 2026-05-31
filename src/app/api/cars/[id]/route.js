import connectDB from "@/lib/mongodb";
import Car from "@/models/Car";

export async function GET(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const car = await Car.findById(id);

    if (!car) {
      return Response.json(
        {
          success: false,
          message: "Car not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      car,
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

export async function DELETE(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const car = await Car.findByIdAndDelete(id);

    if (!car) {
      return Response.json(
        {
          success: false,
          message: "Car not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Car deleted successfully",
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

export async function PATCH(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const body = await request.json();

    const car = await Car.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!car) {
      return Response.json(
        {
          success: false,
          message: "Car not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      car,
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