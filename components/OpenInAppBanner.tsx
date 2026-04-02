'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function OpenInAppBanner() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const pathname = usePathname()

  // Extract party ID from pathname for deep link
  const partyMatch = pathname.match(/^\/party\/([^/]+)/)
  const partyId = partyMatch ? partyMatch[1] : null

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const wasDismissed = sessionStorage.getItem('app_banner_dismissed') === '1'
    if (isMobile && !wasDismissed) setTimeout(() => setShow(true), 0)
  }, [])

  const handleDismiss = () => {
    sessionStorage.setItem('app_banner_dismissed', '1')
    setDismissed(true)
    setShow(false)
  }

  const handleOpen = () => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
    const isAndroid = /Android/i.test(navigator.userAgent)

    const deepLink = partyId ? `thescene://party/${partyId}` : 'thescene://home'
    window.location.href = deepLink

    setTimeout(() => {
      if (isIOS) {
        window.location.href = 'https://apps.apple.com/app/thescene'
      } else if (isAndroid) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.thescene'
      }
    }, 2000)
  }

  if (!show || dismissed) return null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(10, 0, 16, 0.95)',
      borderBottom: '1px solid rgba(139, 92, 246, 0.3)',
      backdropFilter: 'blur(16px)',
      padding: '10px 16px',
      display: 'flex', alignItems: 'center', gap: '12px',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: 'linear-gradient(135deg, #7C3AED, #a855f7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 18 }}>🎵</span>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>TheScene</div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Better experience in the app</div>
      </div>

      <button onClick={handleOpen} style={{
        background: 'linear-gradient(135deg, #7C3AED, #a855f7)',
        color: '#fff', border: 'none', borderRadius: 20,
        padding: '7px 16px', fontSize: 12, fontWeight: 700,
        cursor: 'pointer', flexShrink: 0,
      }}>
        Open
      </button>
      <button onClick={handleDismiss} style={{
        background: 'none', border: 'none',
        color: 'rgba(255,255,255,0.4)',
        fontSize: 18, cursor: 'pointer', padding: '4px', lineHeight: 1, flexShrink: 0,
      }} aria-label="Dismiss">
        ×
      </button>
    </div>
  )
}
