"use client";

import { useEffect, useState } from "react";

const THRESHOLDS = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

const ROOT_MARGIN = "0px 0px -10% 0px";

/**
 * Stable in-view detection with hysteresis so animations do not flicker
 * when an element sits on the edge of the viewport.
 */
export function useStableInView(ref, { amount = 0.3 } = {}) {
  const enterAt = amount;
  const exitAt = Math.max(0.05, amount - 0.18);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;

        setInView((wasInView) => {
          if (!wasInView && ratio >= enterAt) return true;
          if (wasInView && (!entry.isIntersecting || ratio < exitAt)) return false;
          return wasInView;
        });
      },
      { threshold: THRESHOLDS, rootMargin: ROOT_MARGIN }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enterAt, exitAt]);

  return inView;
}
