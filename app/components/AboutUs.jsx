"use client";

import Image from "next/image";
import AnimateUp from "./AnimateUp";
import AnimatedLine from "./AnimatedLine";
import AnimatedNumber from "./AnimatedNumber";
import ButtonLink from "./ButtonLink";

const STATS = [
  // { label: "Cases Number:", value: 1000, suffix: " +" },
  // { label: "Number of Clients", value: 200, suffix: " +" },
  // { label: "Awards", value: 15, suffix: " +" },
  // { label: "Success Rate", value: 95, suffix: " %" },
  { label: "Experience in Years", value: 10, suffix: " +" },
  // { label: "Client Satisfaction Score", value: 80, suffix: " %" },
];

export default function AboutUs({ hideHeader = false }) {
  return (
    <section className="bg-white">
      <div className={hideHeader ? "" : "section_container"}>
        {!hideHeader && (
          <AnimateUp amount={0.35}>
            <h3 className="heading_primary max-w-3xl">
            Crabbe, Crabbe & Co. is a law firm in Ghana that advises individuals, businesses, financial institutions, and public sector entities on a range of legal and regulatory matters. The firm has offices in Tse Addo and Weija, Accra.

            </h3>
            <AnimatedLine className="mt-8" delay={0.15} amount={0.4} />
          </AnimateUp>
        )}

        <div
          className={`grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 ${hideHeader ? "" : "mt-12"}`}
        >
          <AnimateUp delay={0.05} amount={0.35}>
            <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[420px]">
              <Image
                src="/company/team 1.jpg"
                alt="Crabbe Crabbe & Co. office"
                fill
                className="object-cover"
              />
            </div>
          </AnimateUp>

          <div className="flex flex-col justify-between gap-10">
            <AnimateUp delay={0.08} amount={0.35}>
              <div>
                <p>
                  The Firm provides legal services across corporate and commercial
                  law, banking and finance, litigation and dispute resolution,
                  regulatory compliance, property, labour, and tax. Our lawyers
                  approach each instruction with regard to the client&apos;s
                  objectives, the applicable legal framework, and the standards
                  required under the Legal Profession Rules of Ghana.
                </p>
                <p className="mt-4">
                  Our work is guided by a commitment to professional service,
                  sound judgment, and clear communication. The Firm continues to
                  develop its practice areas, personnel, and internal systems to
                  support complex and evolving client matters.
                </p>
                <div className="mt-8">
                  <ButtonLink href="/aboutUs" variant="primary">
                    More About Us
                  </ButtonLink>
                </div>
              </div>
            </AnimateUp>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {STATS.map((stat, index) => (
                <AnimateUp
                  key={stat.label}
                  delay={index * 0.05}
                  amount={0.4}
                >
                  <div>
                    <p className="text-xs text-secondary_color/70 md:text-sm">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-2xl font-bold text-secondary_color md:text-3xl">
                      <AnimatedNumber
                        value={stat.value}
                        suffix={stat.suffix}
                        duration={1.5 + index * 0.08}
                        amount={0.5}
                      />
                    </p>
                    <AnimatedLine
                      thick
                      className="mt-2"
                      delay={0.15}
                      amount={0.45}
                    />
                  </div>
                </AnimateUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
