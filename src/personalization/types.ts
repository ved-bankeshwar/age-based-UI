export type AgeGroup = "young" | "adult" | "older";

export type PersonalizationSource = "manual" | "switcher";

export type Density = "high" | "medium" | "low";
export type MotionLevel = "full" | "normal" | "reduced";
export type ButtonLabelStyle = "short" | "standard" | "explicit";

export type RestaurantCardField =
  | "image"
  | "name"
  | "cuisine"
  | "rating"
  | "time"
  | "price"
  | "offer"
  | "veg";

export type NavItemId =
  | "home"
  | "explore"
  | "restaurants"
  | "offers"
  | "orders"
  | "profile"
  | "help";

export interface AgeBounds {
  min: number;
  max: number | null;
}

export interface UIProfile {
  id: AgeGroup;
  label: string;
  bounds: AgeBounds;
  typography: { basePx: number; lineHeight: number };
  density: Density;
  imageDensity: Density;
  navigation: {
    variant: "compact" | "standard" | "simplified";
    items: NavItemId[];
    iconWithLabel: boolean;
  };
  header: { variant: "compact" | "standard" | "simplified" };
  search: { size: "compact" | "standard" | "large"; explicitLabel: boolean };
  categories: { visibleCount: number };
  cards: {
    size: "compact" | "standard" | "large";
    restaurantFields: RestaurantCardField[];
    labeledFacts: boolean;
  };
  foodItem: { showDescription: boolean; imageSize: "sm" | "md" | "lg" };
  promotions: {
    maxBanners: number;
    showFlash: boolean;
    showTrending: boolean;
    showPopular: boolean;
  };
  homeRestaurants: { visibleCount: number };
  buttons: { labelStyle: ButtonLabelStyle; iconWithLabel: boolean };
  motion: { level: MotionLevel };
  contrast: "standard" | "high";
}

export type SubmitAgeResult =
  | { ok: true; ageGroup: AgeGroup }
  | { ok: false; reason: "invalid" | "underage" };

export interface StoredPersonalization {
  enteredAge: number | null;
  ageGroup: AgeGroup | null;
  source: PersonalizationSource | null;
}
