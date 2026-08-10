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
            TheScene isn&apos;t just for party-goers. Hosts get a professional
            command centre, <strong className="text-white">Soso</strong>, to
            manage ticketing, track revenue, and grow their community, whether
            you&apos;re running a club night or a corporate conference.
          </p>



          <ul className="space-y-4 mb-10">
            {[
              "Private events, shareable by direct link only",
              "Downloadable event reports & guest lists (PDF & CSV)",
              "Table reservations with per-seat claim management",
              "Real-time door check-in with QR code scanning",
              "Advanced analytics, revenue tracking, and earnings payouts",
              "Executive Concierge Pass for complimentary VIP guests",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white">
                <div className="w-5 h-5 rounded-full bg-theme-purple/20 flex items-center justify-center shrink-0">
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

          <div className="flex flex-wrap gap-4">
            <Button href="https://soso.thesceneapp.online" variant="primary" className="px-10">
              Launch Soso Dashboard
            </Button>
            <Button href="/download" variant="secondary" className="px-8">
              Download TheScene App
            </Button>
          </div>
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
                  Guest List
                </span>
                <span className="text-white/40 font-medium text-[10px] pb-1 px-1">
                  Reports
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

                {/* Export row */}
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="text-white/60 text-[9px] font-bold uppercase tracking-wider">
                      Export Reports
                    </h5>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-theme-purple/20 border border-theme-purple/30 rounded-lg py-1.5 text-center text-[8px] font-bold text-theme-purple">
                      PDF
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-lg py-1.5 text-center text-[8px] font-bold text-white/50">
                      CSV
                    </div>
                  </div>
                </div>

                {/* Private event badge */}
                <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-theme-purple/20 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-theme-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-white">Private Event</p>
                    <p className="text-[8px] text-white/40">Link-only access</p>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[4px] bg-theme-bg/40">
                <span className="bg-theme-purple text-white px-5 py-2 rounded-xl text-[10px] font-bold shadow-2xl shadow-theme-purple/40">
                  Open Soso Dashboard
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
