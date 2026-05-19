import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";
import Pattern from "./Pattern";

const VALUES = [
  {
    title: "Strategic Thinking, Not Just Legal Advice",
    description:
      "We approach every case with a business and outcome-focused mindset.",
  },
  {
    title: "Client-Centered Approach",
    description:
      "Your goals shape our strategy. We listen, understand, and act in your best interest.",
  },
  {
    title: "Integrity You Can Trust",
    description:
      "Transparency and ethical practice are at the core of everything we do.",
  },
  {
    title: "Innovative Legal Solutions",
    description:
      "We combine traditional expertise with modern approaches to deliver results.",
  },
];

const HIGHLIGHTS = ["PROFESSIONAL", "TALENT ABOVE", "MAIN POINT"];

export default function UniqueValueProposition() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/Nice bg.jpg"
        alt=""
        fill
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-primary_color/20" />

      <div className="section_container flex flex-col lg:gap-10 relative z-10">
        <h1 className="text-left text-white  ">Our Unique Value Proposition</h1>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
          {VALUES.map((item, index) => (
            <div key={item.title} className="border-b border-white/30 pb-10">
              <div className="flex items-start gap-3">
                <span className="button_icon mt-0.5 shrink-0 border-white">
                  <HiArrowRight className="h-3.5 w-3.5 text-white" aria-hidden />
                </span>
                <div>
                  <h3 className="text-white">{item.title}</h3>
                  <p className="mt-2 text-white/90">{item.description}</p>
                </div>
              </div>
              {index < VALUES.length - 1 && (
                <hr className="mt-8 border-white/30 md:hidden" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-md text-white md:text-lg">
            We are more than legal advisors — we are strategic partners committed
            to your long-term success.
          </p>

          <div className="flex flex-wrap items-center justify-end gap-4">
            {HIGHLIGHTS.map((label) => (
              <div
                key={label}
                className="flex h-24 w-24 items-center justify-center bg-white p-1 text-center md:h-28 md:w-28 lg:h-32 lg:w-32"
              >

                <div  className="rounded-full bg-primary_color w-full h-full flex items-center justify-center">
                <span className="px-2 text-[0.65rem] font-bold tracking-wide text-white uppercase md:text-xs">
                  {label}
                </span> </div>
               
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
