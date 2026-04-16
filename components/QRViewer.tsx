'use client'

import { QRCodeSVG } from 'qrcode.react'

export default function QRViewer({ ticketId, partyId }: { ticketId: string; partyId?: string }) {
  // Encode the same JSON structure the host app scanner expects: { ticketId, partyId }
  const qrValue = partyId
    ? JSON.stringify({ ticketId, partyId })
    : ticketId // fallback for backwards compatibility

  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      padding: 16,
      display: 'inline-block',
      boxShadow: '0 0 40px rgba(139,92,246,0.3)',
    }}>
      <QRCodeSVG
        value={qrValue}
        size={200}
        bgColor="#ffffff"
        fgColor="#0a0010"
        level="H"
        includeMargin={false}
      />
    </div>
  )
}
