import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Booking Confirmed — TheScene',
}

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ ticket?: string; party?: string }>
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const { ticket, party } = await searchParams

  return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '120px 24px 40px', textAlign: 'center',
    }}>
      {/* Success icon */}
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: 'linear-gradient(135deg, #7C3AED, #a855f7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 36, marginBottom: 24, boxShadow: '0 0 60px rgba(139,92,246,0.4)',
      }}>
        🎟️
      </div>

      <h1 style={{ margin: '0 0 12px', color: '#fff', fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 900, letterSpacing: '-0.5px' }}>
        You&apos;re in!
      </h1>

      <p style={{ margin: '0 0 8px', color: 'rgba(255,255,255,0.6)', fontSize: 16, maxWidth: 420, lineHeight: 1.6 }}>
        {party ? `Your ticket for "${decodeURIComponent(party)}" has been booked.` : 'Your ticket has been booked.'}
      </p>
      <p style={{ margin: '0 0 40px', color: '#a855f7', fontSize: 15, fontWeight: 600 }}>
        Check your email — your QR ticket is on its way 📧
      </p>

      {ticket && (
        <Link href={`/ticket/${ticket}`} style={{
          display: 'inline-block', background: 'rgba(139,92,246,0.12)',
          border: '1px solid rgba(139,92,246,0.3)', color: '#a855f7',
          textDecoration: 'none', fontWeight: 600, fontSize: 14,
          padding: '12px 24px', borderRadius: 100, marginBottom: 40, transition: 'all 0.2s',
        }}>
          View Ticket Online →
        </Link>
      )}

      {/* Download App CTA */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24, padding: '32px', maxWidth: 420, width: '100%',
      }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🎵</div>
        <h2 style={{ margin: '0 0 8px', color: '#fff', fontSize: 20, fontWeight: 800 }}>Want to discover more parties?</h2>
        <p style={{ margin: '0 0 24px', color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.6 }}>
          Download TheScene to get personalised party recommendations, follow your favourite hosts, and buy tickets even faster.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://apps.apple.com/app/thescene" target="_blank" rel="noopener noreferrer"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #a855f7)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 8 }}>
            📱 App Store
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.thescene" target="_blank" rel="noopener noreferrer"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 8 }}>
            🤖 Play Store
          </a>
        </div>
      </div>

      <Link href="/browse" style={{ marginTop: 24, color: 'rgba(255,255,255,0.3)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}>
        Browse more events →
      </Link>
    </div>
  )
}
