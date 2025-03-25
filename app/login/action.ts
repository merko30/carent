"use server";

import { ERRORS } from "@/constants/errors";
import { createSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export type LoginResponse = {
  success: boolean;
  errors: Record<string, string>;
  error: { message: string } | null;
};

export default async function loginFn(
  _: LoginResponse,
  formData: FormData
): Promise<LoginResponse> {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const schema = z.object({
    email: z.string().email("Email adresa nije validna"),
    password: z.string().min(6, "Lozinka mora imati najmanje 6 karaktera"),
  });

  const validation = schema.safeParse(rawFormData);

  if (!validation.success) {
    const errors = validation.error.issues.reduce(
      (acc: Record<string, string>, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      },
      {}
    );
    return { errors, success: false, error: null };
  }

  const user = await prisma.user.findUnique({
    where: { email: rawFormData.email?.toString() },
  });

  if (!user) {
    return {
      error: { message: ERRORS.INVALID_CREDENTIALS.message },
      success: false,
      errors: {},
    };
  }

  const passwordMatch = await bcrypt.compare(
    rawFormData.password!.toString(),
    user.password
  );

  if (!passwordMatch) {
    return {
      error: { message: ERRORS.INVALID_CREDENTIALS.message },
      success: false,
      errors: {},
    };
  }

  const token = await createSession({
    id: user.id.toString(),
    // roles: user.roles,
  });

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });

  // navigate
  redirect("/dashboard");
  return {
    success: true,
    errors: {},
    error: null,
  };
}
