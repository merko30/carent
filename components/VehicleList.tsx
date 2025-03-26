import Image from "next/image";
import Link from "next/link";

import { Vehicle } from "@/types";
import Container from "./Container";

const VehicleList = ({ vehicles }: { vehicles: Vehicle[] }) => (
  <Container>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
      {vehicles.map((vehicle) => (
        <Link
          key={vehicle.id}
          href={`/vehicles/${vehicle.id}`}
          className="bg-gray-50 p-4 rounded-md"
        >
          <div className="w-full h-48 relative">
            <Image
              src={vehicle.images?.[0]?.url}
              alt={`${vehicle.brand.name}-${vehicle.model}`}
              className="object-cover rounded-md"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {vehicle.brand.name} {vehicle.model}
            </h2>
            <p>
              {vehicle.price} KM
              <span className="text-gray-500 text-sm">/po danu</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  </Container>
);

export default VehicleList;
