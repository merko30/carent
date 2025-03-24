"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

export type RegisterResponse = {
  success: boolean;
  formData: Record<string, FormDataEntryValue | null>;
  user: any | null;
  errors: Record<string, string>;
  error: { message: string } | null;
};

export default async function registerFn(
  _: RegisterResponse,
  formData: FormData
): Promise<RegisterResponse> {
  const rawFormData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const schema = z
    .object({
      email: z.string().email("Email adresa nije validna"),
      username: z
        .string()
        .min(3, "Korisničko ime mora imati najmanje 3 karaktera"),
      password: z.string().min(6, "Lozinka mora imati najmanje 6 karaktera"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Lozinke se ne podudaraju",
      path: ["confirmPassword"],
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
    return {
      errors,
      success: false,
      user: null,
      error: null,
      formData: rawFormData,
    };
  }

  const response = await fetch(`${process.env.SITE_URL}/api/register`, {
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
      formData: rawFormData,
    };
  }

  // navigate
  redirect("/login");
  return {
    success: true,
    user: json,
    errors: {},
    error: null,
    formData: rawFormData,
  };
}
