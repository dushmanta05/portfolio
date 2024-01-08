"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// components
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const [header, setHeader] = useState(false);
  const pathname = usePathname;

  useEffect(() => {
    const scrollYPosition = window.addEventListener("scroll", () => {
      window.screenY > 50 ? setHeader(true) : setHeader(false);
    });

    return () => window.removeEventListener("scroll", scrollYPosition);
  }, []);

  return (
    <header
      className={`${
        header
          ? "py-4 bg-white shadow-bg dark:bg-accent"
          : "py-6 dark:bg-transparent"
      } sticky top-0 z-30 transition-all ${pathname === "/" && "bg-[#fef9f5]"}`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-x-6">
            <Nav containerStyles={"hidden xl:flex gap-x-8 items-center"} />
            <ThemeToggler />
            <div className="xl:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
