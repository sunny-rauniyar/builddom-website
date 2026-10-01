import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface AdminToken {
  id: string;
  email: string;
}

export async function getAdmin(): Promise<AdminToken | null> {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET is not configured.");
      return null;
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof decoded.id !== "string" ||
      typeof decoded.email !== "string"
    ) {
      return null;
    }

    return {
      id: decoded.id,
      email: decoded.email,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}