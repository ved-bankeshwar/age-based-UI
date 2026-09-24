import { photo } from "./images";
import type { Category } from "./types";

export const categories: Category[] = [
  { id: "biryani", name: "Biryani", slug: "biryani", image: photo.biryani },
  { id: "pizza", name: "Pizza", slug: "pizza", image: photo.pizza },
  { id: "burgers", name: "Burgers", slug: "burgers", image: photo.burger },
  { id: "south-indian", name: "South Indian", slug: "south-indian", image: photo.dosa },
  { id: "chinese", name: "Chinese", slug: "chinese", image: photo.noodles },
  { id: "desserts", name: "Desserts", slug: "desserts", image: photo.dessert },
  { id: "beverages", name: "Beverages", slug: "beverages", image: photo.coffee },
  { id: "healthy", name: "Healthy", slug: "healthy", image: photo.salad },
  { id: "snacks", name: "Snacks", slug: "snacks", image: photo.samosa },
];
