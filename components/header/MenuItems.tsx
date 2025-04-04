import { useMemo } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { redirect } from "next/navigation";
import { X } from "@phosphor-icons/react/dist/ssr";
import { useSession, signOut } from "next-auth/react";

import Button from "../Button";

interface MenuItemsProps {
  isOpen: boolean;
  onNavigate?: () => void;
}

const MenuItems = ({ isOpen, onNavigate }: MenuItemsProps) => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const menuItems = useMemo(
    () => [
      ...(!isAuthenticated
        ? [
            {
              title: "Prijavi se",
              to: "/login",
            },
          ]
        : [
            {
              title: "Vaš profil",
              to: "/dashboard",
            },
          ]),
    ],
    [isAuthenticated]
  );

  const logout = async () => {
    await signOut();
    if (onNavigate) onNavigate();
    redirect("/login");
  };

  return (
    <div>
      <ul
        className={twMerge(
          "fixed md:static inset-0 md:inset-auto bg-white md:bg-transparent z-20 md:z-auto",
          "flex-col md:flex-row items-center gap-4 pt-20 md:pt-0 mx-4 md:mx-0",
          "transition-transform duration-300 ease-in-out md:transition-none",
          isOpen
            ? "flex translate-x-0"
            : "hidden md:flex -translate-x-full md:translate-x-0"
        )}
      >
        {menuItems.map((item, index) => (
          <li key={index} className="w-full md:w-auto">
            <Link
              href={item.to}
              className="w-full md:w-max block text-sm font-medium flex-none p-4 cursor-pointer text-gray-800 hover:underline md:hover:text-black"
              onClick={onNavigate}
            >
              {item.title}
            </Link>
          </li>
        ))}
        {isAuthenticated && (
          <li className="w-full">
            <Button onClick={logout} className="w-full font-medium" size="sm">
              Logout
            </Button>
          </li>
        )}
      </ul>
      {isOpen && (
        <X
          className="absolute top-6 right-4 md:hidden cursor-pointer z-20"
          size={32}
          weight="bold"
          onClick={onNavigate}
        />
      )}
    </div>
  );
};

export default MenuItems;
