import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { ERRORS } from "@/constants/errors";

export const POST = async (req: Request) => {
  const body = await req.json();

  console.log("Received body:", body);

  const { username, email, password } = body;

  if (!username || !email || !password) {
    return NextResponse.json(
      { error: ERRORS.MISSING_CREDENTIALS },
      { status: 400 }
    );
  }

  const user = {
    username,
    email,
    password,
  };

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ user: createdUser });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message?.toLowerCase().includes("unique")) {
      return NextResponse.json(
        { error: ERRORS.EMAIL_ALREADY_EXISTS },
        { status: 400 }
      );
    }

    console.log("Failed to create user:", error);

    return NextResponse.json({
      statusCode: 400,
      statusMessage: ERRORS.FAILED_TO_CREATE_USER.key,
    });
  }
};
