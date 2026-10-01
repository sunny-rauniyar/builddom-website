import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
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

// GET ALL PROJECTS
export async function GET() {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const projects = await Project.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      projects,
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

// ADD PROJECT
export async function POST(req: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const body = await req.json();

    const project = await Project.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        project,
      },
      {
        status: 201,
      }
    );
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

// UPDATE PROJECT
export async function PUT(req: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const body = await req.json();

    const updatedProject = await Project.findByIdAndUpdate(
      body.id,
      {
        title: body.title,
        category: body.category,
        location: body.location,
        image: body.image,
        description: body.description,
        featured: body.featured,
      },
      {
        new: true,
      }
    );

    if (!updatedProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      project: updatedProject,
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

// DELETE PROJECT
export async function DELETE(req: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const { id } = await req.json();

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
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