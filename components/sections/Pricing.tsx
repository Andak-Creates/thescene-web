import React from 'react';
import Section from '../Section';

const Pricing = () => {
  return (
    <Section id="pricing" className="bg-theme-bg">
      <div data-aos="zoom-in" className="bg-theme-surface border border-theme-border rounded-3xl p-10 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-theme-purple/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Simple Transparency <br /> <span className="text-theme-purple">For Everyone</span>
            </h2>
            <p className="text-theme-muted text-lg leading-relaxed">
              We believe in simple, fair pricing. Whether you&apos;re attending or hosting, we keep things transparent.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-theme-bg/50 border border-theme-border p-6 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="font-heading font-semibold text-white text-xl">For Attendees</h4>
                <p className="text-theme-muted">Free to browse. Only 5% fee for tickets.</p>
              </div>
              <div className="text-theme-purple font-bold text-2xl">5% Fee</div>
            </div>
            
            <div className="bg-theme-bg/50 border border-theme-border p-6 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="font-heading font-semibold text-white text-xl">For Hosts</h4>
                <p className="text-theme-muted">Get 100% of your revenue (Promo till August)</p>
              </div>
              <div className="text-theme-purple font-bold text-2xl">0% Fee</div>
            </div>
            
            <p className="text-theme-muted text-sm italic">
              * Hosts get 100% of revenue for now till August, while attendees only pay a 5% fee for tickets. No hidden setup costs.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
