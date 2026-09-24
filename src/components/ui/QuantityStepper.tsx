"use client";

import { usePersonalization } from "@/personalization/usePersonalization";

export function QuantityStepper({ value, onChange }: { value: number; onChange: (next: number) => void }) {
  const { profile } = usePersonalization();
  const explicit = profile?.buttons.labelStyle === "explicit";
  return (
    <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
      <button type="button" className="bite-button bite-button-secondary" aria-label="Decrease quantity" onClick={() => onChange(value - 1)}>
        −{explicit ? <span>Decrease</span> : null}
      </button>
      <span style={{ minWidth: "1.5em", textAlign: "center", fontWeight: 700 }}>{value}</span>
      <button type="button" className="bite-button bite-button-secondary" aria-label="Increase quantity" onClick={() => onChange(value + 1)}>
        +{explicit ? <span>Increase</span> : null}
      </button>
    </div>
  );
}
