export function practiceAreasToNavLinks(sections) {
  return sections.map((area) => ({
    name: area.title,
    href: `/practiceAreas#${area.id}`,
  }));
}

export const PRACTICE_AREAS_SECTIONS = [
  {
    id: "corporate-commercial",
    title: "Corporate & Commercial Law",
    description:
      "Crabbe Crabbe & Co. advises on company formation, mergers and acquisitions, joint ventures, shareholder agreements, and corporate governance. The Firm handles corporate and commercial transactions for businesses in Ghana and internationally.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80",
  },
  {
    id: "litigation-dispute-resolution",
    title: "Litigation & Dispute Resolution",
    description:
      "The Firm represents clients in civil, commercial, and administrative disputes before courts and tribunals. Matters may be pursued through litigation or, where appropriate, through settlement and alternative dispute resolution.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80",
  },
  {
    id: "banking-finance",
    title: "Banking & Finance",
    description:
      "The Firm advises financial institutions, borrowers, and investors on lending transactions, security perfection, project finance, and regulatory compliance under Ghana's banking and finance legal framework.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0bfd0a3b?w=900&q=80",
  },
  {
    id: "real-estate-conveyancing",
    title: "Real Estate & Conveyancing",
    description:
      "The Firm advises on land acquisition, title due diligence, leases, development agreements, and property disputes at each stage of real estate transactions.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
  },
  {
    id: "employment-labour",
    title: "Employment & Labour Law",
    description:
      "The Firm assists employers and employees with contracts, workplace policies, disciplinary proceedings, redundancies, and labour disputes in accordance with applicable employment law.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80",
  },
  {
    id: "criminal-regulatory",
    title: "Criminal & Regulatory Defence",
    description:
      "The Firm provides defence and advisory services in criminal investigations, prosecutions, and regulatory enforcement proceedings.",
    image:
      "https://images.unsplash.com/photo-1589391886965-38b497a08859?w=900&q=80",
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    description:
      "The Firm advises on registration, licensing, and enforcement of trademarks, copyrights, patents, and trade secrets.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&q=80",
  },
  {
    id: "family-matrimonial",
    title: "Family & Matrimonial Law",
    description:
      "The Firm handles divorce, child custody, maintenance, adoption, and estate planning matters in accordance with applicable family law.",
    image:
      "https://images.unsplash.com/photo-1505664194776-60e63eda81bf?w=900&q=80",
  },
  {
    id: "immigration",
    title: "Immigration Law",
    description:
      "The Firm advises individuals and businesses on visas, work permits, residence permits, and citizenship matters in Ghana and for cross-border assignments.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80",
  },
  {
    id: "tax-revenue",
    title: "Tax & Revenue",
    description:
      "The Firm advises on tax planning, compliance, disputes, and proceedings involving the Ghana Revenue Authority.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
  },
  {
    id: "energy-natural-resources",
    title: "Energy & Natural Resources",
    description:
      "The Firm advises on oil and gas, mining, power, and renewable energy projects, including regulatory approvals, joint ventures, and community engagement.",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80",
  },
  {
    id: "debt-recovery-insolvency",
    title: "Debt Recovery & Insolvency",
    description:
      "The Firm acts for creditors and debtors in debt recovery, restructuring, and insolvency proceedings under applicable law.",
    image: "/1.jpg",
  },
];
