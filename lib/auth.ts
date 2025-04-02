import { Role, User } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

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
    return payload as Payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    // const cookieStore = await cookies();
    // cookieStore.delete("session");
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

export const createSession = async (user: User) => {
  const payload: Payload = {
    userId: user.id.toString(),
    role: user.role,
  };

  const cookieStore = await cookies();

  // one day
  const duration = 60 * 60 * 24 * 1000;
  // 7 days
  const refreshTokenDuration = 7 * 24 * 60 * 60 * 1000;

  const accessToken = await encrypt(payload);
  const expires = new Date(Date.now() + duration);

  const refreshToken = await encrypt({
    userId: user.id.toString(),
    role: user.role,
  });

  cookieStore.set("token", accessToken, {
    maxAge: duration,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    expires,
  });

  cookieStore.set("refreshToken", refreshToken, {
    maxAge: refreshTokenDuration,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    expires: new Date(Date.now() + refreshTokenDuration),
    path: "/api/auth/refresh",
  });
};
