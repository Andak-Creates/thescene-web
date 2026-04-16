/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Script from 'next/script'
import { supabase } from '@/lib/supabase'

interface TicketTier {
  id: string; name: string; price: number
  quantity: number; quantity_sold: number; is_active: boolean; tier_order: number
}

interface Party {
  id: string; title: string; date: string | null; location: string | null
  city: string | null; currency_code: string; host_id: string
  host_profile?: { name: string } | null
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  NGN: '₦', USD: '$', GBP: '£', EUR: '€', GHS: '₵', KES: 'KSh', ZAR: 'R',
}
const APP_FEE = 0.05
const PAYSTACK_CURRENCIES = ['NGN', 'GHS', 'USD', 'ZAR', 'KES', 'XOF']

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [party, setParty] = useState<Party | null>(null)
  const [tiers, setTiers] = useState<TicketTier[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [paystackReady, setPaystackReady] = useState(false)
  const [purchasing, setPurchasing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const pendingRef = useRef<any>(null)

  useEffect(() => {
    async function fetchData() {
      const [{ data: partyData }, { data: tiersData }] = await Promise.all([
        supabase.from('parties')
          .select('id, title, date, location, city, currency_code, host_id, host_profile:host_profiles!host_profile_id(name)')
          .eq('id', id).single(),
        supabase.from('ticket_tiers')
          .select('*').eq('party_id', id).eq('is_active', true).order('tier_order'),
      ])

      if (partyData) setParty(partyData as any)

      const activeTiers = (tiersData ?? []).map((t: any) => ({
        ...t,
        available: t.quantity - (t.quantity_sold ?? 0),
      }))
      setTiers(activeTiers)
      if (activeTiers.length > 0) setSelectedTierId(activeTiers[0].id)
      setLoading(false)
    }
    fetchData()
  }, [id])

  const selectedTier = tiers.find(t => t.id === selectedTierId) as any
  const available = selectedTier ? selectedTier.quantity - (selectedTier.quantity_sold ?? 0) : 0
  const subtotal = selectedTier ? selectedTier.price * quantity : 0
  const fee = subtotal * APP_FEE
  const total = subtotal + fee
  const symbol = CURRENCY_SYMBOLS[party?.currency_code ?? 'NGN'] ?? '₦'

  function validate(): string | null {
    if (!guestName.trim()) return 'Please enter your name'
    if (!guestEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) return 'Please enter a valid email'
    if (!selectedTierId) return 'Please select a ticket type'
    if (quantity < 1 || quantity > available) return `Only ${available} tickets available`
    const currency = party?.currency_code ?? 'NGN'
    if (!PAYSTACK_CURRENCIES.includes(currency)) return `Currency ${currency} not supported by Paystack`
    return null
  }

  async function handlePaymentSuccess(reference: string) {
    const p = pendingRef.current
    if (!p || !party) return

    try {
      const { data: result, error: fnError } = await supabase.functions.invoke('create-guest-ticket', {
        body: {
          partyId: id,
          tierId: p.tierId,
          quantity,
          guestEmail: guestEmail.toLowerCase().trim(),
          guestName: guestName.trim(),
          reference,
          purchasePrice: p.subtotal,
          serviceFee: p.fee,
          totalPaid: p.total,
          currency: party.currency_code,
        },
      })

      if (fnError || !result?.success) {
        throw new Error(fnError?.message ?? result?.error ?? 'Ticket creation failed')
      }

      const ticketId = result.ticketId
      // Email is sent server-side by create-guest-ticket — no need to call send-ticket-email here

      router.push(`/party/${id}/checkout/success?ticket=${ticketId}&party=${encodeURIComponent(party.title)}`)
    } catch (err: any) {
      console.error('handlePaymentSuccess error:', err)
      setError('Payment received but ticket creation failed. Contact support with reference: ' + reference)
      setPurchasing(false)
    }
  }

  function handlePay() {
    const validationError = validate()
    if (validationError) { setError(validationError); return }
    setError(null)

    pendingRef.current = { tierId: selectedTierId, tierName: selectedTier?.name, subtotal, fee, total }

    if (total === 0) {
      setPurchasing(true)
      handlePaymentSuccess('FREE_' + Date.now())
      return
    }

    setPurchasing(true)
    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: guestEmail.toLowerCase().trim(),
      amount: Math.round(total * 100),
      currency: party!.currency_code,
      ref: `TKW_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
      channels: ['card', 'bank_transfer', 'ussd', 'mobile_money', 'bank'],
      metadata: {
        party_id: id, party_title: party!.title, tier_id: selectedTierId,
        tier_name: selectedTier?.name, quantity, guest_name: guestName,
      },
      callback: (res: any) => {
        const ref = res.reference || res.trans || res.transaction || ''
        handlePaymentSuccess(ref)
      },
      onClose: () => {
        if (pendingRef.current) setPurchasing(false)
      },
    })
    handler.openIframe()
  }

  if (loading) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, border: '3px solid rgba(139,92,246,0.2)', borderTopColor: '#8B5CF6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  )

  return (
    <>
      <Script src="https://js.paystack.co/v1/inline.js" onLoad={() => setPaystackReady(true)} />

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '120px 24px 100px' }}>
        <h1 style={{ margin: '0 0 8px', color: '#fff', fontSize: 26, fontWeight: 800 }}>Get Tickets</h1>
        <p style={{ margin: '0 0 32px', color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>{party?.title}</p>

        {/* Guest Info */}
        <div className="glass" style={{ borderRadius: 20, padding: 24, marginBottom: 20 }}>
          <h2 style={{ margin: '0 0 16px', color: '#fff', fontSize: 16, fontWeight: 700 }}>Your Details</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Full Name</label>
              <input
                type="text" value={guestName} onChange={e => setGuestName(e.target.value)}
                placeholder="Your full name"
                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: 15, outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#8B5CF6'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Email (ticket will be sent here)</label>
              <input
                type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)}
                placeholder="your@email.com"
                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: 15, outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#8B5CF6'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
              />
            </div>
          </div>
        </div>

        {/* Tier Selection */}
        <div className="glass" style={{ borderRadius: 20, padding: 24, marginBottom: 20 }}>
          <h2 style={{ margin: '0 0 16px', color: '#fff', fontSize: 16, fontWeight: 700 }}>Select Ticket</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tiers.map((tier: any) => {
              const avail = tier.quantity - (tier.quantity_sold ?? 0)
              const soldOut = avail <= 0
              const selected = selectedTierId === tier.id
              return (
                <button key={tier.id} onClick={() => { if (!soldOut) { setSelectedTierId(tier.id); setQuantity(1) } }} disabled={soldOut}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: selected ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${selected ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 14, padding: '14px 18px', cursor: soldOut ? 'not-allowed' : 'pointer',
                    opacity: soldOut ? 0.4 : 1, width: '100%', textAlign: 'left', transition: 'all 0.15s',
                  }}>
                  <div>
                    <p style={{ margin: '0 0 2px', color: '#fff', fontWeight: 700, fontSize: 15 }}>{tier.name}</p>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{soldOut ? 'Sold out' : `${avail} left`}</p>
                  </div>
                  <p style={{ margin: 0, color: '#a855f7', fontWeight: 800, fontSize: 17 }}>
                    {tier.price === 0 ? 'Free' : `${symbol}${tier.price.toLocaleString()}`}
                  </p>
                </button>
              )
            })}
          </div>

          {selectedTier && available > 1 && (
            <div style={{ marginTop: 20 }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Quantity</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '10px 16px', width: 'fit-content' }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}
                  style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: quantity <= 1 ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.2)', color: '#fff', fontSize: 20, cursor: quantity <= 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: 22, minWidth: 32, textAlign: 'center' }}>{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(available, q + 1))} disabled={quantity >= available}
                  style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: quantity >= available ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.2)', color: '#fff', fontSize: 20, cursor: quantity >= available ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        {selectedTier && (
          <div className="glass" style={{ borderRadius: 20, padding: 24, marginBottom: 20 }}>
            <h2 style={{ margin: '0 0 16px', color: '#fff', fontSize: 16, fontWeight: 700 }}>Price Breakdown</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{quantity}× {selectedTier.name}</span>
                <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{symbol}{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Service Fee (5%)</span>
                <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{symbol}{fee.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>Total</span>
                <span style={{ color: '#a855f7', fontSize: 18, fontWeight: 800 }}>
                  {total === 0 ? 'Free' : `${symbol}${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`}
                </span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '12px 16px', marginBottom: 16 }}>
            <p style={{ margin: 0, color: '#f87171', fontSize: 14 }}>{error}</p>
          </div>
        )}

        <button onClick={handlePay} disabled={purchasing || !paystackReady || !selectedTier || available === 0}
          style={{
            width: '100%',
            background: purchasing || !paystackReady || !selectedTier ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #7C3AED, #a855f7)',
            color: '#fff', border: 'none', borderRadius: 100, padding: '17px', fontSize: 16, fontWeight: 700,
            cursor: purchasing || !paystackReady ? 'not-allowed' : 'pointer',
            boxShadow: !purchasing && paystackReady ? '0 0 32px rgba(139,92,246,0.35)' : 'none',
            transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
          {purchasing ? (
            <>
              <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              Processing...
            </>
          ) : total === 0 ? 'Get Free Ticket →' : `Pay ${symbol}${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} →`}
        </button>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 12 }}>
          Secured by Paystack · Your ticket will be emailed to you
        </p>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          input::placeholder { color: rgba(255,255,255,0.2); }
          input { box-sizing: border-box; }
        `}</style>
      </div>
    </>
  )
}
