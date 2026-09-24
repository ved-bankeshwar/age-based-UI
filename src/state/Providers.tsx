"use client";

import { CartProvider } from "./CartProvider";
import { OrderProvider } from "./OrderProvider";
import { PersonalizationProvider } from "@/personalization/PersonalizationProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PersonalizationProvider>
      <CartProvider>
        <OrderProvider>{children}</OrderProvider>
      </CartProvider>
    </PersonalizationProvider>
  );
}
