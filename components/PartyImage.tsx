'use client'

import Image from 'next/image'
import { useState } from 'react'
import { getOptimizedImageUrl } from '@/lib/media'

interface Props {
  src: string
  fallbackSrc?: string | null
  alt: string
  sizes?: string
  priority?: boolean
  style?: React.CSSProperties
}

export default function PartyImage({ src, fallbackSrc, alt, sizes, priority, style }: Props) {
  const [imgSrc, setImgSrc] = useState(getOptimizedImageUrl(src, 600) || src)
  const [triedFallback, setTriedFallback] = useState(false)

  const handleError = () => {
    if (!triedFallback && fallbackSrc) {
      setImgSrc(getOptimizedImageUrl(fallbackSrc, 600) || fallbackSrc)
      setTriedFallback(true)
    }
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes={sizes ?? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
      priority={priority}
      style={style ?? { objectFit: 'cover' }}
      onError={handleError}
    />
  )
}
