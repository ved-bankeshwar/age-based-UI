import { getMenu, getRestaurant } from "@/data";
import { MenuList, RestaurantHero } from "@/components/restaurant/Menu";
import { EmptyState } from "@/components/ui/bits";

export default async function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const restaurant = getRestaurant(id);
  if (!restaurant) {
    return (
      <div className="page">
        <EmptyState title="Restaurant not found" body="That kitchen is not on Bite." action={{ href: "/restaurants", label: "Browse restaurants" }} />
      </div>
    );
  }
  return (
    <div className="page stack-lg">
      <RestaurantHero restaurant={restaurant} />
      <MenuList groups={getMenu(restaurant.id)} />
    </div>
  );
}
