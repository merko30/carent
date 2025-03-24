"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import Field from "@/components/Field";

import loginFn, { type LoginResponse } from "./action";

import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Link from "next/link";

export const initialState: LoginResponse = {
  error: null,
  errors: {},
  success: false,
  user: null,
};

const Form = () => {
  const [state, formAction] = useActionState(loginFn, initialState);

  return (
    <form className="mt-8 space-y-6" action={formAction}>
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
