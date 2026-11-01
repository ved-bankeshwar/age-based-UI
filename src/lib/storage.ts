export const PERSONALIZATION_STORAGE_KEY = "bite.personalization.v1";
export const HARD_REFRESH_KEY = "bite.hardRefresh";
export const CART_STORAGE_KEY = "bite.cart.v1";
export const ORDERS_STORAGE_KEY = "bite.orders.v1";

export function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeKey(key: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}
