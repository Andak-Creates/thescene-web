"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { getOptimizedImageUrl } from "@/lib/media";

interface Props {
  parentTicketId: string;
  partyId: string;
  tierId: string;
  partyTitle: string;
  partyDate: string | null;
  partyDateTba: boolean;
  partyLocation: string;
  partyFlyerUrl: string | null;
  currencyCode: string;
  tableCapacity: number;
  remainingSeats: number;
  hostGuestName: string;
  tierName: string;
  slug: string;
}

export default function ClaimTableClient({
  parentTicketId,
  partyId,
  tierId,
  partyTitle,
  partyDate,
  partyDateTba,
  partyLocation,
  partyFlyerUrl,
  tableCapacity,
  remainingSeats: initialRemaining,
  hostGuestName,
  tierName,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [remainingSeats, setRemainingSeats] = useState(initialRemaining);

  const isFull = remainingSeats <= 0;

  const formattedDate = partyDate
    ? new Date(partyDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const flyerUrl = partyFlyerUrl
    ? (getOptimizedImageUrl(partyFlyerUrl, 800) ?? partyFlyerUrl)
    : null;

  async function handleClaim(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError("Please enter your name.");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Please enter a valid email address.");

    setError(null);
    setSubmitting(true);

    try {
      // Server-side capacity check + seat creation via Edge Function
      const { data, error: fnError } = await supabase.functions.invoke(
        "claim-table-seat",
        {
          body: {
            parentTicketId,
            partyId,
            tierId,
            guestName: name.trim(),
            guestEmail: email.toLowerCase().trim(),
          },
        },
      );

      if (fnError || !data?.success) {
        throw new Error(
          fnError?.message ?? data?.error ?? "Claim failed. Please try again.",
        );
      }

      setRemainingSeats((prev) => Math.max(0, prev - 1));
      setSuccess(true);
    } catch (err: unknown) {
      setError(
        (err as Error).message || "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ── SUCCESS STATE ────────────────────────────────────────────────────────
  if (success) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 60px",
          textAlign: "center",
        }}
      >
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
            boxShadow: "0 0 60px rgba(139,92,246,0.45)",
          }}
        >
          🎉
        </div>
        <h1
          style={{
            margin: "0 0 12px",
            color: "#fff",
            fontSize: "clamp(26px, 5vw, 36px)",
            fontWeight: 900,
            letterSpacing: "-0.5px",
          }}
        >
          Seat Claimed!
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
          You&apos;re now on {hostGuestName ? `${hostGuestName}'s` : "the"}{" "}
          table for <strong style={{ color: "#fff" }}>{partyTitle}</strong>.
        </p>
        <p
          style={{
            margin: "0 0 40px",
            color: "#a855f7",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Check your email. Your QR ticket is on its way 📧
        </p>
        <Link
          href="/browse"
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: 14,
            textDecoration: "none",
          }}
        >
          Browse more events →
        </Link>
      </div>
    );
  }

  // ── CLAIM FORM ────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", paddingBottom: 80 }}>
      {/* Blurred hero background */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 280,
          overflow: "hidden",
        }}
      >
        {flyerUrl ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("${flyerUrl}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(14px) brightness(0.6) saturate(1.4)",
              transform: "scale(1.1)",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #1a0d2e 0%, #0b0514 100%)",
            }}
          />
        )}
        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            background: "linear-gradient(to bottom, transparent, #0b0514)",
          }}
        />
        {/* Flyer thumbnail */}
        {flyerUrl && (
          <div
            style={{
              position: "absolute",
              bottom: -40,
              left: "50%",
              transform: "translateX(-50%)",
              width: 80,
              height: 107,
              borderRadius: 14,
              overflow: "hidden",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)",
              zIndex: 2,
            }}
          >
            <Image
              src={flyerUrl}
              alt={partyTitle}
              fill
              sizes="80px"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 500,
          margin: "0 auto",
          padding: flyerUrl ? "60px 24px 0" : "120px 24px 0",
        }}
      >
        {/* Event info */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <p
            style={{
              margin: "0 0 6px",
              color: "rgba(255,255,255,0.4)",
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            You&apos;ve been invited to
          </p>
          <h1
            style={{
              margin: "0 0 8px",
              color: "#fff",
              fontSize: "clamp(22px, 4vw, 30px)",
              fontWeight: 900,
              letterSpacing: "-0.4px",
            }}
          >
            {partyTitle}
          </h1>
          <p
            style={{
              margin: "0 0 4px",
              color: "rgba(255,255,255,0.5)",
              fontSize: 14,
            }}
          >
            {partyDateTba ? "Date TBA" : formattedDate}
          </p>
          {partyLocation && (
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.35)",
                fontSize: 13,
              }}
            >
              {partyLocation}
            </p>
          )}
        </div>

        {/* Table badge */}
        <div
          className="glass"
          style={{
            borderRadius: 16,
            padding: "14px 20px",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 2px",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              🪑 {tierName}
            </p>
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.4)",
                fontSize: 12,
              }}
            >
              Hosted by {hostGuestName}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            {isFull ? (
              <span style={{ color: "#f87171", fontWeight: 700, fontSize: 13 }}>
                Table Full
              </span>
            ) : (
              <>
                <p
                  style={{
                    margin: 0,
                    color: "#a855f7",
                    fontWeight: 800,
                    fontSize: 18,
                  }}
                >
                  {remainingSeats}
                </p>
                <p
                  style={{
                    margin: 0,
                    color: "rgba(255,255,255,0.4)",
                    fontSize: 11,
                  }}
                >
                  seat{remainingSeats !== 1 ? "s" : ""} left
                </p>
              </>
            )}
          </div>
        </div>

        {/* Full message */}
        {isFull ? (
          <div
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: 16,
              padding: "24px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: "0 0 8px",
                color: "#f87171",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              This table is fully booked
            </p>
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.4)",
                fontSize: 14,
              }}
            >
              All {tableCapacity} seats have been claimed. Contact your host to
              see if another table is available.
            </p>
          </div>
        ) : (
          /* Claim form */
          <form onSubmit={handleClaim}>
            <div
              className="glass"
              style={{ borderRadius: 20, padding: 24, marginBottom: 16 }}
            >
              <h2
                style={{
                  margin: "0 0 16px",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                Claim Your Seat
              </h2>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div>
                  <label
                    htmlFor="claim-name"
                    style={{
                      display: "block",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 12,
                      fontWeight: 600,
                      marginBottom: 6,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    id="claim-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    disabled={submitting}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 12,
                      padding: "12px 16px",
                      color: "#fff",
                      fontSize: 15,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#8B5CF6")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.12)")
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="claim-email"
                    style={{
                      display: "block",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 12,
                      fontWeight: 600,
                      marginBottom: 6,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Email (your QR ticket will be sent here)
                  </label>
                  <input
                    id="claim-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={submitting}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 12,
                      padding: "12px 16px",
                      color: "#fff",
                      fontSize: 15,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#8B5CF6")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255,255,255,0.12)")
                    }
                  />
                </div>
              </div>
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  marginBottom: 16,
                }}
              >
                <p style={{ margin: 0, color: "#f87171", fontSize: 14 }}>
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                background: submitting
                  ? "rgba(255,255,255,0.1)"
                  : "linear-gradient(135deg, #7C3AED, #a855f7)",
                color: "#fff",
                border: "none",
                borderRadius: 100,
                padding: "17px",
                fontSize: 16,
                fontWeight: 700,
                cursor: submitting ? "not-allowed" : "pointer",
                boxShadow: submitting
                  ? "none"
                  : "0 0 32px rgba(139,92,246,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {submitting ? (
                <>
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  Claiming your seat...
                </>
              ) : (
                "Claim My Seat. It's Free"
              )}
            </button>

            <p
              style={{
                textAlign: "center",
                color: "rgba(255,255,255,0.25)",
                fontSize: 12,
                marginTop: 12,
              }}
            >
              Free to claim · Your QR code will be emailed to you
            </p>
          </form>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}
