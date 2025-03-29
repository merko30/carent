import { useMemo } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "@/store/auth";
import { redirect } from "next/navigation";
import { X } from "@phosphor-icons/react/dist/ssr";
import Button from "../Button";

interface MenuItemsProps {
  isOpen: boolean;
  onNavigate?: () => void;
}

const MenuItems = ({ isOpen, onNavigate }: MenuItemsProps) => {
  const { isAuthenticated, logout: logoutFn } = useAuthStore();

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
    await logoutFn();
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
              className="w-full block p-4 cursor-pointer border-b md:border-b-0 text-gray-800 border-b-gray-50 hover:bg-gray-50 md:hover:bg-transparent md:hover:text-black"
              onClick={onNavigate}
            >
              {item.title}
            </Link>
          </li>
        ))}
        {isAuthenticated && (
          <li className="w-full">
            <Button onClick={logout} className="w-full">
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
