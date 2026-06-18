"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { HiArrowRight } from "react-icons/hi2";
import Layout1 from "@/app/layout/Layout1";
import { CONTACT_EMAIL } from "@/app/Data/contactInfo";

function getApplyMailto(jobName) {
  const subject = encodeURIComponent(`Application: ${jobName}`);
  return `mailto:${CONTACT_EMAIL.display}?subject=${subject}`;
}

export default function CareerDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCareer = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/careers/${slug}`);
        const json = await res.json();

        if (!res.ok) {
          setError(json.error ?? "Position not found");
          setCareer(null);
          return;
        }

        setCareer(json.data);
      } catch (err) {
        console.error("[CareerDetail] Fetch failed:", err);
        setError("Failed to load position");
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [slug]);

  if (loading) {
    return (
      <Layout1>
        <p className="text-secondary_color/70">Loading position…</p>
      </Layout1>
    );
  }

  if (error || !career) {
    return (
      <Layout1>
        <p className="text-secondary_color/70">{error ?? "Position not found"}</p>
        <Link href="/careers" className="primary_button mt-6 inline-flex">
          Back to careers
        </Link>
      </Layout1>
    );
  }

  return (
    <Layout1>
      <div className="flex max-w-3xl flex-col gap-8 md:mt-[3em]">
        <Link
          href="/careers"
          className="text-sm font-medium text-primary_color hover:underline"
        >
          ← Back to careers
        </Link>

        <div>
          <h1 className="heading_primary text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {career.jobName}
          </h1>
          <p
            className={`mt-2 text-base font-medium md:text-lg ${
              career.available ? "text-primary_color" : "text-secondary_color/60"
            }`}
          >
            {career.available ? "Available" : "Unavailable"}
          </p>
        </div>

        {career.description && (
          <article className="case-rich-text max-w-none">
            <RichText content={career.description} />
          </article>
        )}

        {career.available && (
          <a
            href={getApplyMailto(career.jobName)}
            className="primary_button inline-flex w-fit"
          >
            <span>Apply Here</span>
            <span className="button_icon">
              <HiArrowRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </a>
        )}
      </div>
    </Layout1>
  );
}
