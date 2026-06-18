"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import Heading from "../components/Heading";
import AnimateUp from "../components/AnimateUp";
import HeadOfChambers from "../components/HeadOfChambers";
import MrsCrabbe from "../components/MrsCrabbe";
import AsstHeadOfChambers from "../components/AsstHeadOfChambers";
import Layout1 from "../layout/Layout1";
import Pattern from "../components/Pattern";

function CardPatternIcon() {
  return (
    <div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4">
      <Pattern size="sm" count={4} layout="grid" gap="gap-0.5" />
    </div>
  );
}

function TeamMemberCard({ member, onClick, isSelected }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full text-left transition-opacity ${
        isSelected ? "opacity-90" : "hover:opacity-95"
      }`}
      aria-expanded={isSelected}
      aria-label={`View profile for ${member.name}`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-secondary_color/5">
        <CardPatternIcon />
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary_color/10 text-4xl font-semibold text-secondary_color/40">
            {member.name?.charAt(0) ?? "?"}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-primary_color px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-sm font-semibold text-white sm:text-base">
            {member.name}
          </p>
          <p className="text-xs text-white/90 sm:text-sm">{member.title}</p>
        </div>
      </div>
    </button>
  );
}

const CARD_WIDTH =
  "shrink-0 grow-0 basis-[calc((100%-1rem)/2)] max-w-[calc((100%-1rem)/2)] md:basis-[calc((100%-3rem)/3)] md:max-w-[calc((100%-3rem)/3)] lg:basis-[calc((100%-4.5rem)/4)] lg:max-w-[calc((100%-4.5rem)/4)]";
const EXPANDED_WIDTH =
  "mx-auto shrink-0 grow-0 basis-full max-w-2xl md:max-w-3xl lg:basis-[calc((100%-1.5rem)/2)] lg:max-w-[calc((100%-1.5rem)/2)]";

function TeamMemberExpanded({ member, onToggle }) {
  return (
    <div className="flex w-full max-h-[min(28rem,85vh)] flex-col overflow-hidden sm:max-h-[400px]">
      <div className="flex min-h-0 max-h-[400px] flex-1 flex-col sm:flex-row">
        <div className="relative h-52 max-h-[400px] w-full shrink-0 overflow-hidden sm:h-[400px] sm:w-[280px] md:w-[300px]">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes="300px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary_color/10 text-5xl font-semibold text-secondary_color/40">
              {member.name?.charAt(0) ?? "?"}
            </div>
          )}
        </div>

        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-primary_color">
          <div className="sticky top-0 z-10 flex justify-end bg-primary_color p-3 sm:p-4">
            <button
              type="button"
              onClick={onToggle}
              className="flex h-9 w-9 items-center justify-center bg-white text-primary_color shadow-sm transition-opacity hover:opacity-90 sm:h-10 sm:w-10"
              aria-label={`Close ${member.name} profile`}
            >
              <HiXMark className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
            </button>
          </div>

          <div className="no-scrollbar -mt-2 flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-8 pt-0 sm:px-8 sm:pb-10">
            <h3 className="text-xl font-semibold text-white sm:text-2xl">
              {member.name}
            </h3>
            <p className="mt-1 text-sm text-white/90">{member.title}</p>

            <hr className="my-5 border-white/30" />

          {member.expertise?.length > 0 && (
            <>
              <p className="text-sm font-medium text-white">Areas of Expertise</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {member.expertise.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-white px-3 py-1 text-xs text-white sm:text-sm"
                  >
                    {area}
                  </li>
                ))}
              </ul>
              <hr className="my-5 border-white/30" />
            </>
          )}

          <p className="text-sm font-medium text-white">About</p>
          <p className="mt-2 text-sm leading-relaxed text-white/95 sm:text-[0.95rem]">
            {member.bio}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/team");
        const json = await res.json();

        if (!res.ok) {
          console.error("[Team] API error:", json.error ?? res.statusText);
          return;
        }

        console.log("[Team] Loaded", json.data?.length ?? 0, "member(s)");
        setTeam(json.data ?? []);
      } catch (error) {
        console.error("[Team] Fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const toggleMember = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-white">
      <Layout1>
        <AnimateUp>
          <Heading
            heading="Our Team"
            subHeading="Meet the team of experts at Crabbe Crabbe & Co."
          />
        </AnimateUp>

        <AnimateUp>
          <HeadOfChambers />
        </AnimateUp>
        <AnimateUp delay={0.05}>
          <MrsCrabbe />
        </AnimateUp>
        <AnimateUp delay={0.1}>
          <AsstHeadOfChambers />
        </AnimateUp>

        <section>
          <AnimateUp>
            <h2 className="heading_primary mb-8 text-2xl font-bold md:mb-10 md:text-3xl lg:text-4xl">
              Our Expert Team
            </h2>
          </AnimateUp>

          {isLoading && (
            <p className="text-secondary_color/70">Loading team members…</p>
          )}

          {!isLoading && team.length === 0 && (
            <p className="text-secondary_color/70">
              Team profiles will appear here soon.
            </p>
          )}

          <div className="flex w-full flex-wrap justify-center gap-4 md:gap-6">
            {team.map((member, index) => {
              const isExpanded = selectedId === member.id;

              return (
                <AnimateUp
                  key={member.id}
                  delay={Math.min(index * 0.06, 0.36)}
                  className={isExpanded ? EXPANDED_WIDTH : CARD_WIDTH}
                >
                  {isExpanded ? (
                    <TeamMemberExpanded
                      member={member}
                      onToggle={() => toggleMember(member.id)}
                    />
                  ) : (
                    <TeamMemberCard
                      member={member}
                      isSelected={false}
                      onClick={() => toggleMember(member.id)}
                    />
                  )}
                </AnimateUp>
              );
            })}
          </div>
        </section>
      </Layout1>
    </div>
  );
}
