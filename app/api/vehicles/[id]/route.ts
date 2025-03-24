import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Please provide a vehicle id" },
      { status: 400 }
    );
  }

  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      brand: true,
      images: true,
      owner: true,
    },
  });

  if (!vehicle) {
    return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
  }

  return NextResponse.json({ vehicle });
};
