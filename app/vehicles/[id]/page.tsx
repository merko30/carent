import Image from "next/image";

import Container from "@/components/Container";
import { VehicleWithRating } from "@/types";
import RentalSummary from "@/components/RentalSummary";
import Features from "./Features";
import OwnerInfo from "./OwnerInfo";

const loadVehicle = async (
  id: string
): Promise<{
  vehicle: VehicleWithRating;
}> => {
  const response = await fetch(`${process.env.SITE_URL}/api/vehicles/${id}`);
  const data = await response.json();
  return data;
};

const VehiclePage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { vehicle } = await loadVehicle(params.id);

  if (!vehicle) {
    return null;
  }

  console.log(vehicle);

  return (
    <Container>
      <div className="w-full border-2 border-gray-100 mb-4">
        <div className="relative h-96">
          <Image
            src={
              vehicle.images?.[0]?.url ?? "https://placehold.co/1024x400.png"
            }
            alt={`${vehicle.brand.name}-${vehicle.model}`}
            className="object-cover rounded-lg mb-4"
            fill
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-2/3">
          <h1 className="text-4xl font-semibold mb-6">
            {vehicle?.brand.name} {vehicle?.model}
          </h1>
          <Features vehicle={vehicle} />
          <div className="flex gap-6 items-center py-8 border-y border-gray-300">
            <OwnerInfo owner={vehicle.owner} />
          </div>
          <div className="py-8 border-y border-gray-300">
            <h2 className="text-2xl font-semibold mb-4">Opis</h2>
            <p>{vehicle.description}</p>
          </div>
        </div>
        <div className="w-1/3">
          <RentalSummary vehicle={vehicle} />
        </div>
      </div>
    </Container>
  );
};

export default VehiclePage;
