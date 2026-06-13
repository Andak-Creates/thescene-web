import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    // Tell Next.js to cache Supabase fetch calls for 60 seconds.
    // This means a DB query result is reused across requests within that window
    // instead of hitting Supabase on every single server render.
    fetch: (url, options = {}) =>
      fetch(url, { ...options, next: { revalidate: 60 } }),
  },
})
