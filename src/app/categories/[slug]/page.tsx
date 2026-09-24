import { getCategory, restaurantsByCategory } from "@/data";
import { RestaurantIndex } from "@/components/discovery/HomeView";
import { EmptyState } from "@/components/ui/bits";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) {
    return (
      <div className="page">
        <EmptyState title="Category not found" body="That category is not on Bite." action={{ href: "/categories", label: "View all categories" }} />
      </div>
    );
  }
  const list = restaurantsByCategory(slug);
  if (!list.length) {
    return (
      <div className="page">
        <EmptyState title={category.name} body="No restaurants in this category yet." action={{ href: "/restaurants", label: "Browse restaurants" }} />
      </div>
    );
  }
  return <RestaurantIndex title={category.name} restaurants={list} />;
}
