import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  // Awaiting params in Next.js 16 to get the route parameters
  await params;
  return {
    title: `You're invited to a party! | TheScene`,
    description: 'Download TheScene app to view this party and secure your spot.',
    openGraph: {
      title: "You're invited to a party!",
      description: 'Download TheScene app to view this party and secure your spot.',
      siteName: 'TheScene',
    },
    twitter: {
      card: 'summary_large_image',
      title: "You're invited to a party!",
      description: 'Download TheScene app to view this party and secure your spot.',
    }
  };
}

export default async function PartyFallback({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Subtle Background Gradient matching the Hero and brand */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.15),transparent_50%)]"></div>
      
      <div className="relative z-10 max-w-xl w-full text-center space-y-6 sm:space-y-8 px-6 py-8 sm:p-10 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md shadow-2xl">
        {/* Brand Icon / Party Icon */}
        <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-theme-purple to-purple-400 rounded-[1.25rem] sm:rounded-[1.5rem] flex items-center justify-center shadow-[0_0_40px_rgba(147,51,234,0.4)] mb-2 relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/20 blur-md rounded-full transform scale-0 group-hover:scale-150 transition-transform duration-700 ease-out"></div>
          <svg className="w-12 h-12 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
          </svg>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
            You&apos;re Invited!
          </h1>
          <p className="text-lg md:text-xl text-theme-muted font-medium leading-relaxed px-4">
            Download <strong className="text-white font-semibold">TheScene</strong> app to view the details for this party and secure your spot.
          </p>
        </div>

        <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          {/* Apple App Store Button */}
          <a
            href="https://apps.apple.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 border border-white/20 rounded-2xl text-white hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all duration-300 w-full sm:w-auto overflow-hidden group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <svg viewBox="0 0 384 512" className="h-6 w-6 sm:h-7 sm:w-7 fill-current relative z-10" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            <div className="flex flex-col items-start leading-[1.1] relative z-10 pt-0.5">
              <span className="text-[10px] sm:text-[11px] font-medium text-white/70 tracking-wide uppercase">Download on the</span>
              <span className="text-xl sm:text-2xl font-semibold tracking-tight">App Store</span>
            </div>
          </a>

          {/* Google Play Button */}
          <a
            href="https://play.google.com/store/apps/details?id=com.vindi.thescene"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 border border-white/20 rounded-2xl text-white hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all duration-300 w-full sm:w-auto overflow-hidden group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <svg viewBox="0 0 512 512" className="h-6 w-6 sm:h-7 sm:w-7 fill-current relative z-10" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg">
              <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
            </svg>
            <div className="flex flex-col items-start leading-[1.1] relative z-10 pt-0.5">
              <span className="text-[10px] sm:text-[11px] font-medium text-white/70 tracking-wide uppercase">GET IT ON</span>
              <span className="text-xl sm:text-2xl font-semibold tracking-tight">Google Play</span>
            </div>
          </a>
        </div>
        
        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-theme-muted hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to TheScene homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
