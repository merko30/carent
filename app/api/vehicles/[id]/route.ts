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
      owner: {
        include: {
          _count: {
            select: { vehicles: true },
          },
        },
      },
    },
  });

  if (!vehicle) {
    return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
  }

  const ownerRating = await prisma.review.aggregate({
    where: {
      recipientId: vehicle.ownerId,
    },
    _avg: {
      rating: true,
    },
  });

  return NextResponse.json({
    vehicle: {
      ...vehicle,
      owner: {
        ...vehicle.owner,
        rating: ownerRating._avg.rating,
      },
    },
  });
};
