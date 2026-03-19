import React from 'react';
import Button from '../Button';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-32 overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.08),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-8xl font-heading font-extrabold text-white mb-8 leading-[1.1] tracking-tighter">
          Your Next Party <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-purple to-purple-400">Starts Here</span>
        </h1>
        <p data-aos="fade-up" data-aos-delay="200" className="text-lg md:text-xl text-theme-muted mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          The ultimate platform for discovering the hottest parties and securing your tickets instantly. Seamless, secure, and always on.
        </p>
        
        <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col items-center gap-6 mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            {/* Apple App Store Button */}
            <a
              href="https://apps.apple.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 bg-theme-purple/90 border border-theme-purple rounded-2xl text-white hover:bg-theme-purple active:scale-95 transition-all duration-300 w-full sm:w-auto overflow-hidden group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <svg viewBox="0 0 384 512" className="h-6 w-6 sm:h-7 sm:w-7 fill-current relative z-10" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <div className="flex flex-col items-start leading-[1.1] relative z-10 pt-0.5">
                <span className="text-[10px] sm:text-[11px] font-medium text-white/80 tracking-wide uppercase">Download on the</span>
                <span className="text-lg sm:text-xl font-semibold tracking-tight">App Store</span>
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
                <span className="text-lg sm:text-xl font-semibold tracking-tight">Google Play</span>
              </div>
            </a>
          </div>
          <Button href="/#how-it-works" variant="ghost" className="text-sm font-medium pt-2">
            Learn how it works &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
