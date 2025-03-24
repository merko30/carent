import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const vehicles = await prisma.vehicle.findMany({
    include: {
      brand: true,
      images: true,
    },
  });

  return NextResponse.json({ vehicles });
};
