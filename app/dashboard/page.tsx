import { Vehicle } from "@/types";

import VehicleList from "./VehicleList";
import Button from "@/components/Button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function getVehicles(): Promise<{ vehicles: Vehicle[] }> {
  const session = await getServerSession(authOptions);

  const url = new URL(`${process.env.SITE_URL}/api/vehicles`);

  url.searchParams.append(
    "where",
    JSON.stringify({ ownerId: session?.user.id })
  );

  const response = await fetch(url.toString());
  return await response.json();
}

export default async function Dashboard() {
  const { vehicles } = await getVehicles();

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center h-full">
        <h1 className="text-xl font-semibold mb-4">
          Trenutno nemate dodanih vozila
        </h1>
        <Link href="/vehicles/create">
          <Button>Dodaj vozilo</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Vaša vozila</h1>
      <VehicleList vehicles={vehicles} />
    </div>
  );
}
