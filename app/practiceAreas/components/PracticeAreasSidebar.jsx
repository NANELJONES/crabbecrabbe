"use client";

import { useEffect, useRef, useState } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";

function getLinkClassName(isActive) {
  return [
    "block rounded-sm p-2.5 text-sm font-medium text-white transition-colors",
    "whitespace-nowrap hover:bg-white/10 md:text-[0.9rem]",
    "lg:whitespace-normal",
    isActive ? "bg-white/10" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function NavLink({ area, isActive }) {
  return (
    <a href={`#${area.id}`} className={getLinkClassName(isActive)}>
      {area.navLabel ?? area.title.replace(/ Law$/, "")}
    </a>
  );
}

export function PracticeAreasMobileNav({ activeId, swiperRef, sections }) {
  return (
    <nav
      aria-label="Practice areas"
      className="sticky top-16 z-40 -mx-4 bg-primary_color px-2.5 py-2.5 shadow-md md:-mx-8 md:top-[4.5rem] lg:hidden"
    >
      <div className="[&_.swiper]:overflow-hidden">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[FreeMode]}
          slidesPerView="auto"
          spaceBetween={8}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.5,
          }}
          grabCursor
          className="practice-areas-nav-swiper !overflow-visible"
        >
          {sections.map((area) => (
            <SwiperSlide key={area.id} className="!w-auto">
              <NavLink area={area} isActive={activeId === area.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </nav>
  );
}

export function usePracticeAreasNav(sections) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const swiperRef = useRef(null);

  useEffect(() => {
    if (sections[0]?.id) {
      setActiveId(sections[0].id);
    }
  }, [sections]);

  useEffect(() => {
    const sectionElements = sections
      .map((area) => document.getElementById(area.id))
      .filter(Boolean);

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-160px 0px -50% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      }
    );

    sectionElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    if (!activeId || !swiperRef.current) return;
    const index = sections.findIndex((area) => area.id === activeId);
    if (index >= 0) {
      swiperRef.current.slideTo(index);
    }
  }, [activeId, sections]);

  return { activeId, swiperRef };
}

export default function PracticeAreasSidebar({ activeId, sections }) {
  return (
    <aside className="relative hidden w-full shrink-0 self-stretch lg:block lg:w-[240px] xl:w-[260px]">
      <div className="absolute inset-0 bg-primary_color" aria-hidden />
      <nav
        aria-label="Practice areas"
        className="sticky top-[4.5rem] z-40 relative flex w-full flex-col px-2.5 py-2.5"
      >
        <ul className="flex flex-col gap-1">
          {sections.map((area) => (
            <li key={area.id}>
              <NavLink area={area} isActive={activeId === area.id} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
