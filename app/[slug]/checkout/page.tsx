/**
 * Top-level checkout route: thesceneapp.online/[slug]/checkout
 *
 * Handles checkout at ultra-short URLs like:
 *   thesceneapp.online/beach-bash/checkout
 *
 * Delegates to the existing party/[id]/checkout component which
 * already resolves parties by both UUID and slug.
 */
export { default } from "@/app/party/[id]/checkout/page";
