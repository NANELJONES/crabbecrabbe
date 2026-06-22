"use client";

import Image from "next/image";
import { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import Pattern from "./Pattern";

const NAME = "Patience Kuleke";
const ROLE = "Head of Human Resources & Administration";
const TAGLINE =
  "MBA — Human resource management, organizational development, and administrative operations";

const INTRO_PARAGRAPHS = [
  "Patience Kuleke serves as the Head of Human Resources & Administration at Crabbe Crabbe and Co. She holds a Master of Business Administration (MBA) and is responsible for the Firm's human resource functions, including talent management, employee relations, policy development, performance management, and staff development.",
  "In her role, she oversees administrative operations and the coordination of internal processes in support of the Firm's legal practice.",
];

const LEADERSHIP_PARAGRAPHS = [
  "She supports the Firm's organisational structure and administrative systems. Her work is guided by accountability, integrity, and adherence to internal policies and professional standards.",
  "As part of the Firm's leadership, she contributes to administrative and operational functions that support the legal practice.",
];

const RESPONSIBILITIES = [
  "Human Resource Management",
  "Organizational Development",
  "Employee Relations",
  "Talent Management",
  "Performance Management Systems",
  "Policy Development and Implementation",
  "Administration and Office Management",
  "Staff Development and Training",
  "Workplace Systems and Process Improvement",
  "Leadership and Operational Coordination",
];

function BulletList({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-primary_color">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function MrsCrabbe() {
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
              src="/company/MrsCrabbe.jpg"
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
            Head of Human Resources & Administration
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
                {LEADERSHIP_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}

                <div>
                  <p className="mb-3 font-medium text-secondary_color">
                    Areas of Responsibility
                  </p>
                  <BulletList items={RESPONSIBILITIES} />
                </div>
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
