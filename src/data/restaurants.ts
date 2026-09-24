import { photo } from "./images";
import type { Restaurant } from "./types";

const area = "Indiranagar";

export const restaurants: Restaurant[] = [
  { id: "chennai-spice", name: "Chennai Spice", cuisines: ["South Indian", "Biryani"], categoryIds: ["south-indian", "biryani"], rating: 4.5, deliveryMinutes: [25, 30], priceForTwo: 250, offer: "20% OFF", veg: false, image: photo.biryani, area },
  { id: "dum-and-co", name: "Dum & Co.", cuisines: ["Biryani"], categoryIds: ["biryani"], rating: 4.4, deliveryMinutes: [30, 35], priceForTwo: 300, offer: "15% OFF", veg: false, image: photo.biryani2, area },
  { id: "oven-olive", name: "Oven & Olive", cuisines: ["Pizza"], categoryIds: ["pizza"], rating: 4.3, deliveryMinutes: [30, 35], priceForTwo: 400, veg: false, image: photo.pizza, area },
  { id: "milos-slice", name: "Milo's Slice", cuisines: ["Pizza"], categoryIds: ["pizza"], rating: 4.2, deliveryMinutes: [25, 30], priceForTwo: 350, offer: "10% OFF", veg: false, image: photo.pizza2, area },
  { id: "stackhouse", name: "Stackhouse", cuisines: ["Burgers"], categoryIds: ["burgers"], rating: 4.1, deliveryMinutes: [20, 25], priceForTwo: 300, veg: false, image: photo.burger, area },
  { id: "pearl-coast", name: "Pearl Coast", cuisines: ["South Indian"], categoryIds: ["south-indian"], rating: 4.6, deliveryMinutes: [20, 25], priceForTwo: 200, veg: true, image: photo.dosa, area },
  { id: "wok-street", name: "Wok Street", cuisines: ["Chinese"], categoryIds: ["chinese"], rating: 4.2, deliveryMinutes: [30, 40], priceForTwo: 350, offer: "20% OFF", veg: false, image: photo.noodles, area },
  { id: "night-market", name: "Night Market", cuisines: ["Chinese", "Snacks"], categoryIds: ["chinese", "snacks"], rating: 4.0, deliveryMinutes: [25, 35], priceForTwo: 280, veg: false, image: photo.momo, area },
  { id: "sugar-lane", name: "Sugar Lane", cuisines: ["Desserts"], categoryIds: ["desserts"], rating: 4.5, deliveryMinutes: [20, 25], priceForTwo: 220, veg: true, image: photo.dessert, area },
  { id: "filter-kaapi", name: "Filter Kaapi Co.", cuisines: ["Beverages"], categoryIds: ["beverages"], rating: 4.4, deliveryMinutes: [15, 20], priceForTwo: 150, veg: true, image: photo.coffee, area },
  { id: "green-bowl", name: "Green Bowl", cuisines: ["Healthy"], categoryIds: ["healthy"], rating: 4.3, deliveryMinutes: [25, 30], priceForTwo: 320, offer: "10% OFF", veg: true, image: photo.salad, area },
  { id: "tiffin-room", name: "Tiffin Room", cuisines: ["South Indian", "Snacks"], categoryIds: ["south-indian", "snacks"], rating: 4.6, deliveryMinutes: [20, 25], priceForTwo: 180, veg: true, image: photo.idli, area },
];
