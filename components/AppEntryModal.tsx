"use client";

import React, { useState, useEffect } from "react";
import Button from "./Button";
import { usePathname } from "next/navigation";

const AppEntryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Don't show on the reset-password page (it handles its own deep linking)
    if (pathname === "/reset-password") return;

    // Only show on mobile devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) return;

    // Check if the modal has been shown in this session
    const hasShown = sessionStorage.getItem("hasShownEntryModal");
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasShownEntryModal", "true");
      }, 1000); // Show after 1 second
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (!isOpen || pathname === "/reset-password") return null;

  const handleOpenApp = () => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    // Deep link logic
    const partyMatch = pathname.match(/^\/party\/([^/]+)/);
    const partyId = partyMatch ? partyMatch[1] : null;
    const deepLink = partyId ? `thescene://party/${partyId}` : "thescene://home";

    window.location.href = deepLink;

    // Fallback to store
    setTimeout(() => {
      if (isIOS) {
        window.location.href = "https://apps.apple.com/ng/app/thescene-nightlife-discovery/id6760138122";
      } else if (isAndroid) {
        window.location.href = "https://play.google.com/store/apps/details?id=com.vindi.thescene";
      }
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-theme-bg/90 backdrop-blur-2xl animate-in fade-in duration-700"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-theme-surface border border-theme-border rounded-[2.5rem] p-8 sm:p-10 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 fade-in duration-500">
        <div className="text-center relative z-10">
          <div className="w-20 h-20 bg-gradient-to-tr from-theme-purple to-purple-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-theme-purple/20">
            <span className="text-4xl animate-pulse">✨</span>
          </div>

          <h2 className="text-3xl font-heading font-extrabold text-white mb-4 tracking-tight">
            TheScene is better in the app
          </h2>
          <p className="text-theme-muted text-lg mb-10 leading-relaxed">
            Get the full experience with instant ticket bookings, host updates, and exclusive access.
          </p>

          <div className="flex flex-col gap-4">
            <Button 
              onClick={handleOpenApp}
              variant="primary" 
              className="w-full py-4 text-lg font-bold shadow-xl shadow-theme-purple/25"
            >
              Open in App
            </Button>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="py-4 text-theme-muted hover:text-white transition-colors text-base font-medium"
            >
              Stay in Web
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppEntryModal;
