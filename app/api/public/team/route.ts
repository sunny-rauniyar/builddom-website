import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Team from "@/models/Team";

export async function GET() {
  await connectDB();

  const team = await Team.find()
    .sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    team,
  });
}