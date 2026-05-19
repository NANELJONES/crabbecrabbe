import Image from "next/image";
import {
  HiOutlineLightBulb,
  HiOutlineScale,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineSparkles,
} from "react-icons/hi2";

const CORE_VALUES = [
  {
    title: "Excellence",
    description:
      "We pursue the highest standards in every matter we handle, delivering precise and effective legal solutions.",
    icon: HiOutlineSparkles,
  },
  {
    title: "Integrity",
    description:
      "Honesty, transparency, and ethical practice guide every decision we make on behalf of our clients.",
    icon: HiOutlineShieldCheck,
  },
  {
    title: "Innovation",
    description:
      "We embrace forward-thinking approaches to solve complex legal challenges in a changing world.",
    icon: HiOutlineLightBulb,
  },
  {
    title: "Collaboration",
    description:
      "We work closely with clients as partners, aligning our strategy with their goals and priorities.",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Justice",
    description:
      "We advocate fiercely and fairly, ensuring every client receives dedicated and principled representation.",
    icon: HiOutlineScale,
  },
];

function ValueCard({ value }) {
  const Icon = value.icon;
  return (
    <article className="relative mx-auto  min-h-[180px] max-h-[250px] max-h-[250px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#4a6fa5] via-[#7a9bc4] to-[#e8eef5] p-6 aspect-square flex flex-col justify-between ">
      <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-white">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <h4 className="pr-12 text-lg font-semibold text-white">{value.title}</h4>
      <p className="mt-3 text-sm leading-relaxed text-white/90">
        {value.description}
      </p>
    </article>
  );
}

export default function CoreValues() {
  return (
    <section className="relative overflow-hidden py-14 md:py-20">
   
      <div className="absolute inset-0 bg-white/70" />

      <div className="relative z-10">
        <h1 className="heading_primary">Our Story & Core Values</h1>

        <div className="mt-8 flex gap-4 md:mt-10 md:gap-5">
          <span
            className="w-1 shrink-0 self-stretch bg-primary_color md:w-1.5"
            aria-hidden
          />
          <p className="max-w-4xl">
            Crabbe Crabbe & Co. was founded with a clear vision to redefine legal
            service delivery in Ghana through excellence, trust, and innovation.
            From its inception, the firm has remained focused on building strong
            client relationships while delivering results that matter.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-14">
          {CORE_VALUES.map((value) => (
            <ValueCard key={value.title} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
}
