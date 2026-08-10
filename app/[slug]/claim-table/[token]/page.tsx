/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import ClaimTableClient from "./ClaimTableClient";

interface PageProps {
  params: Promise<{ slug: string; token: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params;
  const { data: ticket } = await supabase
    .from("tickets")
    .select("table_capacity_snapshot, party:parties(title)")
    .eq("claim_token", token)
    .is("parent_ticket_id", null)
    .single();

  const partyTitle = (ticket?.party as any)?.title ?? "Event";
  return {
    title: `Claim Your Seat | ${partyTitle} | TheScene`,
    description: `You've been invited to a table. Claim your seat for ${partyTitle}.`,
  };
}

export default async function ClaimTablePage({ params }: PageProps) {
  const { slug, token } = await params;

  // 1. Find the parent ticket by claim_token
  const { data: parentTicket, error } = await supabase
    .from("tickets")
    .select(`
      id,
      claim_token,
      table_capacity_snapshot,
      parent_ticket_id,
      ticket_tier_id,
      party_id,
      guest_name,
      party:parties(id, title, date, date_tba, location, city, state, country, flyer_url, currency_code, slug),
      tier:ticket_tiers(id, name, tier_type, table_capacity)
    `)
    .eq("claim_token", token)
    .is("parent_ticket_id", null) // must be a root ticket (the buyer's)
    .single();

  if (error || !parentTicket) {
    notFound();
  }

  // Ensure this is actually a table purchase
  const tier = parentTicket.tier as any;
  if (tier?.tier_type !== "table") {
    notFound();
  }

  // 2. Count how many seats have already been claimed (child tickets)
  const { count: claimedCount } = await supabase
    .from("tickets")
    .select("id", { count: "exact", head: true })
    .eq("parent_ticket_id", parentTicket.id);

  const totalCapacity =
    parentTicket.table_capacity_snapshot ??
    (parentTicket.tier as any)?.table_capacity ??
    0;

  // The buyer holds seat 1, so remaining = capacity - 1 - claimed guests
  const remainingSeats = Math.max(0, totalCapacity - 1 - (claimedCount ?? 0));
  const party = parentTicket.party as any;

  return (
    <ClaimTableClient
      parentTicketId={parentTicket.id}
      partyId={parentTicket.party_id}
      tierId={parentTicket.ticket_tier_id ?? ""}
      partyTitle={party?.title ?? "Event"}
      partyDate={party?.date ?? null}
      partyDateTba={party?.date_tba ?? false}
      partyLocation={[party?.location, party?.city, party?.state, party?.country]
        .filter(Boolean)
        .join(", ")}
      partyFlyerUrl={party?.flyer_url ?? null}
      currencyCode={party?.currency_code ?? "NGN"}
      tableCapacity={totalCapacity}
      remainingSeats={remainingSeats}
      hostGuestName={parentTicket.guest_name ?? "your host"}
      tierName={tier?.name ?? "Table"}
      slug={slug}
    />
  );
}
