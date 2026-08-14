/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import ClaimGroupClient from "./ClaimGroupClient";

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
    title: `Claim Your Spot | ${partyTitle} | TheScene`,
    description: `You've been invited to join a group. Claim your spot for ${partyTitle}.`,
  };
}

export default async function ClaimGroupPage({ params }: PageProps) {
  const { slug, token } = await params;

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
    .is("parent_ticket_id", null)
    .single();

  if (error || !parentTicket) {
    notFound();
  }

  const tier = parentTicket.tier as any;
  if (tier?.tier_type !== "group") {
    notFound();
  }

  const { count: claimedCount } = await supabase
    .from("tickets")
    .select("id", { count: "exact", head: true })
    .eq("parent_ticket_id", parentTicket.id);

  const totalCapacity =
    parentTicket.table_capacity_snapshot ??
    (parentTicket.tier as any)?.table_capacity ??
    0;

  const remainingSpots = Math.max(0, totalCapacity - 1 - (claimedCount ?? 0));
  const party = parentTicket.party as any;

  return (
    <ClaimGroupClient
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
      groupCapacity={totalCapacity}
      remainingSpots={remainingSpots}
      hostGuestName={parentTicket.guest_name ?? "your host"}
      tierName={tier?.name ?? "Group Pass"}
      slug={slug}
    />
  );
}
