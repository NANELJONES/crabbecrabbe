"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AnimateUp from "./AnimateUp";

function Stars({ score = 5 }) {
  const filled = Math.min(5, Math.max(0, Math.round(score)));

  return (
    <div className="flex gap-0.5 text-amber-400" aria-label={`${filled} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden className={i < filled ? "" : "opacity-30"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const json = await res.json();

        if (!res.ok) {
          console.error("[Testimonials] API error:", json.error ?? res.statusText);
          return;
        }

        console.log("[Testimonials] Loaded", json.data?.length ?? 0, "item(s)");
        setTestimonials(json.data ?? []);
      } catch (error) {
        console.error("[Testimonials] Fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="bg-white">
      <div className="section_container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <AnimateUp>
            <div>
              <p className="heading_primary text-sm font-semibold tracking-wide uppercase md:text-base">
                Our Cherished Client Feedback
              </p>
              <h1 className="mt-3">Our Testimonials</h1>
              <p className="mt-4">
                The testimonials below provide a glimpse into what partners across
                private enterprises, public agencies and community associations have
                to say about collaborating with our firm.
              </p>
            </div>
          </AnimateUp>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {isLoading && (
              <p className="col-span-full text-secondary_color/70">
                Loading testimonials…
              </p>
            )}

            {!isLoading && testimonials.length === 0 && (
              <p className="col-span-full text-secondary_color/70">
                Testimonials will appear here soon.
              </p>
            )}

            {testimonials.map((item, index) => (
              <AnimateUp key={item.id} delay={Math.min(index * 0.08, 0.32)}>
              <article
                className="rounded-lg border border-secondary_color/10 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  {item.avatar ? (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary_color/10 text-sm font-semibold text-secondary_color" aria-hidden>
                      {item.name?.charAt(0) ?? "?"}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-secondary_color">
                      {item.name}
                    </p>
                    <p className="text-xs text-secondary_color/60">
                      {item.role}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <Stars score={item.score} />
                </div>
                <p className="mt-3 text-sm leading-relaxed">{item.text}</p>
              </article>
              </AnimateUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
