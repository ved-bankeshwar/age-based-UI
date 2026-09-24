import { categories } from "@/data";
import { CategoryIndex } from "@/components/discovery/SearchResults";

export default function CategoriesPage() {
  return <CategoryIndex categories={categories} />;
}
