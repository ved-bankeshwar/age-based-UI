import { categories, offers, restaurants } from "@/data";
import { HomeView } from "@/components/discovery/HomeView";

export default function HomePage() {
  return <HomeView categories={categories} restaurants={restaurants} offers={offers} />;
}
