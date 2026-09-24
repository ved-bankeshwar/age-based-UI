import { searchCatalog } from "@/data";
import { SearchResults } from "@/components/discovery/SearchResults";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const params = await searchParams;
  const raw = params.q;
  const query = typeof raw === "string" ? raw : "";
  const results = searchCatalog(query);
  return <SearchResults query={query} restaurants={results.restaurants} items={results.items} />;
}
