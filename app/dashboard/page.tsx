import { cookies } from "next/headers";

import { decrypt } from "@/lib/auth";
import { Vehicle } from "@/types";

import VehicleList from "./VehicleList";
import Button from "@/components/Button";
import Link from "next/link";

async function getVehicles(): Promise<{ vehicles: Vehicle[] }> {
  const sessionCookie = (await cookies()).get("token");
  const session = await decrypt(sessionCookie!.value);
  const response = await fetch(`${process.env.SITE_URL}/api/vehicles`, {
    method: "POST",
    body: JSON.stringify({
      ownerId: { equals: parseInt(session?.userId) },
    }),
  });
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
