import { ReactNode } from "react";

interface FeatureItemProps {
  children: ReactNode;
  label: string | number;
  value: string | number;
}

export default function FeatureItem({
  children,
  label,
  value,
}: FeatureItemProps) {
  return (
    <div className="flex items-center gap-2">
      {children}
      <div>
        <p className="block text-xs text-gray-700 leading-snug">{label}</p>
        <p className="block text-xs font-medium">{value}</p>
      </div>
    </div>
  );
}
