import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed — TheScene",
};

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ticket?: string; party?: string }>;
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const { ticket, party } = await searchParams;

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 40px",
        textAlign: "center",
      }}
    >
      {/* Success icon */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7C3AED, #a855f7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
          marginBottom: 24,
          boxShadow: "0 0 60px rgba(139,92,246,0.4)",
        }}
      >
        🎟️
      </div>

      <h1
        style={{
          margin: "0 0 12px",
          color: "#fff",
          fontSize: "clamp(28px, 5vw, 40px)",
          fontWeight: 900,
          letterSpacing: "-0.5px",
        }}
      >
        You&apos;re in!
      </h1>

      <p
        style={{
          margin: "0 0 8px",
          color: "rgba(255,255,255,0.6)",
          fontSize: 16,
          maxWidth: 420,
          lineHeight: 1.6,
        }}
      >
        {party
          ? `Your ticket for "${decodeURIComponent(party)}" has been booked.`
          : "Your ticket has been booked."}
      </p>
      <p
        style={{
          margin: "0 0 40px",
          color: "#a855f7",
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        Check your email — your QR ticket is on its way 📧
      </p>

      {ticket && (
        <Link
          href={`/ticket/${ticket}`}
          style={{
            display: "inline-block",
            background: "rgba(139,92,246,0.12)",
            border: "1px solid rgba(139,92,246,0.3)",
            color: "#a855f7",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 14,
            padding: "12px 24px",
            borderRadius: 100,
            marginBottom: 40,
            transition: "all 0.2s",
          }}
        >
          View Ticket Online →
        </Link>
      )}

      {/* Download App CTA */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 24,
          padding: "32px",
          maxWidth: 420,
          width: "100%",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>🎵</div>
        <h2
          style={{
            margin: "0 0 8px",
            color: "#fff",
            fontSize: 20,
            fontWeight: 800,
          }}
        >
          Want to discover more parties?
        </h2>
        <p
          style={{
            margin: "0 0 24px",
            color: "rgba(255,255,255,0.45)",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          Download TheScene to get personalised party recommendations, follow
          your favourite hosts, and buy tickets even faster.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          {/* Apple App Store Button */}
          <a
            href="https://apps.apple.com/ng/app/thescene-nightlife-discovery/id6760138122"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-5 py-3 bg-theme-purple/90 border border-theme-purple rounded-xl text-white hover:bg-theme-purple active:scale-95 transition-all duration-300 w-full sm:flex-1 overflow-hidden group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <svg
              viewBox="0 0 384 512"
              className="h-5 w-5 sm:h-6 sm:w-6 fill-current relative z-10"
              aria-hidden="true"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <div className="flex flex-col items-start leading-[1.1] relative z-10 pt-0.5">
              <span className="text-[9px] sm:text-[10px] font-medium text-white/80 tracking-wide uppercase">
                Download on the
              </span>
              <span className="text-base sm:text-lg font-semibold tracking-tight">
                App Store
              </span>
            </div>
          </a>

          {/* Google Play Button */}
          <a
            href="https://play.google.com/store/apps/details?id=com.vindi.thescene"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-5 py-3 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 hover:border-white/30 active:scale-95 transition-all duration-300 w-full sm:flex-1 overflow-hidden group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <svg
              viewBox="0 0 512 512"
              className="h-5 w-5 sm:h-6 sm:w-6 fill-current relative z-10"
              aria-hidden="true"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
            </svg>
            <div className="flex flex-col items-start leading-[1.1] relative z-10 pt-0.5">
              <span className="text-[9px] sm:text-[10px] font-medium text-white/70 tracking-wide uppercase">
                GET IT ON
              </span>
              <span className="text-base sm:text-lg font-semibold tracking-tight">
                Google Play
              </span>
            </div>
          </a>
        </div>
      </div>

      <Link
        href="/browse"
        style={{
          marginTop: 24,
          color: "rgba(255,255,255,0.3)",
          fontSize: 14,
          textDecoration: "none",
          transition: "color 0.2s",
        }}
      >
        Browse more events →
      </Link>
    </div>
  );
}
