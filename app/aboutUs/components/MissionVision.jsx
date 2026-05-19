import Image from "next/image";
export default function MissionVision() {
  return (
    <section className="py-14 md:py-20">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <h1 className="heading_primary ">Our Mission</h1>
          <p className="mt-4">
            To be a leading and trusted law firm in Ghana, globally recognised
            for excellence in advocacy, integrity in practice, and consistent
            delivery of innovative, practical legal solutions that drive client
            success.
          </p>
        </div>
        <div>
          <h1 className="heading_primary ">Our Vision</h1>
          <p className="mt-4">
            To be a globally acclaimed law firm, renowned for delivering
            exceptional legal solutions and setting the highest standards of
            excellence.
          </p>
        </div>
      </div>

      <div className="relative mt-10 aspect-[21/9] max-h-[500px] w-full overflow-hidden md:mt-14">
        <Image
          src="/company/firm.jpg"
          alt="Modern city skyline"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
