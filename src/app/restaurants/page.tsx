import { restaurants } from "@/data";
import { RestaurantIndex } from "@/components/discovery/HomeView";

export default function RestaurantsPage() {
  return <RestaurantIndex title="Restaurants" restaurants={restaurants} />;
}
