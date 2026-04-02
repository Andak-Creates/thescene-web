import Link from 'next/link'
import Image from 'next/image'

interface Party {
  id: string
  title: string
  date: string | null
  date_tba: boolean
  city: string | null
  state: string | null
  flyer_url: string | null
  ticket_price: number | null
  currency_code: string
  host_profile?: { name: string; is_verified: boolean } | null
  media?: { media_url: string; media_type: string; thumbnail_url: string | null; is_primary: boolean }[]
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  NGN: '₦', USD: '$', GBP: '£', EUR: '€', GHS: '₵', KES: 'KSh', ZAR: 'R',
}

function resolveImage(party: Party): string | null {
  if (party.media && party.media.length > 0) {
    const primary = party.media.find(m => m.is_primary) ?? party.media[0]
    if (primary.media_type === 'video') return primary.thumbnail_url ?? null
    return primary.media_url
  }
  return party.flyer_url ?? null
}

function formatDate(dateString: string | null, dateTba: boolean) {
  if (dateTba || !dateString) return 'Date TBA'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default function EventCard({ party }: { party: Party }) {
  const imageUrl = resolveImage(party)
  const symbol = CURRENCY_SYMBOLS[party.currency_code] ?? party.currency_code + ' '
  const priceDisplay = party.ticket_price === 0
    ? 'Free'
    : party.ticket_price
      ? `From ${symbol}${party.ticket_price.toLocaleString()}`
      : null

  return (
    <Link href={`/party/${party.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        className="glass glass-hover animate-fade-in"
        style={{ borderRadius: 20, overflow: 'hidden', height: '100%' }}
      >
        {/* Media */}
        <div style={{ position: 'relative', aspectRatio: '4/5', background: 'rgba(255,255,255,0.04)' }}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={party.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40, opacity: 0.3,
            }}>🎉</div>
          )}

          {/* Host pill */}
          {party.host_profile?.name && (
            <div style={{
              position: 'absolute', top: 10, left: 10,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 100,
              padding: '4px 10px',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>
                {party.host_profile.name}
              </span>
              {party.host_profile.is_verified && (
                <span style={{ color: '#a855f7', fontSize: 10 }}>✓</span>
              )}
            </div>
          )}

          {/* Price badge */}
          {priceDisplay && (
            <div style={{
              position: 'absolute', bottom: 10, right: 10,
              background: 'linear-gradient(135deg, #7C3AED, #a855f7)',
              borderRadius: 100,
              padding: '4px 10px',
            }}>
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{priceDisplay}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '14px 16px' }}>
          <p style={{ margin: '0 0 6px', color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>
            {party.title}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{
              background: 'rgba(139,92,246,0.12)',
              border: '1px solid rgba(139,92,246,0.2)',
              borderRadius: 100,
              padding: '3px 8px',
              color: '#c084fc',
              fontSize: 11,
              fontWeight: 500,
            }}>
              📅 {formatDate(party.date, party.date_tba)}
            </span>
            {(party.city || party.state) && (
              <span style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 100,
                padding: '3px 8px',
                color: 'rgba(255,255,255,0.5)',
                fontSize: 11,
              }}>
                📍 {party.city ?? party.state}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
