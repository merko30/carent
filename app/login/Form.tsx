"use client";

import { signIn } from "next-auth/react";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";

import Field from "@/components/Field";
import Button from "@/components/Button";
import Alert from "@/components/Alert";

const schema = z.object({
  email: z.string().email("Email adresa nije validna"),
  password: z.string().min(6, "Lozinka mora imati najmanje 6 karaktera"),
});

const Form = () => {
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setError(null);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const validation = schema.safeParse(data);

    if (!validation.success) {
      const errors = validation.error.issues.reduce(
        (acc: Record<string, string>, issue) => {
          acc[issue.path[0]] = issue.message;
          return acc;
        },
        {}
      );
      setErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        ...data,
      });

      if (res?.error) {
        setError("Pogrešni podaci");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    } catch (error: any) {
      console.log("error", error.message);
      setIsLoading(false);
      setError("Pogrešni podaci");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {error && <Alert variant="error">{error || "Došlo je do greške"}</Alert>}

      <Field label="Email" type="email" name="email" error={errors?.email} />
      <Field
        label="Lozinka"
        type="password"
        name="password"
        error={errors?.password}
      />
      <Button className="w-full" disabled={isLoading}>
        Prijavi se
      </Button>

      <div className="text-center">
        <Link
          href="/register"
          className="text-sm text-gray-800 hover:text-gray-600"
        >
          Nemaš račun? Registriraj se
        </Link>
      </div>
    </form>
  );
};

export default Form;
