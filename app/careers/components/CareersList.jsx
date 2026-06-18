"use client";

import { useEffect, useState } from "react";
import AnimateUp from "@/app/components/AnimateUp";
import CareerCard from "./CareerCard";

export default function CareersList() {
  const [careers, setCareers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/careers");
        const json = await res.json();
        setCareers(json.data ?? []);
      } catch (error) {
        console.error("[CareersList] Fetch failed:", error);
        setCareers([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  if (isLoading) {
    return <p className="mt-10 text-secondary_color/70">Loading open positions…</p>;
  }

  if (careers.length === 0) {
    return (
      <p className="mt-10 text-secondary_color/70">
        There are no open positions at the moment. Please check back soon.
      </p>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {careers.map((career, index) => (
        <AnimateUp key={career.id} delay={Math.min(index * 0.05, 0.3)}>
          <CareerCard career={career} />
        </AnimateUp>
      ))}
    </div>
  );
}
