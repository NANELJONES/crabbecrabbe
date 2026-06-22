import SectionTitle from "./SectionTitle";

export default function AboutUs() {
  return (
    <section className="border-t border-secondary_color/10 py-14 md:py-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <SectionTitle>About Crabbe Crabbe & Co.</SectionTitle>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-3">
          <p>
            Crabbe, Crabbe & Co. is a full-service law firm providing legal,
            governance, compliance, regulatory, and consultancy services to
            financial institutions, corporations, businesses, and public sector
            entities. With offices at Tse Addo and Weija, Accra, the Firm advises
            on matters across its practice areas in accordance with applicable law
            and professional rules.
          </p>
          <p>
            The Firm works with clients on an ongoing basis across corporate,
            banking, regulatory, and litigation matters. Our lawyers approach each
            instruction with regard to the client&apos;s objectives and the legal
            framework governing the matter, while maintaining confidentiality and
            clear communication throughout.
          </p>
          <p>
            The Firm currently comprises seventeen (17) qualified lawyers, each
            practising in fields including banking and finance law, corporate and
            commercial law, regulatory compliance, debt recovery and enforcement,
            litigation and dispute resolution, property and real estate law,
            labour and employment law, and tax advisory. The legal team is
            supported by paralegals, administrative, accounting, and operational
            staff.
          </p>
        </div>
      </div>
    </section>
  );
}
