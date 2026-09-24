"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { usePersonalization } from "@/personalization/usePersonalization";

export function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const { profile } = usePersonalization();
  const [query, setQuery] = useState(initialQuery);
  const explicit = profile?.search.explicitLabel ?? false;

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next = query.trim();
    if (!next) return;
    router.push(`/search?q=${encodeURIComponent(next)}`);
  }

  return (
    <form onSubmit={submit} className="stack" style={{ gap: "var(--space-2)" }}>
      <label className="search-field">
        <span className={explicit ? undefined : "sr-only"} style={{ fontWeight: 700, display: explicit ? "block" : undefined, marginBottom: explicit ? "var(--space-2)" : undefined }}>
          Search for dishes or restaurants
        </span>
        <span className="search-field" style={{ display: "block" }}>
          <Icon name="search" />
          <input
            className="bite-input"
            value={query}
            placeholder="Search for dishes or restaurants"
            onChange={(event) => setQuery(event.target.value)}
          />
        </span>
      </label>
    </form>
  );
}
