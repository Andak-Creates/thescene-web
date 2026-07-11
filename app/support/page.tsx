"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Accordion from "@/components/Accordion";
import Link from "next/link";

export default function Support() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <Section>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tighter text-center">
              Support
            </h1>
            <p className="text-theme-muted text-xl mb-16 text-center">
              We&apos;re here to help you get the most out of TheScene.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-white mb-4 text-theme-purple">
                    Contact Us
                  </h2>
                  <form
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const name = (
                        form.elements.namedItem("name") as HTMLInputElement
                      ).value;
                      const email = (
                        form.elements.namedItem("email") as HTMLInputElement
                      ).value;
                      const message = (
                        form.elements.namedItem(
                          "message",
                        ) as HTMLTextAreaElement
                      ).value;
                      const subject = encodeURIComponent(
                        `TheScene Support — ${name}`,
                      );
                      const body = encodeURIComponent(
                        `Name: ${name}\nEmail: ${email}\n\n${message}`,
                      );
                      window.location.href = `mailto:thesceneappsupport@gmail.com?subject=${subject}&body=${body}`;
                    }}
                  >
                    <div>
                      <label className="block text-white mb-2 font-medium">
                        Full Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        className="w-full bg-theme-surface border border-theme-border rounded-xl px-6 py-4 text-white focus:outline-none focus:border-theme-purple"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-medium">
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        className="w-full bg-theme-surface border border-theme-border rounded-xl px-6 py-4 text-white focus:outline-none focus:border-theme-purple"
                        placeholder="Your email"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-medium">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        className="w-full bg-theme-surface border border-theme-border rounded-xl px-6 py-4 text-white focus:outline-none focus:border-theme-purple"
                        placeholder="How can we help?"
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full py-4 text-lg">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>

              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-white mb-4">
                    Common Issues
                  </h2>
                  <div className="mt-4">
                    <Accordion
                      items={[
                        {
                          question:
                            "I didn't receive my ticket. What should I do?",
                          answer:
                            "First, please check your spam folder. If it's still missing, reach out to us using the Support form with your email and transaction details, and we'll help track it down.",
                        },
                        {
                          question: "How do I become a host?",
                          answer:
                            "Click the Plus button on the navigation tab to host your event. You would have to go through a verification process, after which you can start creating events and selling tickets right away!",
                        },
                        {
                          question: "What is the refund policy?",
                          answer:
                            "Ticket sales are generally final. If an event is cancelled, we will coordinate with the host to ensure refunds are processed automatically to your original payment method. For disputes, contact support.",
                        },
                        {
                          question: "The app is crashing on my Android device.",
                          answer:
                            "Please ensure you are using the latest version of TheScene app. If the issue persists, try clearing the app cache or reinstalling. Contact support with your device model if you need further help.",
                        },
                      ]}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-white mb-4">
                    Resources
                  </h2>
                  <div className="flex gap-4">
                    <Link
                      href="/faq"
                      className="text-theme-purple hover:underline"
                    >
                      Read the FAQ
                    </Link>
                    <span className="text-theme-border">|</span>
                    <Link
                      href="#"
                      className="text-theme-purple hover:underline"
                    >
                      Twitter / X
                    </Link>
                    <span className="text-theme-border">|</span>
                    <Link
                      href="#"
                      className="text-theme-purple hover:underline"
                    >
                      Instagram
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
