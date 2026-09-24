import { categories } from "./categories";
import { menu } from "./menu";
import { restaurants } from "./restaurants";
import type { MenuItem, Restaurant } from "./types";

export { categories } from "./categories";
export { restaurants } from "./restaurants";
export { menu } from "./menu";
export { offers } from "./offers";
export { location } from "./location";
export type { Category, Restaurant, MenuItem, Offer, CartLine, PlacedOrder, PlacedOrderLine } from "./types";

const menuGroupOrder = ["Recommended", "Mains", "Breads", "Rice", "Snacks", "Desserts", "Beverages"];

export function getRestaurant(id: string) {
  return restaurants.find((restaurant) => restaurant.id === id) ?? null;
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug) ?? null;
}

export function getMenuItem(id: string) {
  return menu.find((item) => item.id === id) ?? null;
}

export function getMenu(restaurantId: string): { category: string; items: MenuItem[] }[] {
  const items = menu.filter((item) => item.restaurantId === restaurantId);
  const grouped = new Map<string, MenuItem[]>();
  for (const item of items) {
    const list = grouped.get(item.category) ?? [];
    list.push(item);
    grouped.set(item.category, list);
  }
  return [...grouped.keys()]
    .sort((a, b) => {
      const ai = menuGroupOrder.indexOf(a);
      const bi = menuGroupOrder.indexOf(b);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    })
    .map((category) => ({ category, items: grouped.get(category) ?? [] }));
}

export function restaurantsByCategory(slug: string): Restaurant[] {
  const category = getCategory(slug);
  if (!category) return [];
  return restaurants.filter((restaurant) => restaurant.categoryIds.includes(category.id));
}

export function searchCatalog(query: string): { restaurants: Restaurant[]; items: MenuItem[] } {
  const q = query.trim().toLowerCase();
  if (!q) return { restaurants: [], items: [] };
  const matchedCategoryIds = categories.filter((category) => category.name.toLowerCase().includes(q)).map((category) => category.id);
  return {
    restaurants: restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(q) ||
        restaurant.cuisines.some((cuisine) => cuisine.toLowerCase().includes(q)) ||
        restaurant.categoryIds.some((id) => matchedCategoryIds.includes(id)),
    ),
    items: menu.filter((item) => item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)),
  };
}

function byRating(list: Restaurant[]) {
  return [...list].sort((a, b) => b.rating - a.rating);
}

export function trendingRestaurants() {
  return byRating(restaurants).slice(0, 4);
}

export function popularRestaurants() {
  return byRating(restaurants).slice(4, 8);
}
