import Image from "next/image";

import Container from "@/components/Container";
import FeatureItem from "@/components/FeatureItem";
import { FUEL_TYPE_TRANSLATIONS } from "@/constants/features";
import { Vehicle } from "@/types";

const loadVehicle = async (
  id: string
): Promise<{
  vehicle: Vehicle;
}> => {
  const response = await fetch(`/api/vehicles/${id}`);
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

  return (
    <Container>
      <div>
        <div className="w-full border-2 border-gray-100 mb-4">
          <Image
            src={vehicle.images?.[0]?.url}
            alt={`${vehicle.brand.name}-${vehicle.model}`}
            className="w-full h-96 object-cover rounded-lg mb-4"
          />
        </div>
        <div className="flex gap-4">
          <div className="w-2/3">
            <h1 className="text-4xl font-semibold mb-4">
              {vehicle?.brand.name}
              {vehicle?.model}
            </h1>
            <div className="flex items-center gap-4 pb-4">
              <FeatureItem
                label="Tip goriva"
                value={
                  FUEL_TYPE_TRANSLATIONS[
                    vehicle.typeOfFuel as keyof typeof FUEL_TYPE_TRANSLATIONS
                  ]
                }
              >
                {/* icon */}
                {/* <Fuel /> */}
                icon
              </FeatureItem>
              <FeatureItem value={vehicle.numberOfSeats} label="Broj sjedišta">
                {/* icon */}
                {/* <Armchair /> */}
                icon
              </FeatureItem>
            </div>
            <div className="flex gap-6 items-center py-8 border-y border-gray-300">
              <div className="flex gap-3">
                <p className="text-lg uppercase transform rotate-90 -ml-8">
                  VLASNIK
                </p>
                <Image
                  src="vehicle.owner.avatar || undefined"
                  width="64"
                  height="64"
                  alt={vehicle.owner.username}
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <div>
                <h1 className="text-lg font-medium">
                  {vehicle.owner.username}
                </h1>
                <p>
                  <span>4 vozila</span>
                  <span className="text-gray-500"> | </span>
                  <span className="inline-flex items-center gap-2">
                    4.5 star icon
                    {/* <Star
                    className="inline size-4 fill-orange-300 stroke-orange-300"
                  /> */}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="p-4">
              <h2 className="text-2xl font-semibold leading-snug">
                <span className="text-orange-400 font-semibold">total KM</span>
                ukupno
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                {vehicle.price} KM po danu
              </p>
              <hr className="text-gray-300 my-5" />
              date pickers
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VehiclePage;
