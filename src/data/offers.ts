import type { Offer } from "./types";

export const offers: Offer[] = [
  { id: "bite20", title: "20% off up to ₹100", detail: "At Chennai Spice and Wok Street", code: "BITE20", restaurantIds: ["chennai-spice", "wok-street"] },
  { id: "bite15", title: "15% off biryani", detail: "At Dum & Co.", code: "BITE15", restaurantIds: ["dum-and-co"] },
  { id: "bite10", title: "10% off", detail: "At Milo's Slice and Green Bowl", code: "BITE10", restaurantIds: ["milos-slice", "green-bowl"] },
  { id: "welcome", title: "₹50 off on ₹299+", detail: "Across Bite kitchens", code: "WELCOME" },
];
