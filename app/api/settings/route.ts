import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Setting from "@/models/Setting";
import { getAdmin } from "@/lib/auth";

// CHECK ADMIN AUTHENTICATION
async function requireAdmin() {
  const admin = await getAdmin();

  if (!admin) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  return null;
}

// GET SETTINGS
export async function GET() {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

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

// UPDATE SETTINGS
export async function PUT(req: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const body = await req.json();

    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create(body);
    } else {
      settings = await Setting.findByIdAndUpdate(
        settings._id,
        body,
        {
          new: true,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
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