import React from 'react';
import Section from '../Section';

const Pricing = () => {
  return (
    <Section id="pricing" className="bg-theme-bg">
      <div className="bg-theme-surface border border-theme-border rounded-3xl p-10 md:p-16 relative overflow-hidden">
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
                <p className="text-theme-muted">Finding parties and using the app</p>
              </div>
              <div className="text-theme-purple font-bold text-2xl">FREE</div>
            </div>
            
            <div className="bg-theme-bg/50 border border-theme-border p-6 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="font-heading font-semibold text-white text-xl">For Hosts</h4>
                <p className="text-theme-muted">Service fee per ticket sold</p>
              </div>
              <div className="text-theme-purple font-bold text-2xl">Flat Fee</div>
            </div>
            
            <p className="text-theme-muted text-sm italic">
              * Hosts pay a small service fee per ticket sold to cover payment processing and platform maintenance. There are no hidden setup costs.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
