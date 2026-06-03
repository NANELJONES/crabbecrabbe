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

export const metadata = {
  title: "CrabbeCrabbe&Co",
  description:
    "CrabbeCrabbe&Co — a law firm in Ghana providing trusted legal counsel and representation.",
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
