import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const response = NextResponse.redirect(
    new URL("/admin/login", req.url)
  );

  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}