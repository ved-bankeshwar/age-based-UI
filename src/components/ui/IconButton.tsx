"use client";

import Link from "next/link";
import { usePersonalization } from "@/personalization/usePersonalization";

export function IconButton({
  label,
  children,
  href,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const { profile } = usePersonalization();
  const showLabel = profile?.buttons.iconWithLabel ?? true;
  const className = "bite-button bite-button-secondary";
  const content = (
    <>
      {children}
      {showLabel ? <span>{label}</span> : <span className="sr-only">{label}</span>}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={className} aria-label={label}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={className} aria-label={label} onClick={onClick}>
      {content}
    </button>
  );
}
