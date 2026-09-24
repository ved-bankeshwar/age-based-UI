"use client";

import { usePersonalization } from "@/personalization/usePersonalization";

export function Button({
  variant,
  children,
  icon,
  type = "button",
  disabled,
  onClick,
}: {
  variant: "primary" | "secondary" | "quiet";
  children: React.ReactNode;
  icon?: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const { profile } = usePersonalization();
  const showIcon = profile?.buttons.iconWithLabel ?? true;
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`bite-button bite-button-${variant}`}>
      {showIcon ? icon : null}
      <span>{children}</span>
    </button>
  );
}
