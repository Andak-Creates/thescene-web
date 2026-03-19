import React from 'react';
import Section from '../Section';
import StepCard from '../StepCard';

const HowItWorks = () => {
  const steps = [
    {
      title: "Create Account",
      description: "Sign up in seconds and personalize your profile to see events that match your vibe.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Discover Parties",
      description: "Browse through a curated list of the hottest parties, clubs, and festivals near you.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "Get Your Ticket",
      description: "Secure your ticket with localized payment options and display it right from the app.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
        </svg>
      )
    }
  ];

  return (
    <Section id="how-it-works" className="bg-theme-surface">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
          How It <span className="text-theme-purple">Works</span>
        </h2>
        <p className="text-theme-muted max-w-2xl mx-auto">
          Getting started with TheScene is easy. Follow these simple steps to join the party.
        </p>
      </div>

      <div className="relative">
        {/* Connection Line (Desktop) */}
        <div className="hidden lg:block absolute top-10 left-1/4 right-1/4 h-0.5 border-t border-dashed border-theme-purple/30 z-0"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
          {steps.map((step, index) => (
            <StepCard 
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default HowItWorks;
