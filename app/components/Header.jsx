"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ButtonLink from "./ButtonLink";

const SLIDE_INTERVAL_MS = 5000;

const SLIDES = [
  {
    id: "team",
    backgroundImage: "/company/team%201.jpg",
    backgroundClass: "",
    overlayClass:
      "bg-gradient-to-r from-black/75 via-black/55 to-black/40",
    imageAlt: "Crabbe Crabbe & Co. legal team",
    headlineClass: "text-white drop-shadow-sm",
    lines: ["Trusted Advocacy.", "Proven Results."],
  },
  {
    id: "pattern-light",
    backgroundImage: "/Pattern.png",
    backgroundClass: "bg-white",
    overlayClass:
      "bg-gradient-to-r from-black/75 via-black/55 to-black/40",
    imageAlt: "",
    headlineClass: "text-white drop-shadow-sm",
    lines: ["Strategic Counsel.", "Lasting Impact."],
  },
];

export default function Header() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative -mt-16 min-h-[calc(100vh)] w-full overflow-hidden md:-mt-[4.5rem] md:min-h-screen">
      {SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={!isActive}
          >
            <div className={`absolute inset-0 ${slide.backgroundClass}`} />
            <Image
              src={slide.backgroundImage}
              alt={slide.imageAlt}
              fill
              priority={index === 0}
              className="object-cover object-center"
              aria-hidden={!slide.imageAlt}
            />
            {slide.overlayClass ? (
              <div className={`absolute inset-0 ${slide.overlayClass}`} />
            ) : null}
          </div>
        );
      })}

      <div className="absolute top-0 right-0 left-0 z-20 h-1 bg-primary_color" />

      <div className="section_container relative z-10 flex min-h-[calc(100vh-4rem)] flex-col justify-between pb-12 pt-24 md:min-h-screen md:pb-16 md:pt-28">
        <div className="ml-auto max-w-md">
          <div className="flex gap-4">
            <span className="w-1 shrink-0 bg-primary_color" aria-hidden />
            <p className="text-white">
              At Crabbe Crabbe & Co., we combine legal expertise with practical
              insight to protect your interests, resolve disputes, and drive
              success.
            </p>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="relative min-h-[2.6em] sm:min-h-[2.8em] md:min-h-[3.1em] lg:min-h-[3.4em]">
              {SLIDES.map((slide, index) => {
                const isActive = index === activeIndex;

                return (
                  <h1
                    key={slide.id}
                    className={`max-w-2xl transition-opacity duration-700 ease-in-out ${slide.headlineClass} ${
                      isActive
                        ? "relative opacity-100"
                        : "pointer-events-none absolute inset-0 opacity-0"
                    }`}
                    aria-hidden={!isActive}
                  >
                    {slide.lines.map((line, lineIndex) => (
                      <span key={line}>
                        {line}
                        {lineIndex < slide.lines.length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </h1>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <ButtonLink href="/contactUs" variant="secondary">
                Contact Our Firm
              </ButtonLink>
              <ButtonLink href="/appointment" variant="primary">
                Book an appointment
              </ButtonLink>
            </div>
          </div>

          <div
            className="hidden flex-col gap-2 lg:flex"
            aria-label="Hero slides"
          >
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-white" : "bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
