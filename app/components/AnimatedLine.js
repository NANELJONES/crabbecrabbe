"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { IN_VIEW_EASE } from "./animationConfig";
import { useStableInView } from "./useStableInView";

export default function AnimatedLine({
  className = "",
  delay = 0,
  thick = false,
  amount = 0.35,
}) {
  const ref = useRef(null);
  const inView = useStableInView(ref, { amount });
  const prefersReducedMotion = useReducedMotion();
  const barClass = thick
    ? "h-0.5 bg-secondary_color"
    : "h-px bg-secondary_color/20";

  if (prefersReducedMotion) {
    return (
      <div
        ref={ref}
        className={`w-full ${barClass} ${className}`}
        role="presentation"
      />
    );
  }

  return (
    <motion.div
      ref={ref}
      role="presentation"
      className={`${barClass} ${className}`}
      initial={false}
      animate={
        inView ? { width: "100%", opacity: 1 } : { width: 0, opacity: 0.35 }
      }
      transition={{
        duration: 0.9,
        delay: inView ? delay : 0,
        ease: IN_VIEW_EASE,
      }}
    />
  );
}
