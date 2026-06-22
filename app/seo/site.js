import { SEO_KEYWORDS } from "./keywords";

export const SITE_NAME = "Crabbe Crabbe & Co";
export const SITE_TITLE_DEFAULT =
  "Crabbe Crabbe & Co | Law Firm in Ghana — International Legal Services";
export const SITE_DESCRIPTION =
  "Crabbe Crabbe & Co. is a full-service Ghanaian law firm with offices in Tse Addo and Weija, Accra. The Firm advises local and international clients on corporate, banking, litigation, regulatory, commercial, property, tax, and related legal matters.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.crabbecrabbeandco.com";

export const SITE_METADATA = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE_DEFAULT,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  // Meta keywords tag (400 terms — within the 300–500 target range)
  keywords: SEO_KEYWORDS.slice(0, 400),
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Legal Services",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    alternateLocale: ["en_US", "en_GB"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
    countryName: "Ghana",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
  },
  other: {
    "geo.region": "GH-AA",
    "geo.placename": "Accra",
    "geo.position": "5.6037;-0.1870",
    ICBM: "5.6037, -0.1870",
  },
};
