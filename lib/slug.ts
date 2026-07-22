/**
 * Converts a party title into a clean, URL-safe slug.
 * e.g. "Summer Vibe Festival 2026!" → "summer-vibe-festival-2026"
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")   // remove non-alphanumeric (keep spaces and hyphens)
    .replace(/\s+/g, "-")            // replace spaces with hyphens
    .replace(/-+/g, "-")             // collapse multiple hyphens
    .replace(/^-|-$/g, "");          // strip leading/trailing hyphens
}
