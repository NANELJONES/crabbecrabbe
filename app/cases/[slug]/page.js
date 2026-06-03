"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Layout1 from "@/app/layout/Layout1";
import ShareSocials from "@/app/components/ShareSocials";
import SimilarCases from "../components/SimilarCases";
import { formatCaseStatus, formatCourts } from "../caseEnums";

export default function CaseDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCase = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/cases/${slug}`);
        const json = await res.json();

        if (!res.ok) {
          setError(json.error ?? "Case not found");
          setCaseData(null);
          return;
        }

        setCaseData(json.data);
      } catch (err) {
        console.error("[CaseDetail] Fetch failed:", err);
        setError("Failed to load case");
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [slug]);

  if (loading) {
    return (
      <Layout1>
        <p className="text-secondary_color/70">Loading case…</p>
      </Layout1>
    );
  }

  if (error || !caseData) {
    return (
      <Layout1>
        <p className="text-secondary_color/70">{error ?? "Case not found"}</p>
        <Link href="/cases" className="primary_button mt-6 inline-flex">
          Back to cases
        </Link>
      </Layout1>
    );
  }

  const courtsLabel = formatCourts(caseData.courts);
  const metaPillClass =
    "inline-flex w-fit rounded-full bg-primary_color px-3 py-1 text-xs font-medium text-white";
  const duration =
    caseData.startDate && caseData.endDate
      ? `${moment(caseData.startDate).format("DD MMM YYYY")} – ${moment(caseData.endDate).format("DD MMM YYYY")}`
      : caseData.startDate
        ? moment(caseData.startDate).format("DD MMM YYYY")
        : caseData.endDate
          ? moment(caseData.endDate).format("DD MMM YYYY")
          : null;

  return (
    <Layout1>
      <div className="flex flex-col gap-10 md:mt-[3em] md:flex-row-reverse md:items-start md:gap-12">
        <div className="w-full md:w-[30%] md:shrink-0">
          <SimilarCases
            practiceAreaSlugs={caseData.practiceAreas?.map((pa) => pa.slug)}
            excludeSlug={caseData.slug}
            limit={5}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-8 md:w-[70%]">
          <Link
            href="/cases"
            className="text-sm font-medium text-primary_color hover:underline"
          >
            ← Back to cases
          </Link>

          <h1 className="heading_primary mb-0 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {caseData.caseName}
          </h1>

          {(caseData.caseStatus || courtsLabel) && (
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {caseData.caseStatus && (
                <div className="flex flex-col text-sm text-secondary_color">
                  <p className="font-medium">Status:</p>
                  <p className={`mt-1 ${metaPillClass}`}>
                    {formatCaseStatus(caseData.caseStatus)}
                  </p>
                </div>
              )}
              {courtsLabel && (
                <div className="flex flex-col text-sm text-secondary_color">
                  <p className="font-medium">Courts:</p>
                  <p className={`mt-1 ${metaPillClass}`}>{courtsLabel}</p>
                </div>
              )}
            </div>
          )}

          {(caseData.practiceAreas?.length > 0 || caseData.team?.length > 0) && (
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {caseData.practiceAreas?.length > 0 && (
                <div className="flex flex-col text-sm text-secondary_color">
                  <p className="font-medium">Practice Areas:</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {caseData.practiceAreas.map((pa) => (
                      <p key={pa.slug} className={metaPillClass}>
                        {pa.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {caseData.team?.length > 0 && (
                <div className="flex flex-col text-sm text-secondary_color">
                  <p className="font-medium">Team:</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {caseData.team.map((member) => (
                      <p
                        key={member.id ?? member.name}
                        className={metaPillClass}
                      >
                        {member.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {duration && (
            <div className="text-sm text-secondary_color">
              <div className="border-l-4 border-l-primary_color pl-3">
                <p className="font-medium">Duration: </p>
                {duration}
              </div>
            </div>
          )}

          <ShareSocials
            shareUrl={`/cases/${caseData.slug}`}
            shareTitle={caseData.caseName}
            shareDescription={`Case study: ${caseData.caseName}`}
          />

          {caseData.coverImage && (
            <div className="relative aspect-[21/9] max-h-[420px] w-full overflow-hidden">
              <Image
                src={caseData.coverImage}
                alt={caseData.caseName}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 700px"
                priority
              />
            </div>
          )}

          {caseData.caseContent && (
            <article className="case-rich-text max-w-none">
              <RichText content={caseData.caseContent} />
            </article>
          )}
        </div>
      </div>
    </Layout1>
  );
}
