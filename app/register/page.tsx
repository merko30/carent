import AuthLayout from "@/components/AuthLayout";

import Form from "./Form";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Registracija
      </h2>
      <Form />
    </AuthLayout>
  );
}
