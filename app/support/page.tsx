"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Button from "@/components/Button";
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
                    Contact Form
                  </h2>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-white mb-2 font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-theme-surface border border-theme-border rounded-xl px-6 py-4 text-white focus:outline-none focus:border-theme-purple"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full bg-theme-surface border border-theme-border rounded-xl px-6 py-4 text-white focus:outline-none focus:border-theme-purple"
                        placeholder="Your email"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-medium">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        className="w-full bg-theme-surface border border-theme-border rounded-xl px-6 py-4 text-white focus:outline-none focus:border-theme-purple"
                        placeholder="How can we help?"
                      ></textarea>
                    </div>
                    <Button type="button" className="w-full py-4 text-lg">
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
                  <div className="space-y-4">
                    {[
                      { title: "Ticket not received", link: "/faq" },
                      { title: "Host verification status", link: "/faq" },
                      { title: "Refund requests", link: "/faq" },
                      { title: "App crashing on Android", link: "/faq" },
                    ].map((issue, idx) => (
                      <Link
                        key={idx}
                        href={issue.link}
                        className="flex items-center justify-between p-4 border border-theme-border rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <span className="text-white">{issue.title}</span>
                        <svg
                          className="w-5 h-5 text-theme-purple"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    ))}
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
