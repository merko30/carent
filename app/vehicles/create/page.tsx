import Container from "@/components/Container";

import { Brand } from "@/types";

import Form from "@/components/VehicleForm";

import action from "./action";

const loadBrands = async (): Promise<{ brands: Brand[] }> => {
  const response = await fetch(`${process.env.SITE_URL}/api/brands`);
  return response.json();
};

const CreateVehicle = async () => {
  const { brands } = await loadBrands();

  return (
    <Container>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold mb-8">Dodaj novo vozilo</h1>
        <Form brands={brands} actionFn={action} />
      </div>
    </Container>
  );
};

export default CreateVehicle;
