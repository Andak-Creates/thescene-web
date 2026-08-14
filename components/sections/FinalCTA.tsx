import React from "react";
import Section from "../Section";

const FinalCTA = () => {
  return (
    <Section id="final-cta" className="bg-theme-bg relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-theme-purple/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-6xl font-heading font-extrabold text-white mb-6 tracking-tight"
        >
          Your next event starts here.
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-xl text-theme-muted mb-12 max-w-2xl mx-auto"
        >
          Discover what&apos;s happening around you and get your ticket in
          seconds.
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          {/* App Store Button */}
          <a
            href="https://apps.apple.com/ng/app/thescene-nightlife-discovery/id6760138122"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-theme-purple/90 border border-theme-purple rounded-2xl text-white hover:bg-theme-purple active:scale-95 transition-all duration-300 w-full sm:w-auto"
          >
            <svg
              viewBox="0 0 384 512"
              className="h-6 w-6 fill-current"
              aria-hidden="true"
            >
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <div className="flex flex-col items-start leading-[1.1]">
              <span className="text-[11px] font-medium text-white/80 uppercase">
                Download on the
              </span>
              <span className="text-xl font-semibold">App Store</span>
            </div>
          </a>

          {/* Google Play Button */}
          <a
            href="https://play.google.com/store/apps/details?id=com.vindi.thescene"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/20 rounded-2xl text-white hover:bg-white/10 active:scale-95 transition-all duration-300 w-full sm:w-auto"
          >
            <svg
              viewBox="0 0 512 512"
              className="h-6 w-6 fill-current"
              aria-hidden="true"
            >
              <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
            </svg>
            <div className="flex flex-col items-start leading-[1.1]">
              <span className="text-[11px] font-medium text-white/70 uppercase">
                Get it on
              </span>
              <span className="text-xl font-semibold">Google Play</span>
            </div>
          </a>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="pt-10 border-t border-white/10"
        >
          <p className="text-theme-muted mb-4">Already hosting an event?</p>
          <a
            href="https://bhind.thesceneapp.online"
            className="inline-flex items-center justify-center font-semibold text-theme-purple hover:text-white transition-colors"
          >
            Get started &rarr;
          </a>
        </div>
      </div>
    </Section>
  );
};

export default FinalCTA;
