import SectionTitle from "./SectionTitle";

const REASONS = [
  "Deep understanding of law, governance and compliance frameworks",
  "Practical, commercially focused legal solutions",
  "Strong litigation and recovery capabilities",
  "High ethical and professional standards",
  "Prompt response and institutional support",
  "Confidential and strategic advisory services",
];

const COMPLIANCE_STANDARDS = [
  "The Legal Profession Rules of Ghana",
  "Professional ethical obligations",
  "Data protection and confidentiality standards",
  "Anti-Money Laundering (AML/CFT) requirements",
  "Corporate governance best practices",
];

export default function WhyClientsChooseUs() {
  return (
    <section className="border-t border-secondary_color/10 py-14 md:py-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <SectionTitle>Why Clients Choose Us</SectionTitle>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-3">
          <div>
            <p className="font-medium text-secondary_color">
              Our clients choose us because we give them:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-primary_color">
              {REASONS.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-medium text-secondary_color">
              The Firm maintains strict compliance with:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-primary_color">
              {COMPLIANCE_STANDARDS.map((standard) => (
                <li key={standard}>{standard}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
