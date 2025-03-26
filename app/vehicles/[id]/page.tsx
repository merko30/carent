import Image from "next/image";
import { Seat, GasPump, Star } from "@phosphor-icons/react/dist/ssr";

import Container from "@/components/Container";
import FeatureItem from "@/components/FeatureItem";

import { FUEL_TYPE_TRANSLATIONS } from "@/constants/features";
import { Vehicle } from "@/types";

const loadVehicle = async (
  id: string
): Promise<{
  vehicle: Vehicle;
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

  const vehicleCount = vehicle.owner._count?.vehicles ?? 1;
  const vehicleSinglePluralLabel = vehicleCount === 1 ? "vozilo" : "vozila";
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
          <div className="flex items-center gap-4 pb-4">
            <FeatureItem
              label="Tip goriva"
              value={
                FUEL_TYPE_TRANSLATIONS[
                  vehicle.typeOfFuel as keyof typeof FUEL_TYPE_TRANSLATIONS
                ]
              }
            >
              <GasPump size={24} />
            </FeatureItem>
            <FeatureItem
              value={vehicle.numberOfSeats as number}
              label="Broj sjedišta"
            >
              <Seat size={24} />
            </FeatureItem>
          </div>
          <div className="flex gap-6 items-center py-8 border-y border-gray-300">
            <div className="flex gap-3">
              <p className="text-lg uppercase transform rotate-90 -ml-8">
                VLASNIK
              </p>
              <Image
                src={vehicle.owner.avatar ?? "https://placehold.co/64x64.png"}
                width="64"
                height="64"
                alt={vehicle.owner.username}
                className="w-16 h-16 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-lg font-medium">{vehicle.owner.username}</h1>
              <p>
                <span>
                  {vehicle.owner._count!.vehicles} {vehicleSinglePluralLabel}
                </span>
                <span className="text-gray-500"> | </span>
                <span className="inline-flex items-center gap-2">
                  4.5
                  <Star weight="fill" fill="gold" />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="p-4">
            <h2 className="text-2xl font-semibold leading-snug">
              <span className="text-orange-400 font-semibold">
                {vehicle.price} KM
              </span>{" "}
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
    </Container>
  );
};

export default VehiclePage;
