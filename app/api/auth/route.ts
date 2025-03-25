import { cookies } from "next/headers";

import { decrypt } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session");

  if (!token) {
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
