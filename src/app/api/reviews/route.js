import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET() {
  try {
    await connectDB();

    const reviews = await Review.find().sort({
      createdAt: -1,
    });

    return Response.json({
      success: true,
      reviews,
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

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const review = await Review.create(body);

    return Response.json({
      success: true,
      review,
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