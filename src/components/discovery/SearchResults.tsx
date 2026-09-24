"use client";

import { usePersonalization } from "@/personalization/usePersonalization";
import { EmptyState, SectionHeading } from "@/components/ui/bits";
import { FoodItem } from "@/components/restaurant/Menu";
import type { Category, MenuItem, Restaurant } from "@/data";
import { SearchBar } from "./SearchBar";
import { CategoryCard, RestaurantSection } from "./catalog";

export function SearchResults({
  query,
  restaurants,
  items,
}: {
  query: string;
  restaurants: Restaurant[];
  items: MenuItem[];
}) {
  return (
    <div className="page stack-lg">
      <SearchBar initialQuery={query} />
      {!query ? <EmptyState title="Search Bite" body="Search for dishes or restaurants." /> : null}
      {query && !restaurants.length && !items.length ? (
        <EmptyState title="No matches" body={`Nothing matched “${query}”.`} action={{ href: "/restaurants", label: "Browse restaurants" }} />
      ) : null}
      {restaurants.length ? <RestaurantSection title="Restaurants" restaurants={restaurants} showAll /> : null}
      {items.length ? (
        <section className="stack">
          <SectionHeading title="Dishes" />
          <div>
            {items.map((item) => (
              <FoodItem key={item.id} item={item} layout="result" />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export function CategoryIndex({ categories }: { categories: Category[] }) {
  const { profile } = usePersonalization();
  if (!profile) return null;
  return (
    <div className="page stack">
      <SectionHeading title="All categories" />
      <div className="category-grid" data-density={profile.density}>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
