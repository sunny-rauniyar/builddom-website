import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";

export async function GET() {
  await connectDB();

  const services = await Service.find()
    .sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    services,
  });
}