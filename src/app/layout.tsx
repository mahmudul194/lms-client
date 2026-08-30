import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import RouteProgressBar from "@/components/common/RouteProgressBar";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BIM Build BD | Learn BIM Build Your Career",
  description:
    "Professional BIM, Revit Architecture, Structure, MEP, Navisworks, AutoCAD & Dynamo Online Learning Platform. Plan • Build • Deliver.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${jakarta.variable} font-sans h-full antialiased overflow-x-clip w-full max-w-full`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-[#0077b6] selection:text-white font-sans overflow-x-clip w-full max-w-full">
        {/* Global Route Loading Bar */}
        <RouteProgressBar />

        {/* Dynamic Animated Sticky Header */}
        <Header />

        <main className="flex-1 w-full max-w-full overflow-x-clip">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
