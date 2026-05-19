"use client";

import Link from "next/link";
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";
import { CONTACT_ENTRIES } from "../data/contactInfo";

const ICONS = {
  phone: HiOutlinePhone,
  email: HiOutlineEnvelope,
  location: HiOutlineMapPin,
};

const COLOR_STYLES = {
  black: {
    icon: "text-secondary_color",
    text: "text-secondary_color",
  },
  white: {
    icon: "text-white",
    text: "text-white",
  },
};

function getIcon(id) {
  if (id === "phone") return ICONS.phone;
  if (id === "email") return ICONS.email;
  return ICONS.location;
}

export default function ContactInfoList({
  className = "",
  textClassName = "text-sm leading-relaxed md:text-[0.9rem]",
  iconClassName,
  linkClassName = "transition-opacity hover:opacity-70",
  color = "black",
}) {
  const palette = COLOR_STYLES[color] ?? COLOR_STYLES.black;
  const resolvedIconClassName =
    iconClassName ?? `mt-0.5 h-5 w-5 shrink-0 ${palette.icon}`;

  return (
    <ul className={`flex flex-col ${className || "gap-4"}`}>
      {CONTACT_ENTRIES.map((entry) => {
        const Icon = getIcon(entry.id);
        const content = (
          <span className="flex items-start gap-3">
            <Icon className={resolvedIconClassName} aria-hidden />
            <span className={`flex flex-col gap-1 ${textClassName} ${palette.text}`}>
              {entry.lines.map((line, index) => (
                <span
                  key={`${entry.id}-${index}`}
                  className={
                    index === 0 && entry.id !== "phone" && entry.id !== "email"
                      ? "font-semibold"
                      : ""
                  }
                >
                  {line}
                </span>
              ))}
            </span>
          </span>
        );

        return (
          <li key={entry.id}>
            {entry.href ? (
              <Link href={entry.href} className={linkClassName}>
                {content}
              </Link>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}
