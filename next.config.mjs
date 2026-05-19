/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_EMAIL_PUBLIC_SERVICE_ID: process.env.EMAIL_PUBLIC_SERVICE_ID,
    NEXT_PUBLIC_EMAIL_PUBLIC_TEMPLATE_ID: process.env.EMAIL_PUBLIC_TEMPLATE_ID,
    NEXT_PUBLIC_APPOINTMENT_TEMPLATE_ID: process.env.APPOINTMENT_TEMPLATE_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Hygraph / GraphCMS asset CDN (all regions)
      {
        protocol: "https",
        hostname: "**.graphassets.com",
      },
      {
        protocol: "https",
        hostname: "media.graphassets.com",
      },
      // Hygraph content CDN
      {
        protocol: "https",
        hostname: "**.cdn.hygraph.com",
      },
    ],
  },
};

export default nextConfig;
