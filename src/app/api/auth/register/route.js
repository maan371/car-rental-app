import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();

    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return Response.json(
      {
        success: true,
        message: "User registered successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
  console.error("REGISTER ERROR:", error);

  return Response.json(
    {
      success: false,
      message: error.message,
    },
    { status: 500 }
  );
}
}