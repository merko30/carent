import { Role, User } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export type Payload = {
  userId: string;
  role: Role;
};

const getSecret = () => {
  const secretEnv = process.env.JWT_SECRET;
  if (!secretEnv) {
    throw new Error("JWT secret is not defined.");
  }
  return new TextEncoder().encode(secretEnv as string);
};

export const decrypt = async (token: string) => {
  console.log("Received token:", token); // Log token to verify it is a valid JWT string

  if (typeof token !== "string" || token.trim() === "") {
    throw new Error("Invalid token format. Token must be a non-empty string.");
  }

  const secret = getSecret();

  try {
    const { payload } = await jwtVerify(token, secret);

    const nowInSeconds = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp - nowInSeconds < 5 * 60) {
      await createSession({
        id: payload.userId,
        role: payload.role,
      } as Partial<User>);
    }

    return payload as Payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    // const cookieStore = await cookies();
    // cookieStore.delete("token");
    throw new Error("Failed to verify the token.");
  }
};

const encrypt = (payload: Payload) => {
  const secret = getSecret();

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME as string)
    .sign(secret);
};

export const createSession = async (user: Partial<User>) => {
  const payload: Payload = {
    userId: user.id!.toString(),
    role: user.role!,
  };

  const cookieStore = await cookies();

  // one day
  const duration = 60 * 60 * 24 * 1000;

  const accessToken = await encrypt(payload);
  const expires = new Date(Date.now() + duration);

  cookieStore.set("token", accessToken, {
    maxAge: duration,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    expires,
  });

  // 7 days
  const refreshTokenDuration = 7 * 24 * 60 * 60 * 1000;
  const refreshToken = await encrypt({
    userId: user.id!.toString(),
    role: user.role!,
  });
  cookieStore.set("refreshToken", refreshToken, {
    maxAge: refreshTokenDuration,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    expires: new Date(Date.now() + refreshTokenDuration),
    path: "/api/auth/refresh",
  });
};

export const routeAuthMiddleware = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("token");

  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return await decrypt(sessionCookie.value);
};
