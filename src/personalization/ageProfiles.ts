import { ageBoundaries } from "./ageBoundaries";
import type { UIProfile } from "./types";

const youngFields = [
  "image",
  "name",
  "cuisine",
  "rating",
  "time",
  "price",
  "offer",
  "veg",
] as const;

const olderFields = ["image", "name", "cuisine", "rating", "time", "price", "veg"] as const;

export const ageProfiles: Record<UIProfile["id"], UIProfile> = {
  young: {
    id: "young",
    label: "Young",
    bounds: ageBoundaries.young,
    typography: { basePx: 16, lineHeight: 1.45 },
    density: "high",
    imageDensity: "high",
    navigation: {
      variant: "compact",
      items: ["home", "explore", "offers", "orders", "profile"],
      iconWithLabel: true,
    },
    header: { variant: "compact" },
    search: { size: "compact", explicitLabel: false },
    categories: { visibleCount: 9 },
    cards: { size: "compact", restaurantFields: [...youngFields], labeledFacts: false },
    foodItem: { showDescription: false, imageSize: "sm" },
    promotions: { maxBanners: 2, showFlash: true, showTrending: true, showPopular: true },
    homeRestaurants: { visibleCount: 8 },
    buttons: { labelStyle: "short", iconWithLabel: true },
    motion: { level: "full" },
    contrast: "standard",
  },
  adult: {
    id: "adult",
    label: "Adult",
    bounds: ageBoundaries.adult,
    typography: { basePx: 17, lineHeight: 1.5 },
    density: "medium",
    imageDensity: "medium",
    navigation: {
      variant: "standard",
      items: ["home", "restaurants", "offers", "orders", "profile"],
      iconWithLabel: true,
    },
    header: { variant: "standard" },
    search: { size: "standard", explicitLabel: false },
    categories: { visibleCount: 8 },
    cards: { size: "standard", restaurantFields: [...youngFields], labeledFacts: false },
    foodItem: { showDescription: true, imageSize: "md" },
    promotions: { maxBanners: 1, showFlash: false, showTrending: false, showPopular: true },
    homeRestaurants: { visibleCount: 6 },
    buttons: { labelStyle: "standard", iconWithLabel: true },
    motion: { level: "normal" },
    contrast: "standard",
  },
  older: {
    id: "older",
    label: "Older",
    bounds: ageBoundaries.older,
    typography: { basePx: 21, lineHeight: 1.55 },
    density: "low",
    imageDensity: "medium",
    navigation: {
      variant: "simplified",
      items: ["home", "restaurants", "orders", "help"],
      iconWithLabel: false,
    },
    header: { variant: "simplified" },
    search: { size: "large", explicitLabel: true },
    categories: { visibleCount: 5 },
    cards: { size: "large", restaurantFields: [...olderFields], labeledFacts: true },
    foodItem: { showDescription: true, imageSize: "lg" },
    promotions: { maxBanners: 0, showFlash: false, showTrending: false, showPopular: false },
    homeRestaurants: { visibleCount: 4 },
    buttons: { labelStyle: "explicit", iconWithLabel: true },
    motion: { level: "reduced" },
    contrast: "high",
  },
};

export const ageGroupOrder = ["young", "adult", "older"] as const;
