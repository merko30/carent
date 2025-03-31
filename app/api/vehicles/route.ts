import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const LIMIT = 10;

export const POST = async (request: Request) => {
  const { page = 1, limit = LIMIT, ...params } = (await request.json()) || {};

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
};
