import React from 'react';
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
      answer: "Download the app from the App Store or via APK, and follow the simple on-boarding process to create your account using your email. Social login is coming soon!"
    },
    {
      question: "How do I buy tickets?",
      answer: "Once you find an event you like, click on 'Get Ticket', select your quantity, and complete the secure payment via Paystack."
    },
    {
      question: "How do I become a host?",
      answer: "In your profile settings, click on 'Host an Event'. You'll need to provide some identification for verification before you can start selling tickets."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We use Paystack to process payments, which supports credit/debit cards, bank transfers, and mobile money depending on your region."
    },
    {
      question: "What is the refund policy?",
      answer: "Ticket sales are generally final. If an event is cancelled, we will coordinate with the host to ensure refunds are processed."
    },
    {
      question: "How do push notifications work?",
      answer: "We send you real-time updates for ticket confirmations, event reminders, and exclusive deals. You can manage these in your device settings."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use industry-standard encryption and partner with secure services like Supabase and Paystack to protect your information."
    },
    {
      question: "How do I delete my account?",
      answer: "You can request account deletion directly within the app settings. We process these requests within 5 business days."
    },
    {
      question: "Can I transfer my ticket to a friend?",
      answer: "Currently, tickets are linked to your account. However, you can buy multiple tickets and share the QR code during check-in."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach us through the Support page on this website or directly via the 'Help' section in the mobile app."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <Section>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tighter">FAQ</h1>
            <p className="text-theme-muted text-xl mb-12">Everything you need to know about TheScene.</p>
            
            <Accordion items={faqItems} />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
