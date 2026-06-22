"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import Layout2 from "../layout/Layout2";
import ContactInfoList from "./ContactInfoList";
import Pattern from "./Pattern";

const COMPANY_LINKS_LEFT = [
  { label: "About", href: "/aboutUs" },
  { label: "Practice Areas", href: "/practiceAreas" },
  { label: "Team", href: "/team" },
];

const COMPANY_LINKS_RIGHT = [
  { label: "Blog", href: "/blog" },
  { label: "Request Appointment", href: "/appointment" },
  { label: "Contact Us", href: "/contactUs" },
];

const SOCIAL_LINKS = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
  { icon: FaFacebookF, label: "Facebook", href: "#" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="mt-auto w-full bg-[#FBFBFB] text-secondary_color">
      <Layout2>
        <div className="grid grid-cols-1 gap-12 py-10 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-14 lg:py-14">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block w-fit">
              <Image
                src="/Loog 2.png"
                alt="CrabbeCrabbe&Co"
                width={220}
                height={90}
                className="h-auto w-full max-w-[200px] object-contain"
              />
            </Link>

            <div>
              <h1 className="text-base font-semibold text-secondary_color md:text-lg">
                Get In Touch With Us
              </h1>
              <ContactInfoList
                className="mt-4"
                iconClassName="mt-0.5 h-5 w-5 shrink-0 text-primary_color"
              />
            </div>
          </div>

          {/* Middle column */}
          <div className="flex flex-col gap-8">
            <p className="max-w-md text-sm leading-relaxed text-secondary_color md:text-[0.9rem]">
              Crabbe Crabbe & Co. — law firm with offices in Tse Addo and Weija,
              Accra.
            </p>

            <div>
              <h1 className="text-base font-semibold text-secondary_color md:text-lg">
                Company
              </h1>
              <hr className="mt-2 mb-4 border-secondary_color/20" />
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <ul className="flex flex-col gap-2">
                  {COMPANY_LINKS_LEFT.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-secondary_color transition-colors hover:text-primary_color md:text-[0.9rem]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-col gap-2">
                  {COMPANY_LINKS_RIGHT.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-secondary_color transition-colors hover:text-primary_color md:text-[0.9rem]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h1 className="text-base font-semibold text-secondary_color md:text-lg">
                Our Socials
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {SOCIAL_LINKS.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={`${social.label}-${index}`}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-primary_color text-primary_color transition-colors hover:bg-primary_color hover:text-white"
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-1">
            <div>
              <h1 className="text-base font-semibold text-secondary_color md:text-lg">
                Subscribe to our Newsletter
              </h1>
              <form onSubmit={handleSubscribe} className="mt-4">
                <label
                  htmlFor="footer-email"
                  className="mb-1.5 block text-sm text-secondary_color"
                >
                  Email
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="henrydoe@gmail.com"
                  required
                  className="w-full rounded-sm border border-secondary_color/25 bg-white px-3 py-2.5 text-sm text-secondary_color outline-none transition-colors placeholder:text-secondary_color/40 focus:border-primary_color"
                />
                <button
                  type="submit"
                  className="mt-4 w-full rounded-sm bg-secondary_color px-4 py-3 text-xs font-semibold tracking-widest text-white uppercase transition-opacity hover:opacity-90 md:w-auto md:min-w-[140px]"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="flex items-end justify-start lg:justify-end">
              <Pattern size="lg" />
            </div>
          </div>
        </div>

        <hr className="border-secondary_color/15" />

        <p className="py-6 text-center text-sm text-secondary_color">
          © Copyright {new Date().getFullYear()}, All Rights Reserved
        </p>
      </Layout2>
    </footer>
  );
};

export default Footer;
