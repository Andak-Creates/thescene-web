/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getParty(id: string) {
  const { data, error } = await supabase
    .from('parties')
    .select(`
      id, title, description, date, end_date, date_tba, location, location_tba,
      city, state, country, ticket_price, ticket_price_tba, currency_code,
      music_genres, vibes, dress_code, flyer_url, is_published,
      host_id, host_profile_id,
      host:profiles!host_id (username, avatar_url),
      host_profile:host_profiles!host_profile_id (id, name, avatar_url, is_verified),
      media:party_media (media_url, media_type, thumbnail_url, is_primary, display_order),
      tiers:ticket_tiers (id, name, price, quantity, quantity_sold, is_active, tier_order)
    `)
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (error || !data) return null
  return data
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  NGN: '₦', USD: '$', GBP: '£', EUR: '€', GHS: '₵', KES: 'KSh', ZAR: 'R',
}

function resolveImage(party: any): string | null {
  if (party.media?.length > 0) {
    const sorted = [...party.media].sort((a: any, b: any) => {
      if (a.is_primary) return -1
      if (b.is_primary) return 1
      return (a.display_order ?? 0) - (b.display_order ?? 0)
    })
    const first = sorted[0]
    if (first.media_type === 'video') return first.thumbnail_url ?? null
    return first.media_url
  }
  return party.flyer_url ?? null
}

function formatDateTime(dateString: string | null) {
  if (!dateString) return null
  const d = new Date(dateString)
  return {
    date: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
    time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const party = await getParty(id)
  if (!party) return { title: 'Event Not Found — TheScene' }
  const image = resolveImage(party)
  return {
    title: `${party.title} — TheScene`,
    description: party.description ?? `Get tickets for ${party.title}`,
    openGraph: {
      title: party.title,
      description: party.description ?? undefined,
      images: image ? [{ url: image }] : [],
    },
  }
}

export default async function PartyPage({ params }: PageProps) {
  const { id } = await params
  const party = await getParty(id)
  if (!party) notFound()

  const imageUrl = resolveImage(party)
  const symbol = CURRENCY_SYMBOLS[party.currency_code] ?? party.currency_code + ' '
  const dt = formatDateTime(party.date)
  const activeTiers = (party.tiers ?? [])
    .filter((t: any) => t.is_active)
    .sort((a: any, b: any) => a.tier_order - b.tier_order)
  const hostName = (party.host_profile as any)?.name ?? (party.host as any)?.username ?? 'Host'
  const minPrice = activeTiers.length > 0 ? Math.min(...activeTiers.map((t: any) => t.price)) : null

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 100 }}>
      {/* Hero Image */}
      <div style={{
        position: 'relative', width: '100%', maxHeight: 520,
        aspectRatio: '16/9', overflow: 'hidden', background: 'rgba(255,255,255,0.03)',
      }}>
        {imageUrl ? (
          <Image src={imageUrl} alt={party.title} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{ height: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, opacity: 0.15 }}>🎉</div>
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,0,16,0.1) 0%, rgba(10,0,16,0.8) 100%)',
        }} />
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
        {/* Title card */}
        <div style={{ marginTop: '-60px', position: 'relative', zIndex: 10, marginBottom: 32 }}>
          <div className="glass" style={{ borderRadius: 24, padding: '28px 28px 24px' }}>
            <h1 style={{ margin: '0 0 8px', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
              {party.title}
            </h1>
            <p style={{ margin: '0 0 20px', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
              Hosted by <span style={{ color: '#a855f7', fontWeight: 600 }}>{hostName}</span>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {dt && (
                <span style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 100, padding: '6px 14px', color: '#c084fc', fontSize: 13, fontWeight: 500 }}>
                  📅 {dt.date}
                </span>
              )}
              {dt && (
                <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '6px 14px', color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                  🕐 {dt.time}
                </span>
              )}
              {party.date_tba && (
                <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '6px 14px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                  📅 Date TBA
                </span>
              )}
              {!party.location_tba && party.location && (
                <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '6px 14px', color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                  📍 {party.location}{party.city ? `, ${party.city}` : ''}
                </span>
              )}
              {party.dress_code && (
                <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '6px 14px', color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                  👔 {party.dress_code}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {party.description && (
          <div className="glass" style={{ borderRadius: 20, padding: '24px', marginBottom: 24 }}>
            <h2 style={{ margin: '0 0 12px', color: '#fff', fontSize: 16, fontWeight: 700 }}>About this event</h2>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: 15 }}>{party.description}</p>
          </div>
        )}

        {/* Vibes / Genres */}
        {((party.music_genres?.length ?? 0) > 0 || (party.vibes?.length ?? 0) > 0) && (
          <div className="glass" style={{ borderRadius: 20, padding: '24px', marginBottom: 24 }}>
            {party.music_genres?.length > 0 && (
              <div style={{ marginBottom: party.vibes?.length ? 16 : 0 }}>
                <p style={{ margin: '0 0 10px', color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Music</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {party.music_genres.map((g: string) => (
                    <span key={g} style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 100, padding: '4px 12px', color: '#a855f7', fontSize: 12, fontWeight: 500 }}>{g}</span>
                  ))}
                </div>
              </div>
            )}
            {party.vibes?.length > 0 && (
              <div>
                <p style={{ margin: '0 0 10px', color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Vibes</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {party.vibes.map((v: string) => (
                    <span key={v} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '4px 12px', color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{v}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tickets */}
        <div className="glass" style={{ borderRadius: 20, padding: '24px', marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 16px', color: '#fff', fontSize: 16, fontWeight: 700 }}>Tickets</h2>
          {activeTiers.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>No tickets available yet</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {activeTiers.map((tier: any) => {
                const available = tier.quantity - (tier.quantity_sold ?? 0)
                const soldOut = available <= 0
                return (
                  <div key={tier.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: soldOut ? 'rgba(255,255,255,0.02)' : 'rgba(139,92,246,0.06)',
                    border: `1px solid ${soldOut ? 'rgba(255,255,255,0.06)' : 'rgba(139,92,246,0.2)'}`,
                    borderRadius: 14, padding: '14px 18px', opacity: soldOut ? 0.5 : 1,
                  }}>
                    <div>
                      <p style={{ margin: '0 0 3px', color: '#fff', fontWeight: 700, fontSize: 15 }}>{tier.name}</p>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{soldOut ? 'Sold out' : `${available} available`}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, color: '#a855f7', fontWeight: 800, fontSize: 18 }}>
                        {tier.price === 0 ? 'Free' : `${symbol}${tier.price.toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Sticky CTA */}
      {activeTiers.some((t: any) => (t.quantity - (t.quantity_sold ?? 0)) > 0) && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: 'rgba(10, 0, 16, 0.9)', backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50,
        }}>
          <div>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Starting from</p>
            <p style={{ margin: 0, color: '#fff', fontWeight: 800, fontSize: 20 }}>
              {minPrice === 0 ? 'Free' : `${symbol}${minPrice?.toLocaleString()}`}
            </p>
          </div>
          <Link href={`/party/${id}/checkout`} style={{
            background: 'linear-gradient(135deg, #7C3AED, #a855f7)', color: '#fff',
            textDecoration: 'none', fontWeight: 700, fontSize: 16, padding: '14px 36px',
            borderRadius: 100, boxShadow: '0 0 32px rgba(139,92,246,0.4)', display: 'inline-block', transition: 'opacity 0.2s',
          }}>
            Get Tickets
          </Link>
        </div>
      )}
    </div>
  )
}
