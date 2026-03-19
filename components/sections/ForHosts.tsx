import React from 'react';
import Section from '../Section';
import Button from '../Button';

const ForHosts = () => {
  return (
    <Section id="for-hosts" className="bg-theme-bg overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div data-aos="fade-right" className="flex-1">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Take Your Events to <br /> <span className="text-theme-purple">The Next Level</span>
          </h2>
          <p className="text-theme-muted text-lg mb-8 leading-relaxed">
            TheScene isn&apos;t just for party-goers. We provide hosts with state-of-the-art tools to manage ticketing, track attendance in real-time, and grow their community.
          </p>
          
          <ul className="space-y-4 mb-10">
            {[
              "Verified Host Badge for trust",
              "Advanced analytics for ticket sales",
              "Seamless door check-in tools",
              "Direct communication with your guests"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white">
                <div className="w-5 h-5 rounded-full bg-theme-purple/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-theme-purple" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
          
          <Button href="/support" variant="primary" className="px-10">
            Get Verified as a Host
          </Button>
        </div>
        
        <div data-aos="fade-left" data-aos-delay="200" className="flex-1 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-theme-purple/20 rounded-full blur-[80px]"></div>
          <div className="relative bg-theme-surface border border-theme-border p-10 rounded-3xl shadow-2xl overflow-hidden group">
            <h3 className="text-2xl font-heading font-bold text-white mb-6">Host Dashboard Preview</h3>
            <div className="space-y-4 opacity-40 group-hover:opacity-60 transition-opacity">
              <div className="h-6 w-full bg-theme-muted/20 rounded-md"></div>
              <div className="h-40 w-full bg-theme-muted/10 rounded-xl border border-theme-border"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-theme-muted/10 rounded-xl border border-theme-border"></div>
                <div className="h-20 bg-theme-muted/10 rounded-xl border border-theme-border"></div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="bg-theme-purple text-white px-6 py-2 rounded-full font-semibold shadow-xl">Download to Explore</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ForHosts;
