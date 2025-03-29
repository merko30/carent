"use client";
import { useEffect, useState } from "react";

import Logo from "@/components/Logo";
import { List } from "@phosphor-icons/react/dist/ssr";
import MenuItems from "./MenuItems";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="w-full container mx-auto px-4 md:px-0 flex items-center justify-between py-6">
      <Logo />
      <div>
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <List size={32} weight="bold" />
        </button>

        <nav>
          <MenuItems isOpen={isOpen} onNavigate={() => setIsOpen(false)} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
