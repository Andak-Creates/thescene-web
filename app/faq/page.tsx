import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Accordion from "@/components/Accordion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | TheScene",
  description: "Frequently asked questions about TheScene app.",
};

export default function FAQ() {
  const faqItems = [
    {
      question: "How do I sign up for TheScene?",
      answer:
        "Download the app from the App Store or via APK, and follow the simple on-boarding process to create your account using your email. Social login is coming soon!",
    },
    {
      question: "How do I buy tickets?",
      answer:
        "Once you find an event you like, click on 'Get Ticket', select your quantity, and complete the secure payment via Paystack.",
    },
    {
      question: "How do I become a host?",
      answer:
        "Click the Plus button on the navigation tab to host your event. All hosts are equal, so you can start creating events and selling tickets right away!",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We use Paystack to process payments, which supports credit/debit cards, bank transfers, and mobile money depending on your region.",
    },
    {
      question: "What is the refund policy?",
      answer:
        "Ticket sales are generally final. If an event is cancelled, we will coordinate with the host to ensure refunds are processed automatically to your original payment method. For disputes, contact support.",
    },
    {
      question: "I didn't receive my ticket. What should I do?",
      answer:
        "First, please check your spam folder. If it's still missing, reach out to us using the Support form with your email and transaction details, and we'll help track it down.",
    },
    {
      question: "The app is crashing on my Android device.",
      answer:
        "Please ensure you are using the latest version of TheScene app. If the issue persists, try clearing the app cache or reinstalling. Contact support with your device model if you need further help.",
    },
    {
      question: "How do push notifications work?",
      answer:
        "We send you real-time updates for ticket confirmations, event reminders, and exclusive deals. You can manage these in your device settings.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we use industry-standard encryption and partner with secure services like Supabase and Paystack to protect your information.",
    },
    {
      question: "Can I transfer my ticket to a friend?",
      answer:
        "Currently, tickets are linked to your account. However, you can buy multiple tickets and share the QR code during check-in.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach us through the Support page on this website or directly via the 'Help' section in the mobile app.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <Section>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tighter">
              FAQ
            </h1>
            <p className="text-theme-muted text-xl mb-12">
              Everything you need to know about TheScene.
            </p>

            <Accordion items={faqItems} />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
