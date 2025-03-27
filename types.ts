import type { Vehicle as _Vehicle, CarType, Fuel } from "@prisma/client";

export interface Brand {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
}

interface VehicleImage {
  id: number;
  url: string;
}

export interface Owner extends User {
  rating: number;
  _count: {
    vehicles: number;
  };
}

export interface Vehicle extends _Vehicle {
  brand: Brand;
  type: CarType;
  typeOfFuel: Fuel;
  owner: Owner;
  images: VehicleImage[];
}

export interface VehicleWithRating extends Vehicle {
  rating: number;
}
