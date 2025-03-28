import AuthLayout from "@/components/AuthLayout";
import Form from "./Form";

export default function LoginPage() {
  return (
    <AuthLayout>
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">
        Prijava
      </h2>

      <Form />
    </AuthLayout>
  );
}
