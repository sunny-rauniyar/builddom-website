import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
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

// GET ALL TESTIMONIALS
export async function GET() {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const testimonials = await Testimonial.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      testimonials,
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

// ADD TESTIMONIAL
export async function POST(req: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const body = await req.json();

    const testimonial = await Testimonial.create(body);

    return NextResponse.json({
      success: true,
      testimonial,
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

// UPDATE TESTIMONIAL
export async function PUT(req: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const body = await req.json();

    const testimonial = await Testimonial.findByIdAndUpdate(
      body.id,
      body,
      {
        new: true,
      }
    );

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Testimonial not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      testimonial,
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

// DELETE TESTIMONIAL
export async function DELETE(req: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const { id } = await req.json();

    const deletedTestimonial =
      await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Testimonial not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully",
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