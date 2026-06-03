import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { formatCaseStatus, formatCourt } from "../caseEnums";

export default function CaseCard({ caseItem }) {
  const dateLabel = caseItem.endDate
    ? moment(caseItem.endDate).format("DD MMM YYYY")
    : caseItem.startDate
      ? moment(caseItem.startDate).format("DD MMM YYYY")
      : null;

  return (
    <Link
      href={`/cases/${caseItem.slug}`}
      className="group flex h-full flex-col overflow-hidden border border-secondary_color/10 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary_color/5">
        {caseItem.coverImage ? (
          <Image
            src={caseItem.coverImage}
            alt={caseItem.caseName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-secondary_color/50">
            {caseItem.caseName}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-secondary_color transition-colors group-hover:text-primary_color md:text-xl">
          {caseItem.caseName}
        </h3>

        <div className="flex flex-wrap gap-2">
          {caseItem.caseStatus && (
            <span className="rounded-full bg-primary_color/10 px-3 py-1 text-xs font-medium text-primary_color">
              {formatCaseStatus(caseItem.caseStatus)}
            </span>
          )}
          {caseItem.courts && (
            <span className="rounded-full bg-secondary_color/10 px-3 py-1 text-xs font-medium text-secondary_color">
              {formatCourt(caseItem.courts)}
            </span>
          )}
          {caseItem.practiceAreas?.map((pa) => (
            <span
              key={pa.slug}
              className="rounded-full border border-secondary_color/15 px-3 py-1 text-xs text-secondary_color/80"
            >
              {pa.name}
            </span>
          ))}
        </div>

        {dateLabel && (
          <p className="mt-auto text-xs text-secondary_color/60">{dateLabel}</p>
        )}
      </div>
    </Link>
  );
}
