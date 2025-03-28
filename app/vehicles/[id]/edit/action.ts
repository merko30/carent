import { CarType, Fuel, Vehicle } from "@prisma/client";
import { z } from "zod";

interface VehicleFormData {
  brandId?: string;
  model?: string;
  year?: string;
  price?: string;
  type?: string;
  typeOfFuel?: string;
  numberOfDoors?: string;
  numberOfSeats?: string;
  color?: string;
  features: Record<string, string | boolean | number>;
  description?: string;
}

export interface State {
  errors: Record<string, string>;
  success: boolean;
  error: { message: string } | null;
  vehicle: Vehicle | null;
  data?: VehicleFormData;
}

const createVehicleFn = async (
  id: string,
  state: State,
  formData: FormData
): Promise<State> => {
  "use server";
  const rawFormData = {
    brandId: formData.get("brandId")?.toString(),
    model: formData.get("model")?.toString(),
    year: formData.get("year")?.toString(),
    price: formData.get("price")?.toString(),
    type: formData.get("type")?.toString(),
    typeOfFuel: formData.get("typeOfFuel")?.toString(),
    color: formData.get("color")?.toString(),
    numberOfDoors: formData.get("numberOfDoors")?.toString(),
    numberOfSeats: formData.get("numberOfSeats")?.toString(),
    features: {},
    // description: formData.get("description"),
    // ownerId: formData.get("ownerId"),
    // images: formData.getAll("images"),
  };

  console.log("VEHICLE ID", id);

  const schema = z.object({
    brandId: z.string().nonempty("Molimo odaberite marku vozila"),
    model: z.string().nonempty("Molimo odaberite model vozila"),
    year: z.string().nonempty("Molimo odaberite godište vozila"),
    price: z.string().nonempty("Molimo odaberite cijenu vozila"),
    type: z.string().nonempty("Molimo odaberite tip vozila"),
    typeOfFuel: z.string().nonempty("Molimo odaberite vrstu goriva"),
    // numberOfDoors: z.string().nonempty("Morate uneti broj vrata"),
    // numberOfSeats: z.string().nonempty("Morate uneti broj sedišta"),
  });

  const validation = schema.safeParse(rawFormData);

  if (!validation.success) {
    const errors = validation.error.issues.reduce(
      (acc: Record<string, string>, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      },
      {}
    );
    return {
      errors,
      data: rawFormData,
      success: false,
      error: null,
      vehicle: null,
    };
  }

  const response = await fetch(`${process.env.SITE_URL}/api/vehicles/${id}`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({
      brandId: parseInt(rawFormData.brandId!),
      model: rawFormData.model,
      year: parseInt(rawFormData.year!),
      price: parseInt(rawFormData.price!),
      type: rawFormData.type as CarType,
      color: rawFormData.color,
      typeOfFuel: rawFormData.typeOfFuel as Fuel,
      numberOfDoors: parseInt(rawFormData.numberOfDoors!),
      numberOfSeats: parseInt(rawFormData.numberOfSeats!),
      features: rawFormData.features,
    }),
  });

  if (!response.ok) {
    return {
      vehicle: null,
      data: rawFormData,
      success: false,
      error: { message: "Došlo je do greške" },
      errors: {},
    };
  }

  const { vehicle } = await response.json();

  return {
    vehicle,
    data: vehicle,
    success: true,
    error: null,
    errors: {},
  };
};

export default createVehicleFn;
