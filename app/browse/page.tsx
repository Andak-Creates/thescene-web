/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";
import EventCard from "@/components/EventCard";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Browse Events | TheScene",
  description:
    "Discover the best parties and events near you. Buy tickets instantly, no account required.",
};

// Parties revalidate every 60 seconds (events change frequently)
export const revalidate = 60;

function normalizeStateName(rawLocation: string): string {
  if (!rawLocation) return "";
  const s = rawLocation.trim().toLowerCase();
  if (s.includes("lagos")) return "Lagos";
  if (s.includes("abuja") || s.includes("fct")) return "Abuja";
  if (s.includes("river") || s.includes("port harcourt")) return "Rivers";
  if (s.includes("delta") || s.includes("warri") || s.includes("oleh")) return "Delta";
  if (s.includes("kwara") || s.includes("ilorin")) return "Kwara";
  if (s.includes("oyo") || s.includes("ibadan")) return "Oyo";
  if (s.includes("edo") || s.includes("benin")) return "Edo";
  if (s.includes("ogun")) return "Ogun";
  if (s.includes("epe")) return "Lagos";
  if (s.includes("lekki") || s.includes("yaba") || s.includes("ikeja") || s.includes("sangotedo") || s.includes("sangotendo") || s.includes("orchid")) return "Lagos";

  // Capitalize words
  return rawLocation
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

async function getParties(selectedState?: string) {
  const now = new Date();
  const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);
  let query = supabase
    .from("parties")
    .select(
      `
      id, slug, title, date, end_date, date_tba, city, state, flyer_url,
      ticket_price, currency_code,
      host_profile:host_profiles!host_profile_id (name, is_verified),
      media:party_media (media_url, media_type, thumbnail_url, is_primary)
    `,
    )
    .eq("is_published", true)
    .eq("is_private", false)
    .or(
      `date.gte.${twelveHoursAgo.toISOString()},end_date.gte.${now.toISOString()},date_tba.eq.true`,
    )
    .order("date", { ascending: true })
    .limit(60);

  if (selectedState) {
    const loc = selectedState.trim();
    query = query.or(`state.ilike.%${loc}%,city.ilike.%${loc}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getParties error:", JSON.stringify(error));
    return [];
  }

  return (data ?? []).map((p: any) => ({
    ...p,
    host_profile: Array.isArray(p.host_profile) ? p.host_profile[0] : p.host_profile,
  })).filter((p: any) => {
    if (p.date_tba) return true;
    if (p.end_date) return new Date(p.end_date) >= now;
    if (p.date) {
      return new Date(p.date) >= twelveHoursAgo;
    }
    return true;
  });
}

// States change rarely — cache this result for 1 hour independently of the
// page-level revalidate so party list refreshes don't force a states re-fetch.
const getActiveStates = unstable_cache(
  async () => {
    const now = new Date();
    const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);
    const { data } = await supabase
      .from("parties")
      .select("state, city, date, end_date, date_tba")
      .eq("is_published", true)
      .eq("is_private", false)
      .or(
        `date.gte.${twelveHoursAgo.toISOString()},end_date.gte.${now.toISOString()},date_tba.eq.true`,
      );

    const activeEvents = (data ?? []).filter((p: any) => {
      if (p.date_tba) return true;
      if (p.end_date) return new Date(p.end_date) >= now;
      if (p.date) return new Date(p.date) >= twelveHoursAgo;
      return true;
    });

    const statesSet = new Set<string>();
    activeEvents.forEach((p) => {
      const stateName = normalizeStateName(p.state || p.city || "");
      if (stateName) statesSet.add(stateName);
    });

    return Array.from(statesSet);
  },
  ["browse-active-states"], // cache key
  { revalidate: 60 }, // 60 seconds
);

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string; city?: string; location?: string }>;
}) {
  const params = await searchParams;
  const currentLocation = params.state || params.location || params.city || "";
  const [parties, activeStates] = await Promise.all([
    getParties(currentLocation),
    getActiveStates(),
  ]);

  return (
    <div style={{ minHeight: "100vh", padding: "0 0 80px" }}>
      {/* Hero */}
      <div
        style={{
          position: "relative",
          padding: "100px 24px 60px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 300,
            background:
              "radial-gradient(ellipse, rgba(139,92,246,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <p
          style={{
            margin: "0 0 12px",
            color: "#a855f7",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Discover What&apos;s On
        </p>
        <h1
          style={{
            margin: "0 0 16px",
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 900,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            color: "#fff",
          }}
        >
          Find Your Next <span className="text-gradient">Scene</span>
        </h1>
        <p
          style={{
            margin: "0 auto 32px",
            maxWidth: 480,
            color: "rgba(255,255,255,0.5)",
            fontSize: 16,
            lineHeight: 1.6,
          }}
        >
          Browse parties, concerts, and events near you. Buy tickets in seconds.
          No account needed.
        </p>

        {/* State filter pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          <Link
            href="/browse"
            style={{
              padding: "8px 18px",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              background: !currentLocation
                ? "linear-gradient(135deg, #7C3AED, #a855f7)"
                : "rgba(255,255,255,0.06)",
              color: "#fff",
              border: currentLocation ? "1px solid rgba(255,255,255,0.1)" : "none",
              transition: "all 0.2s",
            }}
          >
            All States
          </Link>
          {activeStates.map((st) => {
            const isActive =
              currentLocation.toLowerCase() === st.toLowerCase();
            return (
              <Link
                key={st}
                href={`/browse?state=${encodeURIComponent(st)}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 18px",
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  background: isActive
                    ? "linear-gradient(135deg, #7C3AED, #a855f7)"
                    : "rgba(255,255,255,0.06)",
                  color: "#fff",
                  border: !isActive ? "1px solid rgba(255,255,255,0.1)" : "none",
                  transition: "all 0.2s",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#10b981",
                    display: "inline-block",
                    marginTop: 1,
                  }}
                />
                {st}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {parties.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎭</div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>
              No events found {currentLocation ? `in ${currentLocation}` : ""}
            </p>
            {currentLocation && (
              <Link
                href="/browse"
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  color: "#a855f7",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Clear filter
              </Link>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {parties.map((party) => (
              <EventCard key={party.id} party={party} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
