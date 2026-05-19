import Image from "next/image";

/** md is the base unit; large = 2×, xl = 3× */
const SIZE_MAP = {
  sm: "h-10 w-10 md:h-11 md:w-11",
  md: "h-14 w-14 md:h-16 md:w-16",
  large: "h-28 w-28 md:h-32 md:w-32",
  lg: "h-28 w-28 md:h-32 md:w-32",
  xl: "h-[10.5rem] w-[10.5rem] md:h-48 md:w-48",
};

const DIMENSION_MAP = {
  sm: 44,
  md: 64,
  large: 128,
  lg: 128,
  xl: 192,
};

export default function Pattern({
  className = "",
  size = "md",
  count = 3,
  gap = "gap-2",
  layout = "row",
}) {
  const resolvedSize = SIZE_MAP[size] ? size : "md";
  const tileClass = `object-contain ${SIZE_MAP[resolvedSize]}`;
  const dimension = DIMENSION_MAP[resolvedSize];

  const tiles = Array.from({ length: count }).map((_, i) => (
    <Image
      key={i}
      src="/single pattern.png"
      alt=""
      width={dimension}
      height={dimension}
      className={tileClass}
    />
  ));

  if (layout === "grid") {
    return (
      <div
        className={`grid w-fit grid-cols-2 ${gap} ${className}`}
        aria-hidden
      >
        {tiles}
      </div>
    );
  }

  return (
    <div className={`flex items-center ${gap} ${className}`} aria-hidden>
      {tiles}
    </div>
  );
}
