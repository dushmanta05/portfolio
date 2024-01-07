import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

const links = [
  { path: "/", name: "Home" },
  { path: "/projects", name: "Projects" },
  { path: "/contact", name: "Contact" },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden xl:flex gap-x-8 items-center">
      {links.map((link, index) => {
        return (
          <Link
            key={index}
            href={link.path}
            className="capitalize relative hover:text-primary transition-all"
          >
            {link.path === pathname && (
              <motion.span
                initial={{ y: "-100&" }}
                animate={{ y: 0 }}
                transition={{ type: "tween" }}
                layoutId="underline"
                className="absolute left-0 top-full h-[2px] bg-primary w-full"
              ></motion.span>
            )}
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
