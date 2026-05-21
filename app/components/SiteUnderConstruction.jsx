import Image from "next/image";

export default function SiteUnderConstruction() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 py-16 text-center md:min-h-[calc(100vh-4.5rem)]">
      <Image
        src="/Loog 2.png"
        alt="Crabbe Crabbe & Co."
        width={200}
        height={80}
        className="h-auto w-40 object-contain md:w-48"
        priority
      />
      <h1 className="mt-10 max-w-xl">Site Under Construction</h1>
      <p className="mt-4 max-w-md text-secondary_color/80">
        We are preparing something exceptional. Please check back soon.
      </p>
      <span className="mt-8 h-1 w-16 bg-primary_color" aria-hidden />
    </section>
  );
}
