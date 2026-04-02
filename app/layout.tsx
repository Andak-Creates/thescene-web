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
  title: "TheScene | Discover Parties and Get Tickets",
  description: "Your next party starts here. Discovery mobile app for party discovery and ticketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
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
