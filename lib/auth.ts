import { SignJWT, jwtVerify } from "jose";

type Payload = {
  userId: string;
  expires: number;
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
    throw new Error("Failed to verify the token.");
  }
};

const encrypt = (payload: Payload) => {
  const secretEnv = process.env.JWT_SECRET;
  const secret = new TextEncoder().encode(secretEnv as string);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expires)
    .sign(secret);
};

export const createSession = (user: { id: string }) => {
  const payload: Payload = {
    expires: Date.now() + 1000 * 60 * 60 * 24,
    userId: user.id,
  };

  return encrypt(payload);
};
