"use client";

import Image from "next/image";
import { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import Pattern from "./Pattern";

const NAME = "Rev. Pernell Robert Osei-Boakye Esq.";
const ROLE = "Management Member & Branch Head — Weija Office";
const TAGLINE =
  "Barrister & Solicitor of the Supreme Court of Ghana, Chartered Banker, Commercial Law Lecturer, Governance & Compliance Consultant";

const INTRO_PARAGRAPHS = [
  "Rev. Pernell Robert Osei-Boakye Esq. is a legal practitioner, Chartered Banker, academic, and corporate governance professional with over three decades of banking, legal, regulatory, and management experience.",
  "He is a Management Member of Crabbe, Crabbe & Co. and serves as Branch Head of the Firm's Weija Office. He also serves as Board Secretary of a Bank in Ghana, bringing practical boardroom, governance, regulatory, and institutional experience to the Firm's advisory practice.",
];

const EXPERIENCE_AREAS = [
  "Banking operations and regulation",
  "Corporate governance",
  "Risk and compliance management",
  "Debt recovery and enforcement",
  "Litigation and dispute resolution",
  "Institutional advisory services",
];

const BACKGROUND =
  "His professional background includes senior management and operational roles with Ecobank Ghana PLC and Ecobank Liberia, alongside extensive experience in:";

const QUALIFICATIONS = [
  "LL.M (Oil & Gas Law) — University of Ghana",
  "Professional Law Certificate — Ghana School of Law",
  "LL.B (Hons) — KNUST",
  "MBA (Finance) — Leicester University, UK",
  "Chartered Banker Status",
];

const LECTURER =
  "He also lectures in Commercial Law at Mountcrest University College, Accra.";

function BulletList({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-primary_color">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function AsstHeadOfChambers() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="mb-16 border-t border-secondary_color/10 pt-16 md:mb-20 md:pt-20">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative flex flex-row-reverse gap-10 lg:sticky lg:top-[4.5rem] lg:self-start">
          <div className="absolute right-4 top-4 z-10 md:relative md:right-0 md:top-0">
            <Pattern layout="grid" count={4} size="sm" gap="gap-1" />
          </div>
          <div className="relative aspect-[3/4] w-full max-h-[500px] max-w-md overflow-hidden">
            <Image
              src="/company/Man 2.jpg"
              alt={`${NAME}, ${ROLE}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 90vw, 420px"
            />
          </div>
          <div className="absolute bottom-10 left-10 w-full max-w-[300px] bg-primary_color px-4 py-3 md:bottom-1/3 md:left-[60%] md:px-6 md:py-4">
            <h6 className="font-semibold text-white">{NAME}</h6>
            <p className="text-sm text-white/90">{ROLE}</p>
          </div>
        </div>

        <div>
          <h2 className="heading_primary text-3xl font-bold md:text-4xl lg:text-5xl">
            Management Member & Branch Head
          </h2>
          <p className="mt-3 text-sm font-medium text-secondary_color/90 md:text-base">
            {TAGLINE}
          </p>
          <div className="mt-6 space-y-4">
            {INTRO_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}

            {expanded && (
              <>
                <p>{BACKGROUND}</p>
                <BulletList items={EXPERIENCE_AREAS} />

                <div>
                  <p className="mb-3 font-medium text-secondary_color">
                    He holds:
                  </p>
                  <BulletList items={QUALIFICATIONS} />
                </div>

                <p>{LECTURER}</p>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="primary_button mt-8"
          >
            <span>{expanded ? "Show Less" : "Read More"}</span>
            <span className="button_icon">
              <HiArrowRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
