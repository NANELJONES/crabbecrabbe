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
            Crabbe Crabbe & Co. is a modern Ghanaian law firm built on excellence,
            integrity, and a deep commitment to client success. We combine
            rigorous legal expertise with practical, business-minded counsel to
            help individuals and organisations navigate complex matters with
            confidence.
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
