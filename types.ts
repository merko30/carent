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

export enum TypeOfFuel {
  GASOLINE = "GASOLINE",
  DIESEL = "DIESEL",
  ELECTRIC = "ELECTRIC",
  HYBRID = "HYBRID",
}

export enum Type {
  SEDAN = "SEDAN",
  COUPE = "COUPE",
  HATCHBACK = "HATCHBACK",
  CONVERTIBLE = "CONVERTIBLE",
  SUV = "SUV",
  TRUCK = "TRUCK",
  VAN = "VAN",
}

export interface Vehicle {
  id: number;
  model: string;
  brand: Brand;
  brandId: number;
  type: Type;
  numberOfDoors: number;
  numberOfSeats: number;
  color: string;
  owner: User;
  features: Record<string, boolean | string | number>;
  typeOfFuel: TypeOfFuel;
  images: VehicleImage[];
  year: number;
  price: number;
}
