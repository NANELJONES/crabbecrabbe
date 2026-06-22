"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronDown, HiMenu, HiX } from "react-icons/hi";
import { useStateContext } from "../Context/StateContext";

const RESOURCES = [
  { name: "Blog", href: "/blog" },
  { name: "Cases", href: "/cases" },
];

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState("");
  const { practiceAreaNavLinks } = useStateContext();

  const navLinks = useMemo(
    () => [
      { name: "Home", href: "/" },
      {
        name: "Practice Areas",
        href: "/practiceAreas",
        subMenu: practiceAreaNavLinks,
      },
      { name: "Our Firm", href: "/aboutUs" },
      { name: "Team", href: "/team" },
      {
        name: "Resources",
        href: "/blog",
        subMenu: RESOURCES,
      },
      { name: "Careers", href: "/careers" },
      { name: "Contact Us", href: "/contactUs" },
    ],
    [practiceAreaNavLinks]
  );

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSubMenu("");
  };

  const toggleMobileSubMenu = (name) => {
    setMobileSubMenu((prev) => (prev === name ? "" : name));
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-primary_color shadow-md">
      <nav className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 md:h-[4.5rem] md:px-8 lg:px-10">
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center"
          onClick={closeMobile}
        >
          <Image
            src="/White Logo.png"
            alt="CrabbeCrabbe&Co"
            width={280}
            height={48}
            priority
            className="h-9 w-auto md:h-11"
          />
        </Link>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-sm text-white transition-colors hover:bg-white/10 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <HiX className="h-7 w-7" />
          ) : (
            <HiMenu className="h-7 w-7" />
          )}
        </button>

        <ul
          className={`${
            mobileOpen
              ? "flex translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0 md:pointer-events-auto md:translate-y-0 md:opacity-100"
          } absolute left-0 top-full flex w-full flex-col gap-1 bg-primary_color px-4 py-4 shadow-lg transition-all duration-300 md:static md:w-auto md:flex-row md:items-center md:gap-8 md:bg-transparent md:p-0 md:shadow-none lg:gap-10`}
        >
          {navLinks.map((item) => {
            const hasSubMenu = Boolean(item.subMenu);
            const isMobileSubOpen = mobileSubMenu === item.name;

            if (!hasSubMenu) {
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-[0.95rem] font-medium tracking-wide text-white transition-colors hover:text-white/90 md:py-0 md:text-[0.85rem] lg:text-[0.9rem]"
                    onClick={closeMobile}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            }

            return (
              <li key={item.name} className="group relative">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-2 py-2 text-left text-[0.95rem] font-medium tracking-wide text-white md:hidden"
                  onClick={() => toggleMobileSubMenu(item.name)}
                >
                  <span>{item.name}</span>
                  <HiChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      isMobileSubOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <Link
                  href={item.href}
                  className="hidden items-center gap-1 py-0 text-[0.85rem] font-medium tracking-wide text-white transition-colors hover:text-white/90 md:inline-flex lg:text-[0.9rem]"
                  onClick={closeMobile}
                >
                  {item.name}
                  <HiChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                {mobileOpen && isMobileSubOpen && (
                  <ul className="mt-1 flex flex-col gap-0.5 border-l-2 border-white/30 pl-4 md:hidden">
                    {item.subMenu.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block py-2 text-sm text-white/90 transition-colors hover:text-white"
                          onClick={closeMobile}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="pointer-events-none absolute right-0 top-full z-50 hidden pt-2 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 md:block">
                  <ul className="min-w-[12rem] rounded-sm bg-secondary_color py-2 shadow-xl">
                    {item.subMenu.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block px-4 py-2.5 text-[0.8rem] text-white transition-colors hover:bg-white/10"
                          onClick={closeMobile}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
          <li className="mt-2 border-t border-white/20 pt-3 md:mt-0 md:border-0 md:pt-0">
            <Link
              href="/appointment"
              className="secondary_button block w-full text-center text-sm md:inline-flex md:w-auto md:px-5 md:py-2 md:text-[0.85rem]"
              onClick={closeMobile}
            >
              Request an appointment
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
