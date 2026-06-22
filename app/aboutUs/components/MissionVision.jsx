import Image from "next/image";
export default function MissionVision() {
  return (
    <section className="py-14 md:py-20">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <h1 className="heading_primary ">Our Mission</h1>
          <p className="mt-4">
            To provide legal services in Ghana with integrity, professional
            competence, and adherence to the Legal Profession Rules, serving
            individuals, businesses, and institutions through qualified legal
            advice and representation.
          </p>
        </div>
        <div>
          <h1 className="heading_primary ">Our Vision</h1>
          <p className="mt-4">
            To maintain a law practice that serves clients in Ghana and
            internationally through qualified legal advice, representation, and
            compliance with applicable professional standards.
          </p>
        </div>
      </div>

      <div className="relative mt-10 aspect-[21/9] max-h-[500px] w-full overflow-hidden md:mt-14">
        <Image
          src="/company/firm.jpg"
          alt="Crabbe Crabbe & Co. office"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
