import Image from "next/image";
import Pattern from "./Pattern";

const MESSAGE = `When I established Crabbe Crabbe & Co., my aim was simple: to build a law firm where clients receive clear advice, strong representation, and a team that genuinely cares about the outcome of their matter. Legal problems can be stressful; our role is to guide you through them with confidence and composure.

Over the years, I have seen how much difference it makes when a lawyer listens first, explains the law in plain terms, and fights strategically for the client's interests — whether in the boardroom or in court. That is the standard we hold ourselves to every day.

This firm is built on trust, discipline, and a deep respect for the rule of law. We serve individuals, businesses, and institutions across Ghana with the same commitment: thorough preparation, honest counsel, and results that matter. Thank you for considering Crabbe Crabbe & Co. I look forward to the opportunity to serve you.`;

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
                <h6 className="font-semibold text-white">Mr Crabbe Crabbe</h6>
                <p className="text-sm text-white/90">Head Senior Partner</p>
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
