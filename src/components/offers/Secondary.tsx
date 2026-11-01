"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Offer } from "@/data";
import { getRestaurant } from "@/data";
import { usePersonalization } from "@/personalization/usePersonalization";
import { useOrders } from "@/state/OrderProvider";
import { Badge } from "@/components/ui/bits";

export function OfferList({ offers }: { offers: Offer[] }) {
  const { profile } = usePersonalization();
  if (!profile) return null;
  return (
    <div className="page stack">
      <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>Offers</h1>
      <div className="offer-grid" data-density={profile.density}>
        {offers.map((offer) => {
          const restaurant = offer.restaurantIds?.length === 1 ? getRestaurant(offer.restaurantIds[0]) : null;
          return (
            <article key={offer.id} className="bite-card card-body">
              <Badge>{offer.code}</Badge>
              <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700 }}>{offer.title}</h2>
              <p>{offer.detail}</p>
              {restaurant ? <Link href={`/restaurant/${restaurant.id}`}>View {restaurant.name}</Link> : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function ProfilePanel() {
  const router = useRouter();
  const { enteredAge, profile, clearPersonalization } = usePersonalization();
  const { orders } = useOrders();
  if (!profile) return null;
  return (
    <div className="page stack">
      <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>Profile</h1>
      <div className="bite-card card-body">
        <p style={{ fontSize: "var(--text-lg)", fontWeight: 700 }}>Guest</p>
        <p>Entered age: {enteredAge === null ? "Not entered" : enteredAge}</p>
        <p>Layout: {profile.label}</p>
        <p>Orders on this device: {orders.length}</p>
        <div className="flex flex-wrap" style={{ gap: "var(--space-3)" }}>
          <button
            type="button"
            className="bite-button bite-button-primary"
            onClick={() => {
              clearPersonalization();
              router.push("/onboard");
            }}
          >
            Enter a different age
          </button>
          <Link href="/orders" className="bite-button bite-button-secondary">View orders</Link>
        </div>
      </div>
    </div>
  );
}

export function HelpList() {
  const topics = [
    { href: "/admin", title: "Change how Bite looks", body: "Set an age on the admin page, or use Viewing as at the top of that page." },
    { href: "/search", title: "Search for food", body: "Look up a dish or a restaurant." },
    { href: "/orders", title: "Orders", body: "Demo orders stay on this device." },
    { href: "/offers", title: "Offers", body: "See the current Bite offers." },
  ];
  return (
    <div className="page stack">
      <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>Help</h1>
      {topics.map((topic) => (
        <Link key={topic.href} href={topic.href} className="bite-card card-body">
          <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700 }}>{topic.title}</h2>
          <p>{topic.body}</p>
        </Link>
      ))}
    </div>
  );
}
