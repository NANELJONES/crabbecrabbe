import { Montserrat, Poppins, Urbanist } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import { StateContext } from "./Context/StateContext";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const FAVICON = "/favicon_io";

export const metadata = {
  title: "CrabbeCrabbe&Co",
  description:
    "CrabbeCrabbe&Co — a law firm in Ghana providing trusted legal counsel and representation.",
  icons: {
    icon: [
      { url: `${FAVICON}/favicon.ico`, sizes: "any" },
      {
        url: `${FAVICON}/favicon-16x16.png`,
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: `${FAVICON}/favicon-32x32.png`,
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: `${FAVICON}/apple-touch-icon.png`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: `${FAVICON}/android-chrome-192x192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: `${FAVICON}/android-chrome-512x512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: `${FAVICON}/site.webmanifest`,
  appleWebApp: {
    capable: true,
    title: "Crabbe Crabbe & Co",
    statusBarStyle: "default",
  },
};

export const viewport = {
  themeColor: "#ec3437",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${urbanist.variable} ${montserrat.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className={`${urbanist.className} min-h-full flex flex-col font-sans`}>
        <StateContext>
          <Toast />
          <Nav />
          <main className="mt-16 flex-1 md:mt-[4.5rem]">{children}</main>
          <Footer />
        </StateContext>
      </body>
    </html>
  );
}
