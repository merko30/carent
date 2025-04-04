import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { Payload, routeAuthMiddleware } from "@/lib/auth";

export const POST = async (req: Request) => {
  const payload = await routeAuthMiddleware();

  const body = await req.json();

  if (!body) {
    return NextResponse.json(
      { error: "Please provide a body" },
      { status: 400 }
    );
  }

  try {
    console.log(body);

    const vehicle = await prisma.vehicle.create({
      data: {
        ...body,
        ownerId: parseInt((payload as Payload).userId),
      },
    });

    return NextResponse.json({ vehicle });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
