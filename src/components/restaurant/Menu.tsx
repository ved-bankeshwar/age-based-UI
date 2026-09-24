"use client";

import Image from "next/image";
import { getRestaurant } from "@/data";
import type { MenuItem, Restaurant } from "@/data";
import { formatDelivery, formatPriceForTwo, formatRupee } from "@/lib/format";
import { usePersonalization } from "@/personalization/usePersonalization";
import { useCart } from "@/state/CartProvider";
import { Rating, VegMark } from "@/components/ui/bits";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

export function RestaurantHero({ restaurant }: { restaurant: Restaurant }) {
  const { profile } = usePersonalization();
  const labeled = profile?.cards.labeledFacts ?? false;
  return (
    <section className="bite-card" data-labeled={labeled ? "true" : "false"}>
      <div className="card-image">
        <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" priority sizes="100vw" />
      </div>
      <div className="card-body">
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>{restaurant.name}</h1>
        <p>{restaurant.cuisines.join(" • ")}</p>
        <div className="card-facts">
          <Rating value={restaurant.rating} labeled={labeled} />
          <span>{labeled ? `Delivery ${formatDelivery(restaurant.deliveryMinutes)}` : formatDelivery(restaurant.deliveryMinutes)}</span>
          <span>{labeled ? `Cost for two ${formatRupee(restaurant.priceForTwo)}` : formatPriceForTwo(restaurant.priceForTwo)}</span>
          <VegMark veg={restaurant.veg} labeled={labeled} />
        </div>
        {restaurant.offer ? <p style={{ fontWeight: 700 }}>{restaurant.offer}</p> : null}
      </div>
    </section>
  );
}

function addLabel(style: "short" | "standard" | "explicit" | undefined) {
  if (style === "explicit") return "Add to cart";
  if (style === "standard") return "Add";
  return "+";
}

export function FoodItem({ item, layout = "menu" }: { item: MenuItem; layout?: "menu" | "result" }) {
  const { profile } = usePersonalization();
  const { lines, addItem, setQuantity } = useCart();
  if (!profile) return null;
  const quantity = lines.find((line) => line.itemId === item.id)?.quantity ?? 0;
  const restaurant = getRestaurant(item.restaurantId);
  const showDescription = profile.foodItem.showDescription || layout === "result";
  const label = addLabel(profile.buttons.labelStyle);
  return (
    <article className="food-row">
      <div className="food-thumb" data-image-size={profile.foodItem.imageSize}>
        <Image src={item.image} alt="" fill className="object-cover" sizes="128px" />
      </div>
      <div className="food-copy stack" style={{ gap: "var(--space-1)" }}>
        <h3 style={{ fontWeight: 700, fontSize: "var(--text-lg)" }}>{item.name}</h3>
        {layout === "result" && restaurant ? <p className="muted">{restaurant.name}</p> : null}
        {showDescription ? <p className="muted">{item.description}</p> : null}
        <div className="flex flex-wrap items-center" style={{ gap: "var(--space-3)" }}>
          <VegMark veg={item.veg} labeled={profile.cards.labeledFacts} />
          <span style={{ fontWeight: 700 }}>{formatRupee(item.price)}</span>
        </div>
      </div>
      {quantity > 0 ? (
        <QuantityStepper value={quantity} onChange={(next) => setQuantity(item.id, next)} />
      ) : (
        <button type="button" className="bite-button bite-button-primary" aria-label={`Add ${item.name}`} onClick={() => addItem(item)}>
          {label}
        </button>
      )}
    </article>
  );
}

export function MenuList({ groups }: { groups: { category: string; items: MenuItem[] }[] }) {
  const { profile } = usePersonalization();
  if (!profile) return null;
  function jump(category: string) {
    const reduce = profile?.motion.level === "reduced" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(`menu-${category}`)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }
  return (
    <section className="stack">
      <div className="menu-nav" data-density={profile.density}>
        {groups.map((group) => (
          <button key={group.category} type="button" onClick={() => jump(group.category)}>
            {group.category}
          </button>
        ))}
      </div>
      {groups.map((group) => (
        <div key={group.category} id={`menu-${group.category}`} className="stack">
          <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 700 }}>{group.category}</h2>
          <div>
            {group.items.map((item) => (
              <FoodItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
