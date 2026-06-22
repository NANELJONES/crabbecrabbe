import Image from "next/image";
import Pattern from "./Pattern";

const MESSAGE = `When I established Crabbe Crabbe & Co., my aim was to build a law firm where clients receive clear advice and competent representation from qualified practitioners. Legal matters can be complex; our role is to explain the relevant law and represent clients in accordance with applicable rules and professional obligations.

Over the years, I have observed the importance of listening to clients' instructions, explaining legal issues in plain terms, and representing their interests diligently — whether in advisory work or in court. That is the standard we apply in our practice.

This firm is guided by discipline and respect for the rule of law. We act for individuals, businesses, and institutions across Ghana. For enquiries, please contact the Firm using the details on this website.`;

export default function MessageFromFounder({ hideHeader = false }) {
  return (
    <section className="bg-white">
      <div className="section_container">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative flex flex-row-reverse gap-10">
            <div className=" absolute md:relative top-4 md:top-0  right-4 md:right-0  z-10   ">
              <Pattern layout="grid" count={4} size="sm" gap="gap-1" />
            </div>
            <div className="relative aspect-[3/4] w-full max-w-md max-h-[500px] overflow-hidden">
              <Image
                src="/company/team 2.jpg"
                alt="Mr Crabbe Crabbe, Head Senior Partner"
                fill
                className="object-cover object-top"
              />
         
            </div>
            <div className="absolute bottom-10 w-full left-10 max-w-[300px] md:left-[60%] md:bottom-1/3 bg-primary_color px-4 py-3 md:px-6 md:py-4">
                <h6 className="font-semibold text-white">Dr. Edward Sam Crabbe Esq.</h6>
                <p className="text-sm text-white/90">Managing Partner</p>
              </div>
          </div>

          <div>
            {!hideHeader && (
              <h1 className="heading_primary">Message From The Founder</h1>
            )}
            <div className={`space-y-4 ${hideHeader ? "" : "mt-6"}`}>
              {MESSAGE.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
