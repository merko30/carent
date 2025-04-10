"use client";

import { useActionState } from "react";

import Field from "@/components/Field";

import registerFn, { type RegisterResponse } from "./action";

import Alert from "@/components/Alert";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";

export const initialState: RegisterResponse = {
  error: null,
  errors: {},
  formData: {},
  success: false,
  user: null,
};

const Form = () => {
  const [state, formAction] = useActionState(registerFn, initialState);

  return (
    <form className="mt-8 space-y-6" action={formAction}>
      {state.error && (
        <Alert variant="error">
          {state.error.message || "Došlo je do greške"}
        </Alert>
      )}

      <Field
        label="Korisničko ime"
        type="text"
        name="username"
        defaultValue={state.formData.username as string}
        error={state.errors?.username}
      />

      <Field
        label="Email"
        type="email"
        name="email"
        defaultValue={state.formData.email as string}
        error={state.errors?.email}
      />
      <Field
        label="Lozinka"
        type="password"
        name="password"
        defaultValue={state.formData.password as string}
        error={state.errors?.password}
      />

      <Field
        label="Potvrdi lozinku"
        type="password"
        name="confirmPassword"
        defaultValue={state.formData.confirmPassword as string}
        error={state.errors?.confirmPassword}
      />

      <SubmitButton
        label="Registruj se"
        loadingLabel="Registracija u toku"
        className="w-full"
      />

      <div className="text-center">
        <Link
          href="/login"
          className="text-sm text-gray-800 hover:text-gray-600"
        >
          Imaš račun ? Prijavi se
        </Link>
      </div>
    </form>
  );
};

export default Form;
