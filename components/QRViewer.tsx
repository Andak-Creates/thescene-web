'use client'

import { QRCodeSVG } from 'qrcode.react'

export default function QRViewer({ ticketId }: { ticketId: string }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      padding: 16,
      display: 'inline-block',
      boxShadow: '0 0 40px rgba(139,92,246,0.3)',
    }}>
      <QRCodeSVG
        value={ticketId}
        size={200}
        bgColor="#ffffff"
        fgColor="#0a0010"
        level="H"
        includeMargin={false}
      />
    </div>
  )
}
