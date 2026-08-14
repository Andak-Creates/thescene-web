"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function ComingSoonModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a, button") as HTMLElement | null;
      if (!target) return;
      
      const href = target.getAttribute("href");
      const isComingSoon = target.getAttribute("data-coming-soon") === "bhind";
      if (
        href?.includes("soso.thesceneapp.online") || 
        href?.includes("bhind.thesceneapp.online") ||
        isComingSoon
      ) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => document.removeEventListener("click", handleGlobalClick, true);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md transform overflow-hidden rounded-2xl bg-[#09030e] border border-white/15 p-8 text-center shadow-2xl transition-all">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="mx-auto mb-6 flex items-center justify-center">
          <Image
            src="/thescenne-logo-transparent.png"
            alt="TheScene"
            width={320}
            height={140}
            unoptimized
            style={{
              width: "100%",
              maxWidth: "320px",
              height: "auto",
              maxHeight: "140px",
              objectFit: "contain",
              filter: "drop-shadow(0 0 30px rgba(168,85,247,0.6))",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>

        <h3 className="mb-2 text-2xl font-extrabold text-white tracking-tight">bhind is Coming Soon</h3>
        <p className="mb-8 text-gray-400 text-sm leading-relaxed">
          We&apos;re putting the finishing touches on <strong className="text-white font-semibold">bhind</strong>: your ultimate host command centre for ticketing, guest management, and analytics.
        </p>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full rounded-xl bg-purple-600 px-6 py-3.5 font-semibold text-white transition-all hover:bg-purple-700 active:scale-95 shadow-lg shadow-purple-600/30"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
