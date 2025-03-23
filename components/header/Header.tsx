"use client";
import { useState } from "react";

import Logo from "@/components/Logo";

import MobileMenu from "./MobileMenu";
import MenuItems from "./MenuItems";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="w-full container mx-auto px-4 md:px-0 flex items-center justify-between py-6">
      <Logo />
      <nav>
        <MenuItems isOpen={isOpen} />
        <MobileMenu isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      </nav>
    </header>
  );
};

export default Header;
