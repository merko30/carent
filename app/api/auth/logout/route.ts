import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set("session", "", {
    path: "/",
    maxAge: 0, // Expires immediately
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
