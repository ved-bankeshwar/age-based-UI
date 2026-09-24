import type { NavItemId } from "./types";

export interface NavItem {
  id: NavItemId;
  href: string;
  label: string;
  shortLabel: string;
  icon: "home" | "explore" | "restaurants" | "offers" | "orders" | "profile" | "help";
}

export const navigationCatalog: Record<NavItemId, NavItem> = {
  home: { id: "home", href: "/", label: "Home", shortLabel: "Home", icon: "home" },
  explore: { id: "explore", href: "/restaurants", label: "Explore", shortLabel: "Explore", icon: "explore" },
  restaurants: { id: "restaurants", href: "/restaurants", label: "Restaurants", shortLabel: "Food", icon: "restaurants" },
  offers: { id: "offers", href: "/offers", label: "Offers", shortLabel: "Offers", icon: "offers" },
  orders: { id: "orders", href: "/orders", label: "My Orders", shortLabel: "Orders", icon: "orders" },
  profile: { id: "profile", href: "/profile", label: "Profile", shortLabel: "Profile", icon: "profile" },
  help: { id: "help", href: "/help", label: "Help", shortLabel: "Help", icon: "help" },
};
