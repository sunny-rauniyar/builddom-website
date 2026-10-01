import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Team from "@/models/Team";
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

// GET ALL TEAM MEMBERS
export async function GET() {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const team = await Team.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      team,
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

// ADD TEAM MEMBER
export async function POST(req: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const body = await req.json();

    const member = await Team.create(body);

    return NextResponse.json({
      success: true,
      member,
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

// UPDATE TEAM MEMBER
export async function PUT(req: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const body = await req.json();

    const member = await Team.findByIdAndUpdate(
      body.id,
      body,
      {
        new: true,
      }
    );

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          message: "Team member not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      member,
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

// DELETE TEAM MEMBER
export async function DELETE(req: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const { id } = await req.json();

    const deletedMember = await Team.findByIdAndDelete(id);

    if (!deletedMember) {
      return NextResponse.json(
        {
          success: false,
          message: "Team member not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Team member deleted successfully",
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