"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

export type LoginResponse = {
  success: boolean;
  user: any | null;
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
    return { errors, success: false, user: null, error: null };
  }

  const response = await fetch(`${process.env.SITE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  const json = await response.json();

  if (!response.ok) {
    return {
      error: { message: json.error.message || "Došlo je do greške" },
      success: false,
      user: null,
      errors: {},
    };
  }

  // navigate
  redirect("/dashboard");
  return {
    success: true,
    user: json.user,
    errors: {},
    error: null,
  };
}
