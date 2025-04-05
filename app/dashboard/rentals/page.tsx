import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import RentalList from "./RentalList";

import { RentingVehiclesWithVehicle } from "@/types";

const loadRentals = async (): Promise<{
  rentals: RentingVehiclesWithVehicle[];
}> => {
  const session = await getServerSession(authOptions);
  const rentals = await prisma.rentingVehicles.findMany({
    where: {
      vehicle: {
        ownerId: session?.user.id,
      },
    },
    include: {
      vehicle: {
        include: {
          owner: true,
          brand: true,
          images: true,
        },
      },
    },
  });

  return { rentals };
};

const Rentals = async () => {
  const { rentals } = await loadRentals();

  return <RentalList rentals={rentals} />;
};

export default Rentals;
