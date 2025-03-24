import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { ERRORS } from "@/constants/errors";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: ERRORS.MISSING_CREDENTIALS },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { error: ERRORS.INVALID_CREDENTIALS },
      { status: 404 }
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json(
      { error: ERRORS.INVALID_CREDENTIALS },
      { status: 404 }
    );
  }

  const token = await createSession({
    id: user.id.toString(),
    // roles: user.roles,
  });

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;

  return NextResponse.json({ user: userWithoutPassword });
};
