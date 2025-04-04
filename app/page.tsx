import Hero from "@/components/Hero";
import VehicleList from "@/components/VehicleList";
import { Vehicle } from "@/types";

const loadVehicles = async (): Promise<{
  vehicles: Vehicle[];
}> => {
  const response = await fetch(`${process.env.SITE_URL}/api/vehicles`, {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  console.log(json);

  return json;
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
