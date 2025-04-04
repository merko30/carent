import { NextResponse } from "next/server";

import { Payload, routeAuthMiddleware } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  const payload = await routeAuthMiddleware();

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt((payload as Payload).userId) },
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
