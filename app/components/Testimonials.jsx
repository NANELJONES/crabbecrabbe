"use client";

import AnimateUp from "./AnimateUp";

export default function Testimonials() {
  return (
    <section className="bg-white">
      <div className="section_container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <AnimateUp>
            <div>
              <p className="heading_primary text-sm font-semibold tracking-wide uppercase md:text-base">
                Professional Standards
              </p>
              <h1 className="mt-3">Regulatory Compliance</h1>
              <p className="mt-4">
                In accordance with the Legal Profession Rules of Ghana, the Firm
                does not publish client endorsements, testimonials, or comparative
                claims about its services. Information on this website is provided
                for general reference only.
              </p>
            </div>
          </AnimateUp>

          <AnimateUp delay={0.08}>
            <div className="rounded-lg border border-secondary_color/10 bg-white p-6 shadow-sm">
              <p className="font-medium text-secondary_color">
                The Firm maintains compliance with:
              </p>
              <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-primary_color">
                <li>The Legal Profession Rules of Ghana</li>
                <li>Professional ethical obligations</li>
                <li>Data protection and confidentiality standards</li>
                <li>Anti-Money Laundering (AML/CFT) requirements</li>
              </ul>
              <p className="mt-6 text-sm text-secondary_color/80">
                For enquiries about the Firm&apos;s practice areas or to request
                an appointment, please contact our offices in Tse Addo or Weija,
                Accra.
              </p>
            </div>
          </AnimateUp>
        </div>
      </div>
    </section>
  );
}
