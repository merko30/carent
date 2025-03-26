import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
// import authMiddleware from "~/lib/authMiddleware";

export const POST = async (req: Request) => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = await decrypt(sessionCookie.value);

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
        ownerId: parseInt(userId),
        brandId: parseInt(body.brandId),
        year: parseInt(body.year),
        price: parseInt(body.price),
        numberOfDoors: parseInt(body.numberOfDoors),
        numberOfSeats: parseInt(body.numberOfSeats),
      },
    });

    return NextResponse.json({ vehicle });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
