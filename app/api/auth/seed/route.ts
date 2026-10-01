import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: "Admin seed endpoint is disabled.",
    },
    {
      status: 403,
    }
  );
}