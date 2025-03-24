import { cookies } from "next/headers";

import { decrypt } from "@/lib/auth";

export const GET = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session");

  if (!token) {
    return { isAuthenticated: false };
  }

  try {
    const { userId } = await decrypt(token.value);
    return { isAuthenticated: !!userId };
  } catch {
    return { isAuthenticated: false };
  }
};
