"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { redirect } from "next/navigation";

import Field from "@/components/Field";
import Alert from "@/components/Alert";
import Button from "@/components/Button";

import loginFn, { type LoginResponse } from "./action";

export const initialState: LoginResponse = {
  error: null,
  errors: {},
  success: false,
};

const Form = () => {
  const [state, formAction] = useActionState(loginFn, initialState);

  useEffect(() => {
    const setAuthState = async () => {
      if (state.success) {
        await (await import("@/store/auth")).useAuthStore
          .getState()
          .checkAuth();
        redirect("/dashboard");
      }
    };

    setAuthState();
  }, [state.success]);

  return (
    <form action={formAction}>
      {state.error && (
        <Alert variant="error">
          {state.error.message || "Došlo je do greške"}
        </Alert>
      )}

      <Field
        label="Email"
        type="email"
        name="email"
        error={state.errors?.email}
      />
      <Field
        label="Lozinka"
        type="password"
        name="password"
        error={state.errors?.password}
      />
      <SubmitButton />

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

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Prijavljivanje..." : "Prijavi se"}
    </Button>
  );
};
