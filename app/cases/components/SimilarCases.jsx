"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatCaseStatus } from "../caseEnums";

function SimilarCaseCard({ caseItem }) {
  return (
    <Link
      href={`/cases/${caseItem.slug}`}
      className="flex flex-col gap-3 rounded-lg border border-secondary_color/10 bg-white p-4 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-secondary_color/5">
        {caseItem.coverImage ? (
          <Image
            src={caseItem.coverImage}
            alt={caseItem.caseName}
            fill
            className="object-cover"
            sizes="300px"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-2 text-center text-xs text-secondary_color/50">
            {caseItem.caseName}
          </div>
        )}
      </div>
      <h6 className="font-semibold text-secondary_color hover:text-primary_color">
        {caseItem.caseName}
      </h6>
      {caseItem.caseStatus && (
        <p className="text-xs text-primary_color">
          {formatCaseStatus(caseItem.caseStatus)}
        </p>
      )}
    </Link>
  );
}

export default function SimilarCases({
  practiceAreaSlugs = [],
  excludeSlug,
  limit = 5,
}) {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const slugs = practiceAreaSlugs.filter(Boolean);

  useEffect(() => {
    if (slugs.length === 0) {
      setCases([]);
      setLoading(false);
      return;
    }

    const fetchSimilar = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          practiceAreas: slugs.join(","),
          exclude: excludeSlug ?? "",
          limit: String(limit),
        });
        const res = await fetch(`/api/cases/similar?${params}`);
        const json = await res.json();
        setCases(json.data ?? []);
      } catch (error) {
        console.error("[SimilarCases] Fetch failed:", error);
        setCases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [excludeSlug, limit, slugs.join(",")]);

  return (
    <aside>
      <h5 className="mb-4 text-lg font-bold text-secondary_color">Similar Cases</h5>

      {loading && (
        <p className="text-sm text-secondary_color/60">Loading similar cases…</p>
      )}

      {!loading && slugs.length === 0 && (
        <p className="text-sm text-secondary_color/60">
          Assign team members with practice areas in the CMS to see similar cases.
        </p>
      )}

      {!loading && slugs.length > 0 && cases.length === 0 && (
        <p className="text-sm text-secondary_color/60">
          No similar cases for this practice area yet.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {cases.map((caseItem) => (
          <SimilarCaseCard key={caseItem.slug} caseItem={caseItem} />
        ))}
      </div>
    </aside>
  );
}
