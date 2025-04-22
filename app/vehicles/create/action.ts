import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createS3Client, uploadImageToS3 } from "@/lib/s3";
import { CarType, Fuel, Vehicle } from "@prisma/client";
import { getServerSession } from "next-auth";
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
    description: formData.get("description")?.toString(),
    images: formData.getAll("images"),
    features: {},
    // description: formData.get("description"),
    // ownerId: formData.get("ownerId"),
    // images: formData.getAll("images"),
  };

  const schema = z.object({
    brandId: z.string().nonempty("Molimo odaberite marku vozila"),
    model: z.string().nonempty("Molimo odaberite model vozila"),
    year: z.string().nonempty("Molimo odaberite godište vozila"),
    price: z.string().nonempty("Molimo odaberite cijenu vozila"),
    type: z.string().nonempty("Molimo odaberite tip vozila"),
    typeOfFuel: z.string().nonempty("Molimo odaberite vrstu goriva"),
    color: z.string().nonempty("Molimo odaberite boju vozila"),
    // image files
    images: z.any().refine((files) => {
      if (files.length === 0) {
        return false;
      }
      for (const file of files) {
        if (!(file instanceof File)) {
          return false;
        }
      }
      return true;
    }, "Molimo odaberite slike vozila"),
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

  const body = {
    brandId: parseInt(rawFormData.brandId!),
    model: rawFormData.model as string,
    description: rawFormData.description as string,
    year: parseInt(rawFormData.year!),
    price: parseInt(rawFormData.price!),
    type: rawFormData.type as CarType,
    color: rawFormData.color as string,
    typeOfFuel: rawFormData.typeOfFuel as Fuel,
    numberOfDoors: parseInt(rawFormData.numberOfDoors!),
    numberOfSeats: parseInt(rawFormData.numberOfSeats!),
    features: rawFormData.features,
  };

  try {
    const session = await getServerSession(authOptions);

    let imageUrls: string[] = [];

    if (rawFormData.images.length) {
      const S3Client = createS3Client();

      imageUrls = await Promise.all(
        rawFormData.images.map((file: FormDataEntryValue) =>
          uploadImageToS3(
            S3Client,
            file as File,
            `vehicles/${session?.user.id}`
          )
        )
      );
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        ...body,
        images: {
          create: imageUrls.map((url, i) => ({
            url,
            sort: i,
            isPrimary: i === 0,
          })),
        },
        ownerId: session?.user.id as string,
      },
    });

    return {
      vehicle,
      data: {
        brandId: undefined,
        model: undefined,
        year: undefined,
        price: undefined,
        type: undefined,
        typeOfFuel: undefined,
        numberOfDoors: undefined,
        numberOfSeats: undefined,
        features: {},
      },
      success: true,
      error: null,
      errors: {},
    };
  } catch (error) {
    console.log(error);
    return {
      vehicle: null,
      data: {
        brandId: undefined,
        model: undefined,
        year: undefined,
        price: undefined,
        type: undefined,
        typeOfFuel: undefined,
        numberOfDoors: undefined,
        numberOfSeats: undefined,
        features: {},
      },
      success: false,
      error: { message: "Greška prilikom kreiranja vozila" },
      errors: {},
    };
  }
};

export default createVehicleFn;
