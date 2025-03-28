import { Vehicle } from "@/types";

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
