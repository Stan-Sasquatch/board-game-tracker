"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathName = usePathname();

  const links = [
    { href: "/", title: "Home" },
    { href: "/search", title: "All Games" },
    { href: "/collection", title: "My Collection" },
  ];

  return (
    <div className="flex flex-row gap-5">
      {links.map((l) => (
        <div key={l.href}>
          <Link
            className={`text-sm hover:text-gray-600 sm:text-xl ${
              pathName == l.href ? "underline underline-offset-4" : ""
            }`}
            href={l.href}
          >
            {l.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
