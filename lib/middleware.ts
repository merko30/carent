import { Role } from "@prisma/client";

import { Payload } from "./auth";

export const AUTH_PAGES = ["/login", "/register"];
export const PROTECTED_PAGES = ["/dashboard", "/profile"]; // Add pages that require authentication

// Helper functions for specific checks
export async function checkVehicleOwnership(
  userId: string,
  vehicleId: string
): Promise<boolean> {
  const response = await fetch(
    `${process.env.SITE_URL}/api/vehicles/${vehicleId}`
  );
  const { vehicle } = await response.json();

  return vehicle && vehicle.ownerId.toString() === userId;
}

export async function checkBrandCreatePermission(
  payload: Payload
): Promise<boolean> {
  if (payload.role == Role.ADMIN) {
    return true;
  }

  return false;
}

// Define route patterns and their authorization rules
export const ROUTE_RULES = {
  VEHICLE_EDIT: {
    pattern: /\/vehicles\/(\d+)\/edit/,
    check: async (payload: Payload, matches: RegExpMatchArray) => {
      const vehicleId = matches[1];
      return checkVehicleOwnership(payload.userId, vehicleId);
    },
  },
  BRAND_CREATE: {
    pattern: /\/brands\/create/,
    check: async (payload: Payload) => {
      return checkBrandCreatePermission(payload);
    },
  },
};
