import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const LIMIT = 10;

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const {
      page = 1,
      limit = LIMIT,
      ...params
    } = body || {
      page: 1,
      limit: LIMIT,
    };

    const take = limit * page;
    const skip = take - limit;

    const vehicles = await prisma.vehicle.findMany({
      where: params,
      include: {
        brand: true,
        images: true,
      },
      take,
      skip,
    });

    return NextResponse.json({ vehicles });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while fetching vehicles." },
      { status: 500 }
    );
  }
};
