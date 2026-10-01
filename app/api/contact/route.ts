import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and message are required.",
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    // Prevent excessively large submissions
    if (
      name.length > 100 ||
      email.length > 150 ||
      phone.length > 30 ||
      subject.length > 200 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "One or more fields are too long.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}