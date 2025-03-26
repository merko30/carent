import type { Vehicle as _Vehicle, CarType, Fuel } from "@prisma/client";

export interface Brand {
  id: number;
  name: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
}

interface VehicleImage {
  id: number;
  url: string;
}

export interface Vehicle extends _Vehicle {
  brand: Brand;
  type: CarType;
  typeOfFuel: Fuel;
  owner: User;
  images: VehicleImage[];
}
