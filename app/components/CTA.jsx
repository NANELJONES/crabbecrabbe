import Image from "next/image";
import ButtonLink from "./ButtonLink";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28 max-h-[500px]">
      <Image
        src="/Pattern.png"
        alt=""
        fill
        className="object-cover object-center opacity-90"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary_color/90 via-primary_color/50 to-white/80" />

      <div className="section_container relative z-10 text-center">
        <h1 className="text-white">
          Contact the Firm
        </h1>
        <p className="mt-4 text-white/90">
          For enquiries or to request an appointment, please use the options below.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/contactUs" variant="secondary">
            Send an enquiry
          </ButtonLink>
          <ButtonLink href="/appointment" variant="primary">
            Request an appointment
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
