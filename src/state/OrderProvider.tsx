"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ORDERS_STORAGE_KEY, readJson, writeJson } from "@/lib/storage";
import type { PlacedOrder } from "@/data";

interface PlaceOrderInput {
  name: string;
  phone: string;
  address: string;
  restaurantId: string;
  lines: PlacedOrder["lines"];
  total: number;
}

const OrderContext = createContext<{
  orders: PlacedOrder[];
  ready: boolean;
  placeOrder: (input: PlaceOrderInput) => PlacedOrder;
  getOrder: (id: string) => PlacedOrder | null;
} | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<PlacedOrder[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrders(readJson<PlacedOrder[]>(ORDERS_STORAGE_KEY) ?? []);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeJson(ORDERS_STORAGE_KEY, orders);
  }, [orders, ready]);

  const value = useMemo(
    () => ({
      orders,
      ready,
      placeOrder: (input: PlaceOrderInput) => {
        const order: PlacedOrder = {
          id: `B${Date.now().toString(36).toUpperCase()}`,
          createdAt: new Date().toISOString(),
          restaurantId: input.restaurantId,
          lines: input.lines,
          total: input.total,
          status: "Placed",
          addressLabel: input.address.trim(),
        };
        setOrders((current) => [order, ...current]);
        return order;
      },
      getOrder: (id: string) => orders.find((order) => order.id === id) ?? null,
    }),
    [orders, ready],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  const value = useContext(OrderContext);
  if (!value) throw new Error("useOrders must be used within OrderProvider");
  return value;
}
