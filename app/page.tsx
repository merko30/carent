import Hero from "@/components/Hero";
import VehicleList from "@/components/VehicleList";
import { Vehicle } from "@/types";

const loadVehicles = async (): Promise<{
  vehicles: Vehicle[];
}> => {
  const response = await fetch(`${process.env.SITE_URL}/api/vehicles`);
  return response.json();
};

export default async function Home() {
  const { vehicles } = await loadVehicles();

  return (
    <>
      <Hero />
      <VehicleList vehicles={vehicles} />
    </>
  );
}
