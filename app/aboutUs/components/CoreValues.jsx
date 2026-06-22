import AnimateUp from "../../components/AnimateUp";
import {
  HiOutlineLightBulb,
  HiOutlineScale,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineSparkles,
} from "react-icons/hi2";

const CORE_VALUES = [
  {
    title: "Professional Competence",
    description:
      "We aim to handle each matter with diligence and in accordance with professional standards.",
    icon: HiOutlineSparkles,
  },
  {
    title: "Integrity",
    description:
      "The Firm operates in accordance with the Legal Profession Rules of Ghana and applicable ethical obligations.",
    icon: HiOutlineShieldCheck,
  },
  {
    title: "Responsiveness",
    description:
      "We work within current legal and regulatory frameworks to address clients' legal requirements.",
    icon: HiOutlineLightBulb,
  },
  {
    title: "Collaboration",
    description:
      "We work with clients to understand their instructions and provide advice within our professional duties.",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Justice",
    description:
      "We represent clients diligently and fairly in accordance with applicable law and professional rules.",
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

        <AnimateUp>
          <div className="mt-8 flex gap-4 md:mt-10 md:gap-5">
            <span
              className="w-1 shrink-0 self-stretch bg-primary_color md:w-1.5"
              aria-hidden
            />
            <p className="max-w-4xl">
              Crabbe Crabbe & Co. was established to provide legal services in
              Ghana in accordance with the Legal Profession Rules. The Firm
              continues to serve individuals, businesses, and institutions across
              its practice areas.
            </p>
          </div>
        </AnimateUp>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-14">
          {CORE_VALUES.map((value, index) => (
            <AnimateUp key={value.title} delay={Math.min(index * 0.07, 0.35)}>
              <ValueCard value={value} />
            </AnimateUp>
          ))}
        </div>
      </div>
    </section>
  );
}
