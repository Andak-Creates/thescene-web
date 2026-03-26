import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | TheScene",
  description:
    "Terms of service for TheScene mobile app and ticketing platform.",
};

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <Section>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-12">
              Terms of Service
            </h1>

            <div className="space-y-12 text-theme-muted leading-relaxed text-lg">
              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or using TheScene, you agree to be bound by these
                  Terms of Service. If you do not agree to these terms, please
                  do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">
                  2. User Accounts
                </h2>
                <p>
                  You are responsible for maintaining the confidentiality of
                  your account credentials and for all activity that occurs
                  under your account. You must be at least 17 years old to use
                  the platform. You are responsible for providing accurate
                  information during registration.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">
                  3. Host Verification
                </h2>
                <p>
                  Users who wish to host events must undergo a verification
                  process. TheScene reserves the right to approve or reject host
                  applications based on our internal safety and quality
                  guidelines.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">
                  4. Ticket Purchases & Refunds
                </h2>
                <p>
                  All ticket sales are final. Refunds are only issued at the
                  discretion of the event host or in the event of a
                  cancellation. Processing fees are generally non-refundable.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">
                  5. User-Generated Content & Community Standards
                </h2>
                <p>
                  Users and hosts are prohibited from posting content that is
                  illegal, offensive, hateful, sexually explicit, or violates
                  the rights of others. TheScene actively moderates
                  user-generated content to maintain a safe community.
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>
                    Users may report objectionable content or parties directly
                    within the app using the report option on any party card.
                  </li>
                  <li>
                    Users may block other users to immediately remove their
                    content from their feed.
                  </li>
                  <li>
                    TheScene will review all submitted reports and take action
                    within 24 hours, including removing violating content and
                    suspending or permanently terminating the accounts
                    responsible.
                  </li>
                  <li>
                    Repeated violations will result in permanent account
                    termination.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">
                  6. Limitation of Liability
                </h2>
                <p>
                  TheScene is a platform for event discovery and ticketing. We
                  are not responsible for the conduct of users or the quality of
                  events hosted on the platform. Use at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">
                  7. Governing Law
                </h2>
                <p>
                  These Terms of Service are governed by and construed in
                  accordance with the laws of the Federal Republic of Nigeria.
                  Any disputes arising from these terms shall be subject to the
                  exclusive jurisdiction of the courts of Nigeria.
                </p>
              </section>

              <p className="pt-10 text-sm italic">Last updated: March 2026</p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
