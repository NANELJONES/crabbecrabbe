import Image from "next/image";

export default function Heading({
  heading,
  subHeading,
  className = "",
}) {
  return (
    <div
      className={`mb-10 flex w-full border-b border-b-10 border-primary_color  flex-col gap-8 overflow-visible bg-white pb-2 lg:mb-12 lg:flex-row lg:items-start lg:justify-between lg:gap-12 ${className}`}
    >
      <div className="flex min-w-0 flex-1 gap-4 md:gap-5">
        <span
          className="w-1 shrink-0 self-stretch bg-primary_color md:w-1.5"
          aria-hidden
        />
        <h1 className="heading_primary max-w-2xl text-4xl font-bold md:text-[5em]">
          {heading}
        </h1>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-3 lg:flex-1">
        <div className="relative aspect-[5/2] w-full min-h-[140px] sm:min-h-[160px] md:min-h-[200px]">
          <Image
            src="/Pattern.png"
            alt=""
            fill
            className="object-cover object-center"
            priority={false}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        {subHeading ? (
          <h5 className="w-full !font-regular text-secondary_color">
            {subHeading}
          </h5>
        ) : null}
      </div>
    </div>
  );
}
