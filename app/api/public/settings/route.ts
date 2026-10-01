import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Setting from "@/models/Setting";

export async function GET() {
  try {
    await connectDB();

    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({});
    }

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}