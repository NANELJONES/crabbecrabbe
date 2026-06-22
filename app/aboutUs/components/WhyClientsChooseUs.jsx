import SectionTitle from "./SectionTitle";

const SERVICES = [
  "Legal advice on law, governance, and compliance frameworks",
  "Corporate and commercial legal services",
  "Litigation and debt recovery services",
  "Adherence to professional ethical standards",
  "Administrative and institutional support",
  "Confidential advisory services",
];

const COMPLIANCE_STANDARDS = [
  "The Legal Profession Rules of Ghana",
  "Professional ethical obligations",
  "Data protection and confidentiality standards",
  "Anti-Money Laundering (AML/CFT) requirements",
  "Corporate governance standards",
];

export default function WhyClientsChooseUs() {
  return (
    <section className="border-t border-secondary_color/10 py-14 md:py-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <SectionTitle>What We Offer</SectionTitle>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-3">
          <div>
            <p className="font-medium text-secondary_color">
              The Firm provides:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-primary_color">
              {SERVICES.map((item) => (
                <li key={item}>{item}</li>
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
