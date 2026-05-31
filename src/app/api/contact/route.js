import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";

export async function POST(request) {
try {
await connectDB();

const body = await request.json();

const { name, email, message } = body;

if (!name || !email || !message) {
  return Response.json(
    {
      success: false,
      message: "All fields are required",
    },
    { status: 400 }
  );
}

const contact = await Contact.create({
  name,
  email,
  message,
});

if (
  process.env.EMAIL_HOST &&
  process.env.EMAIL_USER &&
  process.env.EMAIL_PASS
) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
  from: process.env.EMAIL_FROM,
  to: process.env.EMAIL_USER,
  subject: "New Contact Message",
  html: `
    <div style="font-family: Arial, sans-serif;">
      <h2>New Customer Message</h2>

      <p><strong>Name:</strong> ${name}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Message:</strong></p>

      <p>${message}</p>
    </div>
  `,
});
}

return Response.json({
  success: true,
  contact,
});

} catch (error) {
  console.error("CONTACT ERROR:", error);

  return Response.json(
    {
      success: false,
      message: error.message,
    },
    { status: 500 }
  );
}
}
