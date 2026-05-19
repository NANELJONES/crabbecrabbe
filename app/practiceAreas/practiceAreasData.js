export function practiceAreasToNavLinks(sections) {
  return sections.map((area) => ({
    name: area.navLabel ?? area.title.replace(/ Law$/, ""),
    href: `/practiceAreas#${area.id}`,
  }));
}

export const PRACTICE_AREAS_SECTIONS = [
  {
    id: "corporate-commercial",
    title: "Corporate & Commercial Law",
    navLabel: "Corporate & Commercial",
    description:
      "Crabbe Crabbe & Co. advises on company formation, mergers and acquisitions, joint ventures, shareholder agreements, and day-to-day corporate governance. We help businesses structure transactions that protect their interests and support sustainable growth across Ghana and beyond.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80",
  },
  {
    id: "litigation-dispute-resolution",
    title: "Litigation & Dispute Resolution",
    description:
      "Our litigation team represents clients in civil, commercial, and administrative disputes before courts and tribunals at every level. We combine rigorous advocacy with practical settlement strategies to achieve the best possible outcomes efficiently.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80",
  },
  {
    id: "banking-finance",
    title: "Banking & Finance",
    description:
      "We advise financial institutions, borrowers, and investors on lending transactions, security perfection, project finance, and regulatory compliance. Our lawyers understand both the legal framework and the commercial realities of finance in Ghana.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0bfd0a3b?w=900&q=80",
  },
  {
    id: "real-estate-conveyancing",
    title: "Real Estate & Conveyancing",
    description:
      "From land acquisition and title due diligence to leases, development agreements, and property disputes, we guide clients through every stage of real estate transactions with precision and attention to detail.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
  },
  {
    id: "employment-labour",
    title: "Employment & Labour Law",
    description:
      "We assist employers and employees with contracts, workplace policies, disciplinary proceedings, redundancies, and labour disputes. Our goal is to resolve matters fairly while minimising disruption to your organisation.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80",
  },
  {
    id: "criminal-regulatory",
    title: "Criminal & Regulatory Defence",
    description:
      "Our criminal practice provides robust defence and advisory services in investigations, prosecutions, and regulatory enforcement. We protect our clients' rights while building clear, persuasive cases at every stage of the process.",
    image:
      "https://images.unsplash.com/photo-1589391886965-38b497a08859?w=900&q=80",
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    description:
      "We help clients protect and enforce trademarks, copyrights, patents, and trade secrets. From registration to licensing and litigation, we safeguard the innovations and brands that drive your business forward.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&q=80",
  },
  {
    id: "family-matrimonial",
    title: "Family & Matrimonial Law",
    description:
      "We handle divorce, child custody, maintenance, adoption, and estate planning matters with sensitivity and discretion. Our team works to resolve family disputes constructively while protecting what matters most to you.",
    image:
      "https://images.unsplash.com/photo-1505664194776-60e63eda81bf?w=900&q=80",
  },
  {
    id: "immigration",
    title: "Immigration Law",
    description:
      "We advise individuals and businesses on visas, work permits, residence permits, and citizenship matters. Whether you are relocating to Ghana or sending talent abroad, we navigate the process with clarity and care.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80",
  },
  {
    id: "tax-revenue",
    title: "Tax & Revenue",
    description:
      "Our tax practice supports clients with planning, compliance, disputes, and negotiations with the Ghana Revenue Authority. We help you understand your obligations and manage tax risk proactively.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
  },
  {
    id: "energy-natural-resources",
    title: "Energy & Natural Resources",
    description:
      "We advise on oil and gas, mining, power, and renewable energy projects, including regulatory approvals, joint ventures, and community engagement. Our experience spans the full project lifecycle in Ghana's resource sector.",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80",
  },
  {
    id: "debt-recovery-insolvency",
    title: "Debt Recovery & Insolvency",
    description:
      "We act for creditors and debtors in debt recovery, restructuring, and insolvency proceedings. Our team pursues practical solutions that maximise recovery while preserving commercial relationships where possible.",
    image: "/1.jpg",
  },
];
