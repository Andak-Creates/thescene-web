import React from "react";
import Section from "../Section";
import StepCard from "../StepCard";

const HowItWorks = () => {
  const attendeeSteps = [
    {
      title: "Download TheScene",
      description:
        "Get the app on iOS or Android. Discover the hottest parties, clubs, and events in your city, all in one place.",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          />
        </svg>
      ),
    },
    {
      title: "Discover & Browse Events",
      description:
        "Browse through curated events near you. Filter by city, genre, or date find exactly what matches your energy.",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      title: "Get Your Ticket",
      description:
        "Secure your spot in seconds. Buy tickets or reserve tables, pay locally via Paystack, and get your ticket delivered instantly.",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z"
          />
        </svg>
      ),
    },
  ];

  return (
    <Section id="how-it-works" className="bg-theme-surface">
      <div data-aos="fade-up" className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
          How It <span className="text-theme-purple">Works</span>
        </h2>
        <p className="text-theme-muted max-w-2xl mx-auto">
          From discovery to the door, TheScene makes the entire experience
          effortless, for both attendees and hosts.
        </p>
      </div>

      <div className="relative">
        {/* Connection Line (Desktop) */}
        <div className="hidden lg:block absolute top-10 left-1/4 right-1/4 h-0.5 border-t border-dashed border-theme-purple/30 z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
          {attendeeSteps.map((step, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={index * 200}>
              <StepCard
                number={index + 1}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default HowItWorks;
