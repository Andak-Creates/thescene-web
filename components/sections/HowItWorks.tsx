import React from "react";
import Section from "../Section";

import FeatureCard from "../FeatureCard";

const HowItWorks = () => {
  const partyGoerFeatures = [
    {
      title: "Discover Events Near You",
      description:
        "Parties, concerts, and everything in between, sorted by vibe, genre, or how close it is to you. No more digging through five different group chats to find out what's happening this weekend.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: "Tickets & Table Reservations",
      description:
        'General admission, VIP, or a full table, all in one checkout. Your ticket lands in your phone the second you pay. No screenshots, no printing, no "can you resend the receipt."',
      icon: (
        <svg
          className="w-6 h-6"
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
    {
      title: "Digital QR Access",
      description:
        "Your ticket lands straight in your email and inside the app the second you pay. Just show your QR code at the door for instant entry. No printing needed.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
          />
        </svg>
      ),
    },
  ];

  return (
    <Section id="how-it-works" className="bg-theme-bg">
      {/* Value Prop Framing */}
      <div data-aos="fade-up" className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
          Everything about going out, <br />
          <span className="text-theme-purple">in one place.</span>
        </h2>
        <p className="text-lg text-theme-muted mb-8 max-w-xl mx-auto">
          Instead of finding events on Instagram, DMing for tickets, sending
          bank transfers, saving screenshots, and showing them at the door...
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-white/80 uppercase tracking-widest">
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            Discover
          </span>
          <span className="text-theme-purple">&rarr;</span>
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            Buy
          </span>
          <span className="text-theme-purple">&rarr;</span>
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            Store
          </span>
          <span className="text-theme-purple">&rarr;</span>
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            Check in
          </span>
        </div>
      </div>

      {/* For Party-Goers Block */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {partyGoerFeatures.map((feature, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default HowItWorks;
