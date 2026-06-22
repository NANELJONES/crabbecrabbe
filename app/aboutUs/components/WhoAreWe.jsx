import Image from "next/image";
import Pattern from "../../components/Pattern";
import SectionTitle from "./SectionTitle";

const GALLERY_IMAGES = [
  { src: "/company/firm 3.jpg", alt: "Crabbe Crabbe & Co. library" },
  {
    src: "/company/firm 2.jpg",
    alt: "Law firm library shelves",
  },
  {
    src: "/company/firm.jpg",
    alt: "Professional legal environment",
  },
];

export default function WhoAreWe() {
  return (
    <section className="py-14 md:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-between">
          <SectionTitle>Who Are We?</SectionTitle>
     
     
        <div className="flex flex-col gap-4">
        <Pattern  count={3} size="large" gap="gap-1.5" />
        <Pattern  count={3} size="large" gap="gap-1.5" />
        </div>
        
        </div>

        <div className="flex flex-col gap-8">
          <p>
            Crabbe Crabbe & Co. is a full-service law firm in Ghana with offices in
            Tse Addo and Weija, Accra. The Firm advises local and international
            clients on matters within its practice areas, including corporate and
            commercial law, banking and finance, litigation, regulatory compliance,
            property, labour, and tax.
          </p>
          <p>
            The Firm&apos;s lawyers work with regard to each client&apos;s
            commercial and regulatory context, with attention to the legal issues
            involved and the standards required under the Legal Profession Rules
            of Ghana.
          </p>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {GALLERY_IMAGES.map((img) => (
              <div
                key={img.src}
                className="relative aspect-[3/5] w-full overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
