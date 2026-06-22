"use client";

import Image from "next/image";
import { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import Pattern from "./Pattern";

const NAME = "Dr. Edward Sam Crabbe Esq.";
const ROLE = "Managing Partner";
const TAGLINE =
  "Lawyer, Governance & Compliance Consultant, Banking and Tax Advisory Specialist";

const INTRO_PARAGRAPHS = [
  "Dr. Edward Sam Crabbe is a legal practitioner, Notary Public, Governance Consultant, and Regulatory and Tax Advisory professional with over fifteen (15) years of legal practice spanning civil and criminal litigation, with specialisation in corporate law, banking and finance law, commercial law, land law, and labour law.",
  "He is the Managing Partner of Crabbe, Crabbe & Co., a position he has held since October 2015. Prior to founding the Firm, he served as Managing Partner of Crabbe, Romanlevi & Associates (2014–2015) and as Acting Managing Partner of Brookman-Amissah & Associates (2012–2013), where he had earlier practised as a lawyer from 2009. Between 2007 and 2012, he also served as a Resource Person and Lecturer at the Faculty of Law, University of Ghana, Legon.",
];

const PRACTICE_AREAS = [
  "Banking and Finance Law",
  "Land Law",
  "Corporate Governance",
  "Regulatory Compliance",
  "Debt Recovery & Enforcement",
  "Commercial Litigation",
  "Risk, Compliance and Tax Advisory",
  "Institutional Governance",
  "Banking Operations Advisory",
  "Corporate & Commercial Transactions",
];

const ADVISORY =
  "Dr. Crabbe provides legal and governance advisory services to financial institutions, including training banking executives, management, compliance officers, and operational staff in areas such as Negotiable Instruments, Fraud Detection & Prevention, Banking Regulation, Operational Risk Management, and Corporate Governance.";

const QUALIFICATIONS = [
  "Doctorate in Theology (ThD) — Immanuel Bible Institute, Brooklyn, Ghana Campus",
  "Professional Law Certificate (BL) — Ghana School of Law, Makola, Accra (2009)",
  "LLB (Honours) — Faculty of Law, University of Ghana, Legon",
  "Certificate in Statistics — University of Ghana, Legon",
  "BA (Honours) in Philosophy and Religion — University of Ghana, Legon",
];

const BAR_MEMBERSHIP =
  "He is a member in good standing of the Ghana Bar Association and an enrolled Solicitor and Barrister of the Superior Courts of Ghana, and continues to hold a valid Solicitor's Licence from the General Legal Council.";

function BulletList({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-primary_color">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function HeadOfChambers() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="mb-16 md:mb-20">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative flex flex-row-reverse gap-10 lg:sticky lg:top-[4.5rem] lg:self-start">
          <div className="absolute right-4 top-4 z-10 md:relative md:right-0 md:top-0">
            <Pattern layout="grid" count={4} size="sm" gap="gap-1" />
          </div>
          <div className="relative aspect-[3/4] w-full max-h-[500px] max-w-md overflow-hidden">
            <Image
              src="/company/team 2.jpg"
              alt={`${NAME}, ${ROLE}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 90vw, 420px"
              priority
            />
          </div>
          <div className="absolute bottom-10 left-10 w-full max-w-[300px] bg-primary_color px-4 py-3 md:bottom-1/3 md:left-[60%] md:px-6 md:py-4">
            <h6 className="font-semibold text-white">{NAME}</h6>
            <p className="text-sm text-white/90">{ROLE}</p>
          </div>
        </div>

        <div>
          <h2 className="heading_primary text-3xl font-bold md:text-4xl lg:text-5xl">
            Managing Partner
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
                <div>
                  <p className="mb-3 font-medium text-secondary_color">
                    His areas of practice include:
                  </p>
                  <BulletList items={PRACTICE_AREAS} />
                </div>

                <p>{ADVISORY}</p>

                <div>
                  <p className="mb-3 font-medium text-secondary_color">
                    He holds:
                  </p>
                  <BulletList items={QUALIFICATIONS} />
                </div>

                <p>{BAR_MEMBERSHIP}</p>
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
