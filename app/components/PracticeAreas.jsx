"use client";

import Image from "next/image";
import Link from "next/link";
import { useStateContext } from "../Context/StateContext";
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
            <div className="flex flex-col justify-between lg:col-span-2">
              <h1 className="heading_primary">Our Practice Areas</h1>
              <div className="mt-6 hidden flex-col gap-4 lg:flex">
                <Pattern size="large" />
                <Pattern size="large" />
              </div>
              <h5 className="mt-6 max-w-sm">
                We offer a broad range of legal services designed to meet the
                needs of individuals, corporations, and institutions.
              </h5>
            </div>
          )}

          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${hideHeader ? "" : "col-span-3"}`}
          >
            {sections.map((area) => (
              <Link
                key={area.id}
                href={`/practiceAreas#${area.id}`}
                className="group overflow-hidden"
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
                    {area.navLabel ?? area.title}
                  </h6>
                  <p className="mt-2 line-clamp-2 !text-xs text-white/80 md:text-sm">
                    {area.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
