"use client";

import Image from "next/image";
import Link from "next/link";
import { useStateContext } from "../Context/StateContext";
import AnimateUp from "./AnimateUp";
import Pattern from "./Pattern";

export default function PracticeAreas({ hideHeader = false }) {
  const { practiceAreas } = useStateContext();
  const { sections } = practiceAreas;

  return (
    <section className="bg-white">
      <div className={hideHeader ? "" : "section_container"}>
        <div
          className={`grid grid-cols-1 gap-12 lg:gap-16 ${hideHeader ? "" : "lg:grid-cols-5"}`}
        >
          {!hideHeader && (
            <AnimateUp className="flex flex-col justify-between lg:col-span-2">
              <h1 className="heading_primary">Our Practice Areas</h1>
              <div className="mt-6 hidden flex-col gap-4 lg:flex">
                <Pattern size="large" />
                <Pattern size="large" />
              </div>
              <h5 className="mt-6 max-w-sm">
                The Firm provides legal services in the following practice
                areas.
              </h5>
            </AnimateUp>
          )}

          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${hideHeader ? "" : "col-span-3"}`}
          >
            {sections.map((area, index) => (
              <AnimateUp
                key={area.id}
                delay={Math.min(index * 0.06, 0.36)}
                className="h-full"
              >
              <Link
                href={`/practiceAreas#${area.id}`}
                className="group block h-full overflow-hidden"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {area.image ? (
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary_color/10 text-secondary_color/40">
                      {area.title}
                    </div>
                  )}
                </div>
                <div className="bg-secondary_color px-4 py-4">
                  <h6 className="text-white">
                    {area.title}
                  </h6>
                  <p className="mt-2 line-clamp-2 !text-xs text-white/80 md:text-sm">
                    {area.description}
                  </p>
                </div>
              </Link>
              </AnimateUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
