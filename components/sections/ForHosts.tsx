import React from "react";
import Image from "next/image";
import Section from "../Section";
import Button from "../Button";

const ForHosts = () => {
  return (
    <Section id="for-hosts" className="bg-theme-bg overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div data-aos="fade-right" className="flex-1">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Take Your Events to <br />{" "}
            <span className="text-theme-purple">The Next Level</span>
          </h2>
          <p className="text-theme-muted text-lg mb-8 leading-relaxed">
            TheScene isn&apos;t just for party-goers. We provide hosts with
            state-of-the-art tools to manage ticketing, track attendance in
            real-time, and grow their community.
          </p>

          <div className="bg-theme-purple/10 border border-theme-purple/20 rounded-2xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-theme-purple/20 rounded-full blur-[40px] -mr-16 -mt-16"></div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-theme-purple/20 flex items-center justify-center flex-shrink-0 text-theme-purple font-bold text-lg">
                🎉
              </div>
              <div>
                <h4 className="font-heading font-bold text-white text-lg mb-1">
                  Special Launch Offer
                </h4>
                <p className="text-theme-muted text-sm leading-relaxed">
                  Hosts get{" "}
                  <span className="text-theme-purple font-semibold">
                    100% of revenue
                  </span>{" "}
                  from May to August, while attendees only pay a{" "}
                  <span className="text-theme-purple font-semibold">
                    5% fee
                  </span>{" "}
                  for tickets.
                </p>
              </div>
            </div>
          </div>

          <ul className="space-y-4 mb-10">
            {[
              "Verified Host Badge for trust",
              "Advanced analytics for ticket sales",
              "Seamless door check-in tools",
              "Direct communication with your guests",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white">
                <div className="w-5 h-5 rounded-full bg-theme-purple/20 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-theme-purple"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
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

        <div
          data-aos="fade-left"
          data-aos-delay="200"
          className="flex-1 relative flex justify-center"
        >
          {/* Hand Mockup Container */}
          <div className="relative w-[450px] aspect-[4/5] flex items-center justify-center translate-x-10">
            <Image
              src="/hand-mockup.png"
              alt="Hand Mockup"
              fill
              priority
              className="object-contain pointer-events-none brightness-50 contrast-125"
            />

            {/* Dashboard Replica - Positioned inside the phone screen */}
            <div className="relative bg-[#0F0A16] border border-white/5 rounded-[2.2rem] shadow-2xl overflow-hidden group w-[220px] sm:w-[260px] aspect-[9/19.5] -translate-y-4 -translate-x-1">
              {/* App Header Bar */}
              <div className="flex items-center justify-around border-b border-white/5 pt-5 pb-1 px-3">
                <span className="text-theme-purple font-bold text-[10px] border-b border-theme-purple pb-1 px-1">
                  Overview
                </span>
                <span className="text-white/40 font-medium text-[10px] pb-1 px-1">
                  Attendees
                </span>
                <span className="text-white/40 font-medium text-[10px] pb-1 px-1">
                  Timeline
                </span>
              </div>

              <div className="p-3 space-y-4 overflow-y-auto h-full scrollbar-hide pb-10">
                {/* Event Mini Card */}
                <div className="flex items-center gap-2 bg-white/5 rounded-xl p-2 border border-white/5">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=100&q=80')] bg-cover opacity-60"></div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-bold text-[11px] truncate">
                      All White Party
                    </h4>
                    <p className="text-white/40 text-[9px] truncate">
                      Decode Lounge, Lekki
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-white/60 text-[9px] font-bold uppercase tracking-wider">
                    Key Metrics
                  </h5>

                  {/* Revenue Card */}
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-white/40 text-[9px] mb-0.5">
                      Total Revenue
                    </p>
                    <p className="text-xl font-black text-white">₦50,000</p>
                    <p className="text-white/30 text-[8px] mt-1">
                      From 5 tickets sold
                    </p>
                  </div>

                  {/* Split Metrics */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/5 rounded-xl p-2.5 border border-white/5 relative overflow-hidden">
                      <p className="text-lg font-black text-white leading-tight">
                        5
                      </p>
                      <p className="text-[8px] text-white/30 uppercase font-bold">
                        of 100 Sold
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                      <p className="text-lg font-black text-white leading-tight">
                        0
                      </p>
                      <p className="text-[8px] text-white/30 uppercase font-bold">
                        Checked In
                      </p>
                    </div>
                  </div>
                </div>

                {/* View Analytics - Half Pie Chart */}
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="text-white/60 text-[9px] font-bold uppercase tracking-wider">
                      View Analytics
                    </h5>
                    <span className="text-white font-black text-[11px]">
                      19
                    </span>
                  </div>

                  <div className="relative h-20 flex items-center justify-center overflow-hidden">
                    {/* Semi-Circle Gauge */}
                    <div className="absolute top-4 w-32 h-32 rounded-full border-[10px] border-blue-500/20"></div>
                    <div
                      className="absolute top-4 w-32 h-32 rounded-full border-[10px] border-transparent"
                      style={{
                        background:
                          "conic-gradient(from 180deg at 50% 50%, #7C3AED 0deg, #7C3AED 30deg, #3B82F6 30deg, #3B82F6 180deg, transparent 180deg)",
                        WebkitMaskImage:
                          "radial-gradient(transparent 52px, black 53px)",
                        maskImage:
                          "radial-gradient(transparent 52px, black 53px)",
                        clipPath: "inset(0 0 50% 0)",
                      }}
                    ></div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                      <span className="text-lg font-black text-white">16%</span>
                      <span className="text-[8px] text-white/40 uppercase font-bold">
                        Followers
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 mt-2">
                    <div className="flex items-center justify-between text-[8px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-theme-purple"></div>
                        <span className="text-white/60">Followers</span>
                      </div>
                      <span className="text-white font-bold">15.8% (3)</span>
                    </div>
                    <div className="flex items-center justify-between text-[8px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span className="text-white/60">Non-Followers</span>
                      </div>
                      <span className="text-white font-bold">84.2% (16)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[4px] bg-theme-bg/40">
                <span className="bg-theme-purple text-white px-5 py-2 rounded-xl text-[10px] font-bold shadow-2xl shadow-theme-purple/40">
                  Get Host App
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ForHosts;
