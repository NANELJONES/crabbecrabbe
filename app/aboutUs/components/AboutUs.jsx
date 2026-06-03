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
            Crabbe, Crabbe & Co. is a leading law firm providing strategic
            legal, governance, compliance, regulatory, and consultancy services
            to financial institutions, corporations, businesses, and public sector
            entities. With offices at Tse Addo and Weija, Accra, the Firm
            combines strong legal expertise with practical commercial insight to
            deliver timely, solution-driven, and internationally aligned
            professional services.
          </p>
          <p>
            Beyond delivery, the Firm is animated by a clear institutional
            vision: to grow alongside our clients. Every engagement is
            approached as a long-term partnership in which our presence,
            capability, and depth of service advance in step with the
            institutions we serve. As our clients expand and their needs evolve,
            the Firm continues to invest in people, infrastructure, and practice
            areas to remain a dependable and forward-looking partner.
          </p>
          <p>
            The Firm currently comprises seventeen (17) qualified lawyers, each
            bringing outstanding experience across diverse fields of legal
            practice, including banking and finance law, corporate and
            commercial law, regulatory compliance, debt recovery and enforcement,
            litigation and dispute resolution, property and real estate law,
            labour and employment law, and tax advisory. The legal team is
            supported by a dedicated complement of paralegals, administrative,
            accounting, and operational staff, ensuring that every client
            engagement is supported by both legal excellence and operational
            efficiency.
          </p>
        </div>
      </div>
    </section>
  );
}
