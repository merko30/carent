"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";

import { ERRORS } from "@/constants/errors";
import { createSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

  await createSession({
    id: user.id.toString(),
    // roles: user.roles,
  });

  // navigate
  return {
    success: true,
    errors: {},
    error: null,
  };
}
