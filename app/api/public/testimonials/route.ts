import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  await connectDB();

  const testimonials = await Testimonial.find()
    .sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    testimonials,
  });
}