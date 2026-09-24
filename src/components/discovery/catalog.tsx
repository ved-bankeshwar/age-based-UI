"use client";

import Link from "next/link";
import Image from "next/image";
import { usePersonalization } from "@/personalization/usePersonalization";
import { Motion } from "@/motion/Motion";
import { Badge, Rating, SectionHeading, VegMark } from "@/components/ui/bits";
import { formatDelivery, formatPriceForTwo, formatRupee } from "@/lib/format";
import type { Category, Offer, Restaurant } from "@/data";
import { getRestaurant } from "@/data";

export function CategoryCard({ category }: { category: Category }) {
  const { profile } = usePersonalization();
  return (
    <Motion card>
      <Link href={`/categories/${category.slug}`} className="bite-card category-card" data-density={profile?.density}>
        <div className="card-image">
          <Image src={category.image} alt="" fill className="object-cover" sizes="240px" />
        </div>
        <div className="card-body">
          <span className="category-name" style={{ fontWeight: 700, fontSize: "var(--text-md)" }}>{category.name}</span>
        </div>
      </Link>
    </Motion>
  );
}

export function CategoryList({ categories }: { categories: Category[] }) {
  const { profile } = usePersonalization();
  if (!profile) return null;
  const visible = categories.slice(0, profile.categories.visibleCount);
  const showAll = visible.length < categories.length;
  return (
    <section className="stack">
      <SectionHeading title="Categories" action={showAll ? { href: "/categories", label: "View all categories" } : undefined} />
      <div className="category-grid" data-density={profile.density}>
        {visible.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const { profile } = usePersonalization();
  if (!profile) return null;
  const labeled = profile.cards.labeledFacts;
  const fields = profile.cards.restaurantFields;
  return (
    <Motion card className="h-full">
      <Link href={`/restaurant/${restaurant.id}`} className="bite-card" data-labeled={labeled ? "true" : "false"} data-card-size={profile.cards.size}>
        {fields.includes("image") ? (
          <div className="card-image">
            <Image src={restaurant.image} alt="" fill className="object-cover" sizes="(max-width: 900px) 100vw, 280px" />
          </div>
        ) : null}
        <div className="card-body">
          {fields.includes("name") ? <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 700 }}>{restaurant.name}</h3> : null}
          {fields.includes("cuisine") ? <p className={labeled ? undefined : "muted"}>{restaurant.cuisines.join(" • ")}</p> : null}
          <div className="card-facts">
            {fields.includes("rating") ? <Rating value={restaurant.rating} labeled={labeled} /> : null}
            {fields.includes("time") ? <span>{labeled ? `Delivery ${formatDelivery(restaurant.deliveryMinutes)}` : formatDelivery(restaurant.deliveryMinutes)}</span> : null}
            {fields.includes("price") ? (
              <span>{labeled ? `Cost for two ${formatRupee(restaurant.priceForTwo)}` : formatPriceForTwo(restaurant.priceForTwo)}</span>
            ) : null}
            {fields.includes("offer") && restaurant.offer ? (labeled ? <span>Offer {restaurant.offer}</span> : <Badge>{restaurant.offer}</Badge>) : null}
            {fields.includes("veg") ? <VegMark veg={restaurant.veg} labeled={labeled} /> : null}
          </div>
        </div>
      </Link>
    </Motion>
  );
}

export function RestaurantGrid({ restaurants, showAll = false }: { restaurants: Restaurant[]; showAll?: boolean }) {
  const { profile } = usePersonalization();
  if (!profile) return null;
  const list = showAll ? restaurants : restaurants.slice(0, profile.homeRestaurants.visibleCount);
  return (
    <div className="restaurant-grid" data-density={profile.density}>
      {list.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

export function RestaurantSection({
  title,
  restaurants,
  action,
  showAll = false,
}: {
  title: string;
  restaurants: Restaurant[];
  action?: { href: string; label: string };
  showAll?: boolean;
}) {
  if (!restaurants.length) return null;
  return (
    <section className="stack">
      <SectionHeading title={title} action={action} />
      <RestaurantGrid restaurants={restaurants} showAll={showAll} />
    </section>
  );
}

export function PromoBanner({ offer }: { offer: Offer }) {
  const { profile } = usePersonalization();
  const showImage = profile?.imageDensity === "high";
  const restaurant = offer.restaurantIds?.length === 1 ? getRestaurant(offer.restaurantIds[0]) : null;
  const href = restaurant ? `/restaurant/${restaurant.id}` : "/offers";
  return (
    <Link href={href} className="bite-card promo" data-image={showImage && restaurant ? "true" : "false"}>
      {showImage && restaurant ? (
        <div className="card-image">
          <Image src={restaurant.image} alt="" fill className="object-cover" sizes="480px" />
        </div>
      ) : null}
      <div className="card-body">
        <Badge>{offer.code}</Badge>
        <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 700 }}>{offer.title}</h3>
        <p className="muted">{offer.detail}</p>
      </div>
    </Link>
  );
}

export function PromoStack({ offers }: { offers: Offer[] }) {
  const { profile } = usePersonalization();
  if (!profile || profile.promotions.maxBanners === 0) return null;
  const banners = offers.slice(0, profile.promotions.maxBanners);
  return (
    <section className="stack">
      {banners.map((offer) => (
        <PromoBanner key={offer.id} offer={offer} />
      ))}
      {profile.promotions.showFlash ? (
        <div className="chip-row" aria-label="Flash offers">
          {offers.map((offer) => (
            <Link key={offer.id} href="/offers">{offer.code}</Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
