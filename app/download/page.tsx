"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DownloadPage() {
  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    // Give priority to the app stores since they are explicitly clicking download
    if (isIOS) {
      window.location.href = "https://apps.apple.com/ng/app/thescene-nightlife-discovery/id6760138122";
    } else if (isAndroid) {
      window.location.href = "https://play.google.com/store/apps/details?id=com.vindi.thescene";
    } else {
      // Fallback for desktop: maybe a page with QR codes or just link to iOS store
      window.location.href = "https://apps.apple.com/ng/app/thescene-nightlife-discovery/id6760138122";
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-theme-bg flex flex-col items-center justify-center pt-32 pb-12 px-4 text-center">
        <div className="w-20 h-20 bg-theme-purple/20 border-2 border-theme-purple rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <svg className="w-10 h-10 text-theme-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-4">Redirecting to App Store...</h1>
        <p className="text-theme-muted text-base sm:text-lg">
          If you are not redirected automatically,{" "}
          <a href="https://apps.apple.com/ng/app/thescene-nightlife-discovery/id6760138122" className="text-theme-purple hover:underline">
            click here
          </a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
