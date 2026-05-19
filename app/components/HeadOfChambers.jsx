"use client";

import Image from "next/image";
import { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import Pattern from "./Pattern";

const INTRO = `Mr. Crabbe Crabbe is the Founder and Head of Chambers of Crabbe Crabbe & Co. He leads the firm's strategic direction and is widely regarded for his measured judgment, commanding courtroom presence, and dedication to the highest standards of legal practice in Ghana.

He has advised and represented clients across corporate and commercial matters, dispute resolution, and general advisory work, bringing a practical, client-focused approach to every brief.`;

const BIO = `Mr. Crabbe Crabbe has spent much of his career building a practice grounded in preparation, integrity, and effective advocacy. As Head of Chambers, he sets the tone for the firm — mentoring associates, overseeing complex matters, and ensuring that every client receives counsel that is both legally sound and commercially sensible.

He is known for his calm leadership under pressure, his attention to detail, and his ability to distil complex legal issues into clear options for clients. Beyond the courtroom, he is committed to developing the next generation of Ghanaian legal practitioners and to strengthening access to quality legal representation.

His vision for Crabbe Crabbe & Co. is a firm that combines traditional professional values with a modern, responsive approach — serving clients from the firm's offices in Accra and Winneba with the same rigour and care.`;

export default function HeadOfChambers() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="mb-16 md:mb-20">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative flex flex-row-reverse gap-10">
          <div className="absolute right-4 top-4 z-10 md:relative md:right-0 md:top-0">
            <Pattern layout="grid" count={4} size="sm" gap="gap-1" />
          </div>
          <div className="relative aspect-[3/4] w-full max-h-[500px] max-w-md overflow-hidden">
            <Image
              src="/company/team 2.jpg"
              alt="Mr Crabbe Crabbe, Head Senior Partner"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 90vw, 420px"
              priority
            />
          </div>
          <div className="absolute bottom-10 left-10 w-full max-w-[300px] bg-primary_color px-4 py-3 md:bottom-1/3 md:left-[60%] md:px-6 md:py-4">
            <h6 className="font-semibold text-white">Mr Crabbe Crabbe</h6>
            <p className="text-sm text-white/90">Head Senior Partner</p>
          </div>
        </div>

        <div>
          <h2 className="heading_primary text-3xl font-bold md:text-4xl lg:text-5xl">
            Head of Chambers
          </h2>
          <div className="mt-6 space-y-4">
            {INTRO.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            {expanded &&
              BIO.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
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
