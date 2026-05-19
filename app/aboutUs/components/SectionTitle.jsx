export default function SectionTitle({ children, className = "" }) {
  return (
    <div className={`flex gap-4 md:gap-5 ${className}`}>
      <span
        className="w-1 shrink-0 self-stretch bg-primary_color md:w-1.5"
        aria-hidden
      />
      <h1 className="heading_primary">{children}</h1>
    </div>
  );
}
