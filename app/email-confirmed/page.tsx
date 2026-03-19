import React from 'react';
import Button from "@/components/Button";
import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Confirmed | TheScene",
  description: "Success message after email confirmation.",
};

export default function EmailConfirmed() {
  return (
    <main className="min-h-screen bg-theme-bg flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-theme-surface border border-theme-border rounded-[2.5rem] p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-theme-purple/10 rounded-full blur-[40px] -mr-16 -mt-16"></div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-theme-purple/20 border-2 border-theme-purple rounded-full flex items-center justify-center mx-auto mb-10 animate-bounce transition-all">
            <svg className="w-12 h-12 text-theme-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-heading font-extrabold text-white mb-4">Email Confirmed!</h1>
          <p className="text-theme-muted text-lg mb-12">
            Your identity has been verified. You&apos;re all set to start discovering the hottest parties.
          </p>
          
          <div className="space-y-4">
            <Button href="thescene://" variant="primary" className="w-full py-4 text-lg">
              Open TheScene App
            </Button>
            <Button href="/" variant="outline" className="w-full py-4 text-lg">
              View App Info
            </Button>
          </div>
          
          <p className="mt-12 text-sm text-theme-muted">
             Not a member yet? <Link href="/" className="text-theme-purple hover:underline">Download the app</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
