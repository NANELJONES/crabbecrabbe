import Image from "next/image";
import { HiArrowRight } from "react-icons/hi2";
import Pattern from "./Pattern";

const VALUES = [
  {
    title: "Commercial Context in Legal Advice",
    description:
      "Legal advice is provided with regard to the commercial and regulatory context of each matter.",
  },
  {
    title: "Client Communication",
    description:
      "We listen to clients' instructions and provide advice in accordance with our professional duties.",
  },
  {
    title: "Professional Integrity",
    description:
      "The Firm operates in accordance with the Legal Profession Rules of Ghana and applicable ethical standards.",
  },
  {
    title: "Qualified Legal Practitioners",
    description:
      "Matters are handled by enrolled solicitors and barristers of the Superior Courts of Ghana.",
  },
];

const HIGHLIGHTS = ["ACCRA OFFICES", "17 LAWYERS", "EST. 2015"];

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
        <h1 className="text-left text-white  ">Our Approach to Legal Practice</h1>

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
            Crabbe Crabbe & Co. provides legal advice and representation across
            its practice areas. For enquiries, please contact the Firm.
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
