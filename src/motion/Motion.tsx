"use client";

import { usePersonalization } from "@/personalization/usePersonalization";

export function Motion({
  children,
  className,
  card = false,
}: {
  children: React.ReactNode;
  className?: string;
  card?: boolean;
}) {
  const { profile } = usePersonalization();
  const level = profile?.motion.level ?? "normal";
  if (level === "reduced") {
    return <div className={className}>{children}</div>;
  }
  return (
    <div className={`bite-motion ${className ?? ""}`} data-motion={level} data-card={card ? "true" : undefined}>
      {children}
    </div>
  );
}
