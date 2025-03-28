import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={twMerge("container mx-auto px-4 md:px-0", className)}>
      {children}
    </div>
  );
}
