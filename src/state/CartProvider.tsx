"use client";

import { useMemo, useReducer } from "react";
import { createContext, useContext, useEffect } from "react";
import { CART_STORAGE_KEY, readJson, writeJson } from "@/lib/storage";
import { getMenuItem } from "@/data";
import type { CartLine, MenuItem } from "@/data";

interface CartState {
  lines: CartLine[];
  pending: MenuItem | null;
  ready: boolean;
}

type CartAction =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; item: MenuItem }
  | { type: "quantity"; itemId: string; quantity: number }
  | { type: "confirm" }
  | { type: "cancel" }
  | { type: "clear" };

const CartContext = createContext<{
  lines: CartLine[];
  restaurantId: string | null;
  itemCount: number;
  subtotal: number;
  pendingReplace: MenuItem | null;
  ready: boolean;
  addItem: (item: MenuItem) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  confirmReplace: () => void;
  cancelReplace: () => void;
  clear: () => void;
} | null>(null);

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines, pending: null, ready: true };
    case "add": {
      const currentRestaurant = state.lines[0]?.restaurantId;
      if (currentRestaurant && currentRestaurant !== action.item.restaurantId) {
        return { ...state, pending: action.item };
      }
      const existing = state.lines.find((line) => line.itemId === action.item.id);
      const lines = existing
        ? state.lines.map((line) => (line.itemId === action.item.id ? { ...line, quantity: line.quantity + 1 } : line))
        : [...state.lines, { itemId: action.item.id, restaurantId: action.item.restaurantId, quantity: 1 }];
      return { ...state, lines, pending: null };
    }
    case "quantity": {
      const lines =
        action.quantity <= 0
          ? state.lines.filter((line) => line.itemId !== action.itemId)
          : state.lines.map((line) => (line.itemId === action.itemId ? { ...line, quantity: action.quantity } : line));
      return { ...state, lines };
    }
    case "confirm":
      if (!state.pending) return state;
      return {
        ready: state.ready,
        pending: null,
        lines: [{ itemId: state.pending.id, restaurantId: state.pending.restaurantId, quantity: 1 }],
      };
    case "cancel":
      return { ...state, pending: null };
    case "clear":
      return { ...state, lines: [], pending: null };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], pending: null, ready: false });

  useEffect(() => {
    const stored = readJson<{ lines: CartLine[] }>(CART_STORAGE_KEY);
    dispatch({ type: "hydrate", lines: stored?.lines ?? [] });
  }, []);

  useEffect(() => {
    if (!state.ready) return;
    writeJson(CART_STORAGE_KEY, { lines: state.lines });
  }, [state.lines, state.ready]);

  const value = useMemo(() => {
    const subtotal = state.lines.reduce((sum, line) => sum + (getMenuItem(line.itemId)?.price ?? 0) * line.quantity, 0);
    return {
      lines: state.lines,
      restaurantId: state.lines[0]?.restaurantId ?? null,
      itemCount: state.lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal,
      pendingReplace: state.pending,
      ready: state.ready,
      addItem: (item: MenuItem) => dispatch({ type: "add", item }),
      setQuantity: (itemId: string, quantity: number) => dispatch({ type: "quantity", itemId, quantity }),
      confirmReplace: () => dispatch({ type: "confirm" }),
      cancelReplace: () => dispatch({ type: "cancel" }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}
