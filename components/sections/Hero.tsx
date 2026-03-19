import React from 'react';
import Button from '../Button';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.08),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-8xl font-heading font-extrabold text-white mb-8 leading-[1.1] tracking-tighter">
          Your Next Party <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-purple to-purple-400">Starts Here</span>
        </h1>
        <p className="text-lg md:text-xl text-theme-muted mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          The ultimate platform for discovering the hottest parties and securing your tickets instantly. Seamless, secure, and always on.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Button href="/#download" variant="primary" className="w-full sm:w-auto px-10 py-4.5 rounded-2xl">
            Download App
          </Button>
          <Button href="/#how-it-works" variant="outline" className="w-full sm:w-auto px-10 py-4.5 rounded-2xl">
            How it works
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
