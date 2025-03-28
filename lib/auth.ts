import { Role, User } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type Payload = {
  userId: string;
  expires: number;
  role: Role;
};

export const decrypt = async (token: string) => {
  console.log("Received token:", token); // Log token to verify it is a valid JWT string

  if (typeof token !== "string" || token.trim() === "") {
    throw new Error("Invalid token format. Token must be a non-empty string.");
  }

  const secretEnv = process.env.JWT_SECRET;

  if (!secretEnv) {
    throw new Error("JWT secret is not defined.");
  }

  const secret = new TextEncoder().encode(secretEnv as string);

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as Payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    const cookieStore = await cookies();
    cookieStore.delete("session");
    throw new Error("Failed to verify the token.");
  }
};

const encrypt = (payload: Payload) => {
  const secretEnv = process.env.JWT_SECRET;
  const secret = new TextEncoder().encode(secretEnv as string);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(secret);
};

export const createSession = async (user: User) => {
  const payload: Payload = {
    expires: Date.now() * 60 * 60 * 24,
    userId: user.id.toString(),
    role: user.role,
  };

  const cookieStore = await cookies();

  const duration = 60 * 60 * 24 * 1000;

  const session = await encrypt(payload);
  const expires = new Date(Date.now() + duration);

  cookieStore.set("session", session, {
    maxAge: duration,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    expires,
  });
};
