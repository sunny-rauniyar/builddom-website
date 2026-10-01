import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getAdmin } from "@/lib/auth";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

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

export async function POST(req: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    const body = await req.json();
    const file = body.image;

    if (!file || typeof file !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Valid image is required.",
        },
        { status: 400 }
      );
    }

    // Only accept data URLs
    if (!file.startsWith("data:image/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Only image files are allowed.",
        },
        { status: 400 }
      );
    }

    // Estimate decoded file size from Base64 data
    const base64Data = file.split(",")[1];

    if (!base64Data) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid image data.",
        },
        { status: 400 }
      );
    }

    const estimatedSize = Math.ceil((base64Data.length * 3) / 4);

    if (estimatedSize > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "Image must be smaller than 5 MB.",
        },
        { status: 400 }
      );
    }

    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: "builddom/projects",
      resource_type: "image",
    });

    return NextResponse.json({
      success: true,
      imageUrl: uploadResponse.secure_url,
    });
  } catch (error) {
    console.error("UPLOAD API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed. Please try again.",
      },
      { status: 500 }
    );
  }
}