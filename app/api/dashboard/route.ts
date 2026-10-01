import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import Project from "@/models/Project";
import Service from "@/models/Service";
import Team from "@/models/Team";
import Testimonial from "@/models/Testimonial";
import Contact from "@/models/Contact";

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

// GET DASHBOARD STATISTICS
export async function GET() {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const [
      totalProjects,
      totalServices,
      totalTeam,
      totalTestimonials,
      totalMessages,
    ] = await Promise.all([
      Project.countDocuments(),
      Service.countDocuments(),
      Team.countDocuments(),
      Testimonial.countDocuments(),
      Contact.countDocuments(),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalProjects,
        totalServices,
        totalTeam,
        totalTestimonials,
        totalMessages,
      },
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