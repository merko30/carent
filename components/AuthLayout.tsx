import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
}

export default function AuthLayout({ children, onSubmit }: AuthLayoutProps) {
  return (
    <div className="container mx-auto px-4 md:px-0 pt-20">
      <form
        className="w-full md:w-2/3 lg:w-1/2 mx-auto p-8 bg-white border border-gray-300 rounded-sm"
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </div>
  );
}
