import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const LIMIT = 10;

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || `${LIMIT}`, 10);
    const where = JSON.parse(searchParams.get("where") ?? "{}") || {};

    const take = limit * page;
    const skip = take - limit;

    const vehicles = await prisma.vehicle.findMany({
      where,
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
