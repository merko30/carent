"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
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

  try {
    const hashedPassword = await bcrypt.hash(
      rawFormData.password as string,
      10
    );

    const createdUser = await prisma.user.create({
      data: {
        username: rawFormData.username as string,
        email: rawFormData.email as string,
        password: hashedPassword,
      },
    });

    return {
      error: null,
      success: true,
      user: createdUser,
      errors: {},
      formData: rawFormData,
    };
  } catch (error: any) {
    console.log("Failed to create user:", error.message);
    let message = "Došlo je do greške";
    if (error.message?.toLowerCase().includes("unique")) {
      message = "Korisnik već postoji";
    }

    return {
      error: { message },
      success: false,
      user: null,
      errors: {},
      formData: rawFormData,
    };
  } finally {
    redirect("/login");
  }
}
