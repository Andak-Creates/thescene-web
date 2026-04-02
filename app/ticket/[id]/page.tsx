/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import QRViewer from '@/components/QRViewer'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Your Ticket — TheScene',
}

async function getTicket(id: string) {
  const { data, error } = await supabase
    .from('tickets')
    .select(`
      id, guest_name, guest_email, quantity_purchased, quantity_used,
      purchase_price, service_fee, total_paid, payment_status, purchased_at,
      ticket_tier:ticket_tiers (name),
      party:parties (id, title, date, date_tba, location, city, flyer_url)
    `)
    .eq('id', id)
    .eq('payment_status', 'completed')
    .single()

  if (error || !data) return null
  return data
}

function formatDate(dateString: string | null, dateTba: boolean) {
  if (dateTba || !dateString) return 'Date TBA'
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short', month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default async function TicketPage({ params }: PageProps) {
  const { id } = await params
  const ticket = await getTicket(id)
  if (!ticket) notFound()

  const party = ticket.party as any
  const tier = ticket.ticket_tier as any
  const usedAll = ticket.quantity_used >= ticket.quantity_purchased

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px 100px' }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ margin: '0 0 8px', color: '#a855f7', fontSize: 12, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Your Ticket</p>
          <h1 style={{ margin: 0, color: '#fff', fontSize: 26, fontWeight: 900, letterSpacing: '-0.5px' }}>
            {party.title}
          </h1>
        </div>

        {/* Ticket Card */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 28, overflow: 'hidden' }}>
          <div style={{ height: 4, background: 'linear-gradient(90deg, #7C3AED, #a855f7)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px 24px' }}>
            <QRViewer ticketId={id} />
            <p style={{ margin: '12px 0 0', color: 'rgba(255,255,255,0.25)', fontSize: 11, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Scan at the door
            </p>
          </div>

          <div style={{ margin: '0 24px', borderTop: '1px dashed rgba(255,255,255,0.1)' }} />

          <div style={{ padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 16px' }}>
              {[
                { label: 'Date', value: formatDate(party.date, party.date_tba) },
                { label: 'Location', value: [party.location, party.city].filter(Boolean).join(', ') || 'TBA' },
                { label: 'Ticket Type', value: tier?.name ?? 'General' },
                { label: 'Quantity', value: `${ticket.quantity_purchased} ticket${ticket.quantity_purchased > 1 ? 's' : ''}` },
                { label: 'Holder', value: ticket.guest_name ?? 'Guest' },
                { label: 'Status', value: usedAll ? 'Used' : ticket.quantity_used > 0 ? `${ticket.quantity_used}/${ticket.quantity_purchased} Used` : 'Valid ✓' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ margin: '0 0 3px', color: 'rgba(255,255,255,0.35)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>{label}</p>
                  <p style={{ margin: 0, color: label === 'Status' && !usedAll ? '#4ade80' : '#fff', fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{value}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.2)', fontSize: 10, letterSpacing: '0.5px' }}>
                TICKET ID: {id}
              </p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link href={`/party/${party.id}`} style={{ color: '#a855f7', fontSize: 14, textDecoration: 'none', fontWeight: 600 }}>
            ← View Event Details
          </Link>
        </div>

        <div style={{ marginTop: 32, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 20, padding: '20px 24px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 4px', color: '#fff', fontWeight: 700, fontSize: 15 }}>Get TheScene App</p>
          <p style={{ margin: '0 0 16px', color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Discover more events, follow hosts, and manage your tickets</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <a href="https://apps.apple.com/app/thescene" target="_blank" rel="noopener noreferrer"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #a855f7)', color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 700, padding: '9px 18px', borderRadius: 100 }}>
              📱 App Store
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.thescene" target="_blank" rel="noopener noreferrer"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 700, padding: '9px 18px', borderRadius: 100 }}>
              🤖 Play Store
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
