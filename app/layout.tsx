import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { AOSInit } from "@/components/AOSInit";
import OpenInAppBanner from "@/components/OpenInAppBanner";
import Navbar from "@/components/Navbar";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "TheScene | Discover Parties and Get Tickets",
  description:
    "Your next party starts here. Discover the best local parties, events, and buy tickets instantly with TheScene app.",
  keywords: ["parties", "events", "tickets", "nightlife", "discovery", "thescene", "clubbing"],
  openGraph: {
    title: "TheScene | Discover Parties and Get Tickets",
    description: "Your next party starts here. Discover the best local parties, events, and buy tickets instantly with TheScene app.",
    url: "/",
    siteName: "TheScene",
    images: [
      {
        url: "/thescenne-logo.png",
        width: 1200,
        height: 630,
        alt: "TheScene Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheScene | Discover Parties and Get Tickets",
    description: "Your next party starts here. Discover the best local parties, events, and buy tickets instantly with TheScene app.",
    images: ["/thescenne-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${syne.variable} ${dmSans.variable} font-body antialiased bg-theme-bg text-theme-white`}
      >
        <OpenInAppBanner />
        <AOSInit />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
