import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  if (!body) {
    return NextResponse.json(
      { error: "Please provide a body" },
      { status: 400 }
    );
  }

  try {
    const brand = await prisma.brand.create({
      data: body,
    });

    return NextResponse.json({ brand });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
