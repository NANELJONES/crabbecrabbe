import Image from "next/image";
import ButtonLink from "../../components/ButtonLink";

export default function PracticeAreaSection({
  id,
  title,
  description,
  image,
}) {
  return (
    <section
      id={id}
      className="scroll-mt-[7.5rem] border-b border-secondary_color/10 py-12 first:pt-6 last:border-b-0 md:scroll-mt-[8rem] md:py-16 md:first:pt-8 lg:scroll-mt-[4.5rem]"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2  md:gap-10">

        <div className="md:flex-1 lg:col-span-1">
          <h2 className="heading_primary text-2xl md:text-3xl lg:text-4xl">
            {title}
          </h2>
          <hr className="mt-3 w-full max-w-md border-t-2 border-primary_color" />
        </div>
       
<div className="flex flex-col gap-4 lg:col-span-1">

       {/* this is the image */}
       <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden md:aspect-[3/2] max-h-[250px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 320px"
          />
        </div>
        
        {/* this is the description */}
      <div className=" md:gap-10">
        <p>{description}</p>
        <p>
          Crabbe Crabbe & Co. provides legal services in this practice area.
          For enquiries, please contact the Firm or request an appointment.
        </p>
      </div>

{/* this is the button */}
      <div className="mt-8">
        <ButtonLink href="/appointment">Request an Appointment</ButtonLink>
      </div>

</div>

      </div>

    </section>
  );
}
