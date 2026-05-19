import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}) {
  const variantClass =
    variant === "secondary" ? "secondary_button" : "primary_button";

  return (
    <Link href={href} className={`${variantClass} ${className}`}>
      <span>{children}</span>
      <span className="button_icon">
        <HiArrowRight className="h-3.5 w-3.5" aria-hidden />
      </span>
    </Link>
  );
}
