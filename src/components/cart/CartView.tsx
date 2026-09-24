"use client";

import Link from "next/link";
import { getMenuItem, getRestaurant } from "@/data";
import { formatRupee } from "@/lib/format";
import { useCart } from "@/state/CartProvider";
import { BillRow, EmptyState, VegMark } from "@/components/ui/bits";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { usePersonalization } from "@/personalization/usePersonalization";

export function CartView() {
  const { lines, subtotal, setQuantity, ready } = useCart();
  const { profile } = usePersonalization();
  if (!ready || !profile) return <div className="page" />;
  if (!lines.length) {
    return (
      <div className="page">
        <EmptyState title="Your cart is empty" body="Add a dish from a restaurant to get started." action={{ href: "/restaurants", label: "Browse restaurants" }} />
      </div>
    );
  }
  const restaurant = getRestaurant(lines[0].restaurantId);
  return (
    <div className="page stack-lg">
      <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>Cart</h1>
      {restaurant ? <p className="muted">{restaurant.name}</p> : null}
      <div>
        {lines.map((line) => {
          const item = getMenuItem(line.itemId);
          if (!item) return null;
          return (
            <article key={line.itemId} className="food-row">
              <div className="food-copy stack" style={{ gap: "var(--space-2)" }}>
                <h2 style={{ fontWeight: 700 }}>{item.name}</h2>
                <div className="flex flex-wrap items-center" style={{ gap: "var(--space-3)" }}>
                  <VegMark veg={item.veg} labeled={profile.cards.labeledFacts} />
                  <span>{formatRupee(item.price)}</span>
                </div>
              </div>
              <QuantityStepper value={line.quantity} onChange={(next) => setQuantity(line.itemId, next)} />
            </article>
          );
        })}
      </div>
      <div className="bite-card card-body">
        <BillRow label="Subtotal" amount={formatRupee(subtotal)} />
        <BillRow label="To pay" amount={formatRupee(subtotal)} />
        <Link href="/checkout" className="bite-button bite-button-primary">Checkout</Link>
      </div>
    </div>
  );
}
