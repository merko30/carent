import { NextRequest, NextResponse } from "next/server";

import { decrypt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  const token = req.cookies.get("session");

  console.log("token auth", token);

  if (!token?.value) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  try {
    const { userId } = await decrypt(token.value);

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      omit: { password: true },
    });

    if (!user) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    return NextResponse.json({ isAuthenticated: true, user });
  } catch {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
};
