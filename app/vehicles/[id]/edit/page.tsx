import { Brand } from "@prisma/client";
import { notFound, unauthorized } from "next/navigation";
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

  const vehicleResponse = await fetch(
    `${process.env.SITE_URL}/api/vehicles/${id}`
  );

  const data = await vehicleResponse.json();

  if (!data) {
    return notFound();
  }

  if (data && data.ownerId && data.ownerId !== session?.user.id) {
    console.log("Unauthorized access attempt:", {
      userId: session?.user.id,
      vehicleOwnerId: data.ownerId,
    });

    return unauthorized();
  }

  return data;
};

const loadBrands = async (): Promise<Brand[]> => {
  const brandsResponse = await fetch(`${process.env.SITE_URL}/api/brands`);
  const brandsData = await brandsResponse.json();

  if (!brandsData) {
    return notFound();
  }

  return brandsData?.brands ?? [];
};

const EditVehiclePage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = await params;
  const { vehicle } = await loadVehicle(id);
  const brands = await loadBrands();

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
