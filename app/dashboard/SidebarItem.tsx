"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const SidebarItem = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li className="w-full hover:bg-gray-100 p-4" key={href}>
      <Link
        href={href}
        className={twMerge(
          "flex items-center gap-2",
          isActive
            ? "text-orange-600 hover:text-orange-700"
            : "text-gray-600 hover:text-gray-800"
        )}
      >
        {children}
        <span className="font-medium">{label}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
