"use client";

import Link from "next/link";
import { popularRestaurants, trendingRestaurants } from "@/data";
import type { Category, Offer, Restaurant } from "@/data";
import { usePersonalization } from "@/personalization/usePersonalization";
import { SearchBar } from "./SearchBar";
import { CategoryList, PromoStack, RestaurantSection } from "./catalog";

export function HeroSearch() {
  const { profile } = usePersonalization();
  return (
    <section className="home-band home-band-accent stack">
      <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>What are you craving today?</h1>
      <SearchBar />
      {profile?.density === "high" ? (
        <div className="chip-row">
          {["Biryani", "Pizza", "Burgers", "South Indian", "Chinese"].map((name) => (
            <Link key={name} href={`/categories/${name.toLowerCase().replace(" ", "-")}`}>{name}</Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function HomeView({
  categories,
  restaurants,
  offers,
}: {
  categories: Category[];
  restaurants: Restaurant[];
  offers: Offer[];
}) {
  const { profile } = usePersonalization();
  if (!profile) return null;
  const shown = new Set<string>();
  const trending = profile.promotions.showTrending ? trendingRestaurants().slice(0, profile.homeRestaurants.visibleCount) : [];
  trending.forEach((restaurant) => shown.add(restaurant.id));
  const popular = profile.promotions.showPopular
    ? popularRestaurants().filter((restaurant) => !shown.has(restaurant.id)).slice(0, profile.homeRestaurants.visibleCount)
    : [];
  popular.forEach((restaurant) => shown.add(restaurant.id));
  const rest = restaurants.filter((restaurant) => !shown.has(restaurant.id));
  const homeList = (rest.length ? rest : restaurants).slice(0, profile.homeRestaurants.visibleCount);

  return (
    <div className="page stack-lg">
      <HeroSearch />
      <div className="home-band home-band-surface">
        <CategoryList categories={categories} />
      </div>
      <div className="home-band home-band-soft">
        {profile.promotions.maxBanners === 0 ? (
          <Link href="/offers" className="bite-button bite-button-secondary" style={{ alignSelf: "flex-start" }}>View offers</Link>
        ) : (
          <PromoStack offers={offers} />
        )}
      </div>
      {profile.promotions.showTrending ? (
        <div className="home-band home-band-surface">
          <RestaurantSection title="Trending today" restaurants={trending} />
        </div>
      ) : null}
      {profile.promotions.showPopular ? (
        <div className="home-band home-band-surface">
          <RestaurantSection title="Popular near you" restaurants={popular} />
        </div>
      ) : null}
      <div className="home-band home-band-surface">
        <RestaurantSection title="Restaurants" restaurants={homeList} action={{ href: "/restaurants", label: "All restaurants" }} />
      </div>
    </div>
  );
}

export function RestaurantIndex({ title, restaurants }: { title: string; restaurants: Restaurant[] }) {
  return (
    <div className="page stack">
      <RestaurantSection title={title} restaurants={restaurants} showAll />
    </div>
  );
}
