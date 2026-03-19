import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TheScene",
  description: "Privacy policy for TheScene mobile app.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <Section>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-12">Privacy Policy</h1>
            
            <div className="space-y-12 text-theme-muted leading-relaxed text-lg">
              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">Introduction</h2>
                <p>Welcome to TheScene. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our mobile application and services.</p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">Data Collection</h2>
                <p>We collect various types of information to provide and improve our services, including:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Personal Information:</strong> Name, email address, and phone number.</li>
                  <li><strong>Location Data:</strong> Necessary for discovering parties and events near you.</li>
                  <li><strong>Payment Data:</strong> Processed securely via Paystack. We do not store full credit card details on our servers.</li>
                  <li><strong>Photos:</strong> Media for ID verification and party-related content uploaded by users.</li>
                  <li><strong>Device Identifiers:</strong> Push notification tokens and device information for app functionality.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">Third-Party Services</h2>
                <p>We use trusted third-party services to handle specific aspects of our operations:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li><strong>Supabase:</strong> For database management and authentication.</li>
                  <li><strong>Expo:</strong> To build and run our mobile application.</li>
                  <li><strong>Paystack:</strong> For secure payment processing.</li>
                  <li><strong>Sentry:</strong> For error tracking and performance monitoring.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">User Rights & Data Deletion</h2>
                <p>You have the right to access, update, or delete your personal data. We provide an account deletion option within the app. Upon request, account deletion is typically processed within a <strong>5-day window</strong>.</p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">Children&apos;s Privacy</h2>
                <p>TheScene is intended for users aged 13 and above. We do not knowingly collect information from children under 13.</p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">Contact Info</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at <strong>support@thescene.app</strong> (placeholder).</p>
              </section>

              <p className="pt-10 text-sm italic">Last updated: January 2025</p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
