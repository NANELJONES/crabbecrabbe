"use client";

import { useStateContext } from "@/app/Context/StateContext";
import AnimateUp from "@/app/components/AnimateUp";
import PracticeAreaSection from "./PracticeAreaSection";
import PracticeAreasSidebar, {
  PracticeAreasMobileNav,
  usePracticeAreasNav,
} from "./PracticeAreasSidebar";

export default function PracticeAreasLayout() {
  const { practiceAreas } = useStateContext();
  const { sections } = practiceAreas;
  const { activeId, swiperRef } = usePracticeAreasNav(sections);

  return (
    <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-0">
      <PracticeAreasSidebar activeId={activeId} sections={sections} />

      <main className="min-w-0 flex-1 bg-white px-4 pb-8 pt-0 md:px-8 md:pb-10 lg:px-10 lg:pb-12">
        <PracticeAreasMobileNav
          activeId={activeId}
          swiperRef={swiperRef}
          sections={sections}
        />

        {sections.map((area, index) => (
          <AnimateUp key={area.id} delay={Math.min(index * 0.08, 0.4)}>
            <PracticeAreaSection {...area} />
          </AnimateUp>
        ))}
      </main>
    </div>
  );
}
