/**
 * Top-level dynamic route: thesceneapp.online/[slug]
 *
 * Renders party pages at ultra-short URLs like:
 *   thesceneapp.online/beach-bash
 *   thesceneapp.online/summer-vibes-2026
 *
 * Static routes (browse, party, download, ticket, faq, support,
 * privacy-policy, terms-of-service, email-confirmed, reset-password)
 * always take precedence over this dynamic route in Next.js.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";
import { getOptimizedImageUrl } from "@/lib/media";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const getPartyBySlug = cache(async (slug: string) => {
  // Detect UUID vs slug — UUIDs match the standard 8-4-4-4-12 format
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

  let query = supabase
    .from("parties")
    .select(
      `
      id, slug, title, description, date, end_date, date_tba, location, location_tba,
      city, state, country, ticket_price, ticket_price_tba, currency_code,
      music_genres, vibes, dress_code, flyer_url, is_published,
      host_id, host_profile_id, show_ticket_count, community_link, community_platform,
      host:profiles!host_id (username, avatar_url),
      host_profile:host_profiles!host_profile_id (id, name, avatar_url, is_verified),
      media:party_media (media_url, media_type, thumbnail_url, is_primary, display_order),
      tiers:ticket_tiers (id, name, price, quantity, quantity_sold, is_active, tier_order)
    `,
    )
    .eq("is_published", true);

  if (isUuid) {
    query = query.eq("id", slug);
  } else {
    query = query.eq("slug", slug);
  }

  const { data, error } = await query.single();
  if (error || !data) return null;
  return data;
});

const CURRENCY_SYMBOLS: Record<string, string> = {
  NGN: "₦",
  USD: "$",
  GBP: "£",
  EUR: "€",
  GHS: "₵",
  KES: "KSh",
  ZAR: "R",
};

function isVideoUrl(url: string | null): boolean {
  if (!url) return false;
  const l = url.toLowerCase();
  return l.endsWith('.mp4') || l.endsWith('.mov') || l.endsWith('.webm') || l.includes('/video/upload/');
}

function resolveImages(party: any): {
  primary: string | null;
  fallback: string | null;
} {
  const flyerUrl: string | null = party.flyer_url && !isVideoUrl(party.flyer_url) ? party.flyer_url : null;
  let mediaUrl: string | null = null;
  if (party.media?.length > 0) {
    const sorted = [...party.media].sort((a: any, b: any) => {
      if (a.is_primary) return -1;
      if (b.is_primary) return 1;
      return (a.display_order ?? 0) - (b.display_order ?? 0);
    });
    for (const item of sorted) {
      const candidate = item.media_type === "video" ? (item.thumbnail_url ?? null) : item.media_url;
      if (candidate && !isVideoUrl(candidate)) {
        mediaUrl = candidate;
        break;
      }
    }
  }
  if (flyerUrl && mediaUrl) return { primary: flyerUrl, fallback: mediaUrl };
  if (flyerUrl) return { primary: flyerUrl, fallback: null };
  if (mediaUrl) return { primary: mediaUrl, fallback: null };
  return { primary: null, fallback: null };
}

function resolveImage(party: any): string | null {
  return resolveImages(party).primary;
}

function formatDateTime(dateString: string | null) {
  if (!dateString) return null;
  const d = new Date(dateString);
  return {
    date: d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const party = await getPartyBySlug(slug);
  if (!party) return { title: "Event Not Found — TheScene" };
  const image = resolveImage(party);
  return {
    title: `${party.title} — TheScene`,
    description: party.description ?? `Get tickets for ${party.title}`,
    openGraph: {
      title: party.title,
      description: party.description ?? undefined,
      images: image ? [{ url: image }] : [],
    },
  };
}

export default async function SlugPartyPage({ params }: PageProps) {
  const { slug } = await params;
  const party = await getPartyBySlug(slug);
  if (!party) notFound();

  // The canonical path uses slug; fall back to party id
  const partyPath = party.slug ?? party.id;

  const { primary: imageUrl } = resolveImages(party);
  const symbol =
    CURRENCY_SYMBOLS[party.currency_code] ?? party.currency_code + " ";
  const dt = formatDateTime(party.date);
  const isEnded = party.date_tba
    ? false
    : party.end_date
      ? new Date(party.end_date) < new Date()
      : party.date
        ? new Date(party.date) <
          new Date(new Date().getTime() - 12 * 60 * 60 * 1000)
        : false;
  const activeTiers = (party.tiers ?? [])
    .filter((t: any) => t.is_active)
    .sort((a: any, b: any) => a.tier_order - b.tier_order);
  const hostName =
    (party.host_profile as any)?.name ??
    (party.host as any)?.username ??
    "Host";
  const minPrice =
    activeTiers.length > 0
      ? Math.min(...activeTiers.map((t: any) => t.price))
      : null;

  // Build the Google Maps URL from whatever location fields are available
  const locationParts = [
    party.location,
    party.city,
    party.state,
    party.country,
  ].filter(Boolean);
  const fullLocation = locationParts.join(", ");
  const mapsUrl = fullLocation
    ? `https://maps.google.com/?q=${encodeURIComponent(fullLocation)}`
    : null;

  // Optimised URL for the blurred background (lower quality is fine, it's blurred)
  const bgImageUrl = imageUrl
    ? getOptimizedImageUrl(imageUrl, 800) ?? imageUrl
    : null;

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 100 }}>

      {/* ── Hero: blurred background + flyer card floating on top ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: 480,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingTop: 110,
          paddingBottom: 10,
          overflow: "hidden",
        }}
      >
        {/* Blurred background layer */}
        {bgImageUrl ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("${bgImageUrl}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(15px) brightness(0.68) saturate(1.45)",
              transform: "scale(1.1)",
              zIndex: 0,
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #1a0d2e 0%, #0b0514 100%)",
              zIndex: 0,
            }}
          />
        )}

        {/* Gradient overlay so content below blends nicely */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: "linear-gradient(to bottom, transparent, #0b0514)",
            zIndex: 1,
          }}
        />

        {/* Floating flyer card */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: 20,
            marginBottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {imageUrl ? (
            <div
              style={{
                width: "min(340px, 78vw)",
                aspectRatio: "3/4",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow:
                  "0 12px 60px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.1), 0 0 90px rgba(139,92,246,0.3)",
                position: "relative",
              }}
            >
              <Image
                src={getOptimizedImageUrl(imageUrl, 800) ?? imageUrl}
                alt={party.title}
                fill
                sizes="(max-width: 640px) 78vw, 340px"
                priority
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div
              style={{
                width: "min(280px, 72vw)",
                aspectRatio: "3/4",
                borderRadius: 20,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 64,
              }}
            >
              🎉
            </div>
          )}
        </div>

        {/* Extra bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: -1,
            left: 0,
            right: 0,
            height: 80,
            background: "linear-gradient(to bottom, transparent, #0b0514)",
            zIndex: 3,
          }}
        />
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        {/* Title card — sits just below the hero */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            marginTop: 28,
            marginBottom: 24,
          }}
        >
          <div
            className="glass"
            style={{ borderRadius: 24, padding: "28px 28px 24px" }}
          >
            <h1
              style={{
                margin: "0 0 8px",
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
              }}
            >
              {party.title}
            </h1>
            <p
              style={{
                margin: "0 0 20px",
                color: "rgba(255,255,255,0.5)",
                fontSize: 14,
              }}
            >
              Hosted by{" "}
              <span style={{ color: "#a855f7", fontWeight: 600 }}>
                {hostName}
              </span>
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {dt && (
                <span
                  style={{
                    background: "rgba(139,92,246,0.1)",
                    border: "1px solid rgba(139,92,246,0.25)",
                    borderRadius: 100,
                    padding: "6px 14px",
                    color: "#c084fc",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  📅 {dt.date}
                </span>
              )}
              {dt && (
                <span
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 100,
                    padding: "6px 14px",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 13,
                  }}
                >
                  🕐 {dt.time}
                </span>
              )}
              {party.date_tba && (
                <span
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 100,
                    padding: "6px 14px",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 13,
                  }}
                >
                  📅 Date TBA
                </span>
              )}
              {party.dress_code && (
                <span
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 100,
                    padding: "6px 14px",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 13,
                  }}
                >
                  👔 {party.dress_code}
                </span>
              )}
              {isEnded && (
                <span
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    borderRadius: 100,
                    padding: "6px 14px",
                    color: "#f87171",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  🛑 Event Ended
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Location banner — tappable, opens Google Maps */}
        {!party.location_tba && fullLocation && mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", display: "block", marginBottom: 24 }}
          >
            <div
              className="glass location-banner"
              style={{
                borderRadius: 20,
                padding: "18px 22px",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: "rgba(139,92,246,0.12)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                📍
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    margin: "0 0 3px",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 15,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {fullLocation}
                </p>
                <p
                  style={{
                    margin: 0,
                    color: "rgba(139,92,246,0.8)",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  Tap to view in Google Maps
                </p>
              </div>
              <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 18, flexShrink: 0 }}>
                ›
              </div>
            </div>
          </a>
        )}

        {/* Description */}
        {party.description && (
          <div
            className="glass"
            style={{ borderRadius: 20, padding: "24px", marginBottom: 24 }}
          >
            <h2
              style={{
                margin: "0 0 12px",
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              About this event
            </h2>
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              {party.description}
            </p>
          </div>
        )}

        {/* Vibes / Genres */}
        {((party.music_genres?.length ?? 0) > 0 ||
          (party.vibes?.length ?? 0) > 0) && (
          <div
            className="glass"
            style={{ borderRadius: 20, padding: "24px", marginBottom: 24 }}
          >
            {party.music_genres?.length > 0 && (
              <div style={{ marginBottom: party.vibes?.length ? 16 : 0 }}>
                <p
                  style={{
                    margin: "0 0 10px",
                    color: "rgba(255,255,255,0.4)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  Music
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {party.music_genres.map((g: string) => (
                    <span
                      key={g}
                      style={{
                        background: "rgba(139,92,246,0.08)",
                        border: "1px solid rgba(139,92,246,0.2)",
                        borderRadius: 100,
                        padding: "4px 12px",
                        color: "#a855f7",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {party.vibes?.length > 0 && (
              <div>
                <p
                  style={{
                    margin: "0 0 10px",
                    color: "rgba(255,255,255,0.4)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  Vibes
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {party.vibes.map((v: string) => (
                    <span
                      key={v}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 100,
                        padding: "4px 12px",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: 12,
                      }}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Community Link */}
        {party.community_link && (
          <div
            className="glass"
            style={{
              borderRadius: 20,
              padding: "20px 24px",
              marginBottom: 24,
              border: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(139,92,246,0.04)",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 24 }}>💬</div>
            <div>
              <p
                style={{
                  margin: "0 0 4px",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Official Event Group Chat Available
              </p>
              <p
                style={{
                  margin: 0,
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 13,
                  lineHeight: 1.4,
                }}
              >
                This event has an active {party.community_platform || "WhatsApp"} community. The invite link will be attached directly to your ticket once you complete checkout.
              </p>
            </div>
          </div>
        )}

        {/* Tickets */}
        <div
          className="glass"
          style={{ borderRadius: 20, padding: "24px", marginBottom: 24 }}
        >
          <h2
            style={{
              margin: "0 0 16px",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Tickets
          </h2>
          {activeTiers.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
              No tickets available yet
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {activeTiers.map((tier: any) => {
                const available = tier.quantity - (tier.quantity_sold ?? 0);
                const soldOut = available <= 0;
                return (
                  <div
                    key={tier.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: soldOut
                        ? "rgba(255,255,255,0.02)"
                        : "rgba(139,92,246,0.06)",
                      border: `1px solid ${soldOut ? "rgba(255,255,255,0.06)" : "rgba(139,92,246,0.2)"}`,
                      borderRadius: 14,
                      padding: "14px 18px",
                      opacity: soldOut ? 0.5 : 1,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: "0 0 3px",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: 15,
                        }}
                      >
                        {tier.name}
                      </p>
                      {soldOut ? (
                        <p
                          style={{
                            margin: 0,
                            color: "rgba(255,255,255,0.4)",
                            fontSize: 12,
                          }}
                        >
                          Sold out
                        </p>
                      ) : party.show_ticket_count ? (
                        <p
                          style={{
                            margin: 0,
                            color: "rgba(255,255,255,0.4)",
                            fontSize: 12,
                          }}
                        >
                          {available} available
                        </p>
                      ) : (
                        <p
                          style={{
                            margin: 0,
                            color: "rgba(255,255,255,0.4)",
                            fontSize: 12,
                          }}
                        >
                          Available
                        </p>
                      )}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          margin: 0,
                          color: "#a855f7",
                          fontWeight: 800,
                          fontSize: 18,
                        }}
                      >
                        {tier.price === 0
                          ? "Free"
                          : `${symbol}${tier.price.toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Sticky CTA */}
      {activeTiers.some(
        (t: any) => t.quantity - (t.quantity_sold ?? 0) > 0,
      ) && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(10, 0, 16, 0.9)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 50,
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.5)",
                fontSize: 12,
              }}
            >
              Starting from
            </p>
            <p
              style={{
                margin: 0,
                color: "#fff",
                fontWeight: 800,
                fontSize: 20,
              }}
            >
              {minPrice === 0
                ? "Free"
                : `${symbol}${minPrice?.toLocaleString()}`}
            </p>
          </div>
          <Link
            href={isEnded ? "#" : `/${partyPath}/checkout`}
            style={{
              background: isEnded
                ? "rgba(255,255,255,0.05)"
                : "linear-gradient(135deg, #7C3AED, #a855f7)",
              color: isEnded ? "rgba(255,255,255,0.3)" : "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 16,
              padding: "14px 36px",
              borderRadius: 100,
              boxShadow: isEnded ? "none" : "0 0 32px rgba(139,92,246,0.4)",
              display: "inline-block",
              transition: "opacity 0.2s",
              cursor: isEnded ? "not-allowed" : "pointer",
            }}
          >
            {isEnded ? "Sales Ended" : "Get Tickets"}
          </Link>
        </div>
      )}
    </div>
  );
}
