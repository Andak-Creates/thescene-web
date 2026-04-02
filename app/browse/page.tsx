/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabase'
import EventCard from '@/components/EventCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse Events — TheScene',
  description: 'Discover the best parties and events near you. Buy tickets instantly — no account required.',
}

export const revalidate = 60

async function getParties(city?: string) {
  let query = supabase
    .from('parties')
    .select(`
      id, title, date, date_tba, city, state, flyer_url,
      ticket_price, currency_code,
      host_profile:host_profiles!host_profile_id (name, is_verified),
      media:party_media (media_url, media_type, thumbnail_url, is_primary)
    `)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(60)

  if (city) {
    query = query.ilike('city', `%${city}%`)
  }

  const { data, error } = await query
  if (error) {
    console.error('getParties error:', JSON.stringify(error))
    return []
  }
  return data ?? []
}

async function getCities() {
  const { data } = await supabase
    .from('parties')
    .select('city, state')
    .eq('is_published', true)
    .not('city', 'is', null)
  const cities = [...new Set((data ?? []).map(p => p.city).filter(Boolean))]
  return cities.slice(0, 10) as string[]
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>
}) {
  const { city } = await searchParams
  const [parties, cities] = await Promise.all([getParties(city), getCities()])

  return (
    <div style={{ minHeight: '100vh', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{
        position: 'relative',
        padding: '100px 24px 60px',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 300,
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <p style={{
          margin: '0 0 12px',
          color: '#a855f7',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          Discover What&apos;s On
        </p>
        <h1 style={{
          margin: '0 0 16px',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 900,
          letterSpacing: '-1.5px',
          lineHeight: 1.1,
          color: '#fff',
        }}>
          Find Your Next{' '}
          <span className="text-gradient">Scene</span>
        </h1>
        <p style={{
          margin: '0 auto 32px',
          maxWidth: 480,
          color: 'rgba(255,255,255,0.5)',
          fontSize: 16,
          lineHeight: 1.6,
        }}>
          Browse parties, concerts, and events near you. Buy tickets in seconds — no account needed.
        </p>

        {/* City filter pills */}
        {cities.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'center',
          }}>
            <a
              href="/browse"
              style={{
                padding: '8px 18px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                background: !city ? 'linear-gradient(135deg, #7C3AED, #a855f7)' : 'rgba(255,255,255,0.06)',
                color: '#fff',
                border: city ? '1px solid rgba(255,255,255,0.1)' : 'none',
                transition: 'opacity 0.2s',
              }}
            >
              All Cities
            </a>
            {cities.map(c => (
              <a
                key={c}
                href={`/browse?city=${encodeURIComponent(c)}`}
                style={{
                  padding: '8px 18px',
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  background: city === c ? 'linear-gradient(135deg, #7C3AED, #a855f7)' : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  border: city !== c ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}
              >
                {c}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {parties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎭</div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18 }}>No events found</p>
            {city && (
              <a href="/browse" style={{ color: '#a855f7', fontSize: 14, textDecoration: 'none' }}>
                Clear filter
              </a>
            )}
          </div>
        ) : (
          <>
            <p style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: 13,
              marginBottom: 24,
            }}>
              {parties.length} {parties.length === 1 ? 'event' : 'events'}{city ? ` in ${city}` : ''}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 20,
            }}>
              {parties.map((party: any, i: number) => (
                <div key={party.id} style={{ animationDelay: `${i * 40}ms` }}>
                  <EventCard party={party} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
