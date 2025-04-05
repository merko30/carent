import { Brand } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { VehicleWithRating } from "@/types";
import { authOptions } from "@/lib/auth";

import VehicleForm from "@/components/VehicleForm";
import Container from "@/components/Container";

import action from "./action";

const loadVehicle = async (
  id: string
): Promise<{
  vehicle: VehicleWithRating;
  brands: Brand[];
}> => {
  const session = await getServerSession(authOptions);

  const [vehicleResponse, brandsResponse] = await Promise.all([
    fetch(`${process.env.SITE_URL}/api/vehicles/${id}`),
    fetch(`${process.env.SITE_URL}/api/brands`),
  ]);

  const brandsData = await brandsResponse.json();
  const data = await vehicleResponse.json();

  if (!data || session?.user.id !== data.ownerId) {
    return notFound();
  }

  return { ...data, brands: brandsData.brands ?? [] };
};

const EditVehiclePage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = await params;
  const { vehicle, brands } = await loadVehicle(id);

  if (!vehicle) {
    return redirect("/404");
  }

  return (
    <Container className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6">Uredi vozilo</h1>
      <VehicleForm
        brands={brands}
        actionFn={action.bind(null, id)}
        data={vehicle}
      />
    </Container>
  );
};

export default EditVehiclePage;
