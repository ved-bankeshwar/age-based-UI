import type { NavItem } from "@/personalization/navigation";

export function Icon({ name }: { name: NavItem["icon"] | "search" | "cart" | "pin" | "plus" | "minus" }) {
  const paths: Record<string, string> = {
    home: "M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z",
    explore: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.5 5.5-1.4 4.2-4.2 1.4 1.4-4.2 4.2-1.4Z",
    restaurants: "M4 9h16v2H4V9Zm1 3h14v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7Zm3-7h2v3H8V5Zm6 0h2v3h-2V5Z",
    offers: "M4 8a2 2 0 0 1 2-2h6l8 8-6 6-8-8V8Zm4 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
    orders: "M7 3h10v2h3v16H4V5h3V3Zm2 2v2h6V5H9Zm0 6h6v2H9v-2Z",
    profile: "M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 0 1 14 0",
    help: "M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 13.2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm1.2-2.3-.4.3v.6h-1.6v-1.2l.2-.2c1.1-.8 1.6-1.2 1.6-2 0-.7-.5-1.1-1.2-1.1s-1.2.4-1.3 1.1H8.9A2.7 2.7 0 0 1 12 8.2c1.6 0 2.8 1 2.8 2.5 0 1.3-.8 2-1.6 2.6Z",
    search: "M10.5 4a6.5 6.5 0 1 0 4.1 11.5l4 4 1.4-1.4-4-4A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z",
    cart: "M6 6h15l-1.5 8H8L6 6Zm0 0 1-3H3M9 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
    pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Zm0-8.5A2.5 2.5 0 1 1 14.5 10 2.5 2.5 0 0 1 12 12.5Z",
    plus: "M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z",
    minus: "M5 11h14v2H5v-2Z",
  };
  return (
    <svg viewBox="0 0 24 24" width="1.15em" height="1.15em" aria-hidden="true">
      <path fill="currentColor" d={paths[name]} />
    </svg>
  );
}
