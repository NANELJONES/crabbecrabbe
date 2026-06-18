import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

export default function CareerCard({ career }) {
  return (
    <Link
      href={`/careers/${career.slug}`}
      className="group flex h-full flex-col justify-between border border-secondary_color/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
        <div>
          <h3 className="text-2xl font-bold text-secondary_color transition-colors group-hover:text-primary_color md:text-3xl">
            {career.jobName}
          </h3>
          <p
            className={`mt-1 text-sm font-medium ${
              career.available ? "text-primary_color" : "text-secondary_color/60"
            }`}
          >
            {career.available ? "Available" : "Unavailable"}
          </p>
        </div>
      <span className="primary_button mt-6 inline-flex w-fit">
        <span>View position</span>
        <span className="button_icon">
          <HiArrowRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </span>
    </Link>
  );
}
