import React from "react";
import Link from "next/link";
import Section from "../Section";

const audiences = [
  {
    label: "TheScene for Party-Goers",
    tag: "I'm going out",
    tagColor: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
    accentColor: "border-indigo-500/20",
    glowColor: "bg-indigo-500/10",
    cta: "Download the App",
    ctaHref: "/download",
    ctaStyle:
      "bg-indigo-600 hover:brightness-110 text-white",
    description:
      "Find out what's happening this weekend before your friends do. Browse events near you, get your ticket in seconds, and walk in with your QR code.",
    points: [
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        ),
        text: "Discover parties, concerts, and club nights near you",
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
          </svg>
        ),
        text: "Buy tickets or reserve tables in one tap",
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        ),
        text: "Show your QR code at the door. No printing, no screenshots",
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        ),
        text: "Get access to the event community group chat",
      },
    ],
  },
  {
    label: "TheScene for Hosts",
    tag: "I'm running the show",
    tagColor: "bg-theme-purple/20 text-theme-purple border border-theme-purple/30",
    accentColor: "border-theme-purple/20",
    glowColor: "bg-theme-purple/10",
    cta: "Open Host Dashboard",
    ctaHref: "https://soso.thesceneapp.online",
    ctaStyle:
      "bg-theme-purple hover:brightness-110 text-white",
    description:
      "TheScene gives hosts a full command centre to sell tickets, manage guests, and track every naira. From intimate dinners to sold-out shows.",
    points: [
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
        text: "Track revenue, sales, and check-ins in real time",
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        ),
        text: "Export guest lists and event reports as PDF or CSV",
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ),
        text: "Create private events accessible by link only",
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ),
        text: "QR door check-in, table reservations, and concierge passes",
      },
    ],
  },
];

const TwoAudiences = () => {
  return (
    <Section id="for-everyone" className="bg-theme-surface">
      <div data-aos="fade-up" className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
          One platform. <span className="text-theme-purple">Two sides.</span>
        </h2>
        <p className="text-theme-muted max-w-xl mx-auto">
          TheScene works for whoever you are this weekend.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {audiences.map((audience, i) => (
          <div
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 150}
            className={`relative rounded-3xl border ${audience.accentColor} bg-theme-bg p-8 flex flex-col gap-6 overflow-hidden`}
          >
            {/* Background glow */}
            <div
              className={`absolute top-0 right-0 w-48 h-48 ${audience.glowColor} rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none`}
            />

            <div className="relative z-10">
              {/* Tag */}
              <span
                className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${audience.tagColor}`}
              >
                {audience.tag}
              </span>

              {/* Title */}
              <h3 className="text-2xl font-heading font-bold text-white mb-3">
                {audience.label}
              </h3>

              {/* Description */}
              <p className="text-theme-muted leading-relaxed mb-6">
                {audience.description}
              </p>

              {/* Points */}
              <ul className="space-y-3 mb-8">
                {audience.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-white/80 text-sm">
                    <span className="mt-0.5 shrink-0 text-theme-purple">
                      {point.icon}
                    </span>
                    {point.text}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={audience.ctaHref}
                className={`inline-block px-7 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 ${audience.ctaStyle}`}
              >
                {audience.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default TwoAudiences;
