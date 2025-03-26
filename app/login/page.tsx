"use client";

import Form from "./Form";

export default function LoginPage() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Prijava
        </h2>

        <Form />
      </div>
    </div>
  );
}
