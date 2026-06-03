"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IN_VIEW_EASE } from "./animationConfig";
import { useStableInView } from "./useStableInView";

export default function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className = "",
  startFrom = 0,
  amount = 0.35,
}) {
  const ref = useRef(null);
  const inView = useStableInView(ref, { amount });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(
    prefersReducedMotion ? value : startFrom
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    if (!inView) {
      setDisplay(startFrom);
      return;
    }

    setDisplay(startFrom);
    const controls = animate(startFrom, value, {
      duration,
      ease: IN_VIEW_EASE,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, duration, startFrom, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
