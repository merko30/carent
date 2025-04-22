import Image from "next/image";

import Container from "@/components/Container";
import RentalSummary from "@/components/RentalSummary";

import { VehicleWithRating } from "@/types";

import Features from "./Features";
import OwnerInfo from "./OwnerInfo";
import EditLink from "./EditLink";

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
  const { id } = await params;
  const { vehicle } = await loadVehicle(id);

  if (!vehicle) {
    return null;
  }

  return (
    <Container>
      <div className="w-full border-2 border-gray-100 mb-4">
        <div className="relative h-96">
          <Image
            src={`/api/image/${vehicle.images[0].url}`}
            alt={`${vehicle.brand.name}-${vehicle.model}`}
            className="object-cover rounded-lg mb-4"
            fill
            priority
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-semibold">
              {vehicle?.brand.name} {vehicle?.model}
            </h1>
            <EditLink vehicle={vehicle} />
          </div>
          <Features vehicle={vehicle} />
          <div className="flex gap-6 items-center py-8 border-y border-gray-300">
            <OwnerInfo owner={vehicle.owner} />
          </div>
          {vehicle.description && (
            <div className="py-8 border-b border-gray-300">
              <h2 className="text-xl font-semibold mb-4">Opis</h2>
              <p>{vehicle.description}</p>
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/3">
          <RentalSummary vehicle={vehicle} />
        </div>
      </div>
    </Container>
  );
};

export default VehiclePage;
