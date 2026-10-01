import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
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

// GET ALL SERVICES
export async function GET() {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const services = await Service.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      services,
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

// ADD SERVICE
export async function POST(req: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const body = await req.json();

    const service = await Service.create(body);

    return NextResponse.json({
      success: true,
      service,
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

// UPDATE SERVICE
export async function PUT(req: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const body = await req.json();

    const service = await Service.findByIdAndUpdate(
      body.id,
      body,
      {
        new: true,
      }
    );

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          message: "Service not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      service,
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

// DELETE SERVICE
export async function DELETE(req: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const { id } = await req.json();

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return NextResponse.json(
        {
          success: false,
          message: "Service not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service deleted",
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