"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getMenuItem } from "@/data";
import { useCart } from "@/state/CartProvider";
import { useOrders } from "@/state/OrderProvider";
import { EmptyState } from "@/components/ui/bits";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";

export function CheckoutForm() {
  const router = useRouter();
  const { lines, restaurantId, subtotal, clear, ready } = useCart();
  const { placeOrder } = useOrders();
  const [name, setName] = useState("Guest");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("100 Feet Road, Indiranagar, Bengaluru");
  const [error, setError] = useState("");

  if (!ready) return <div className="page" />;
  if (!lines.length || !restaurantId) {
    return (
      <div className="page">
        <EmptyState title="Nothing to check out" body="Your cart is empty." action={{ href: "/restaurants", label: "Browse restaurants" }} />
      </div>
    );
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim() || !/^\d{10}$/.test(phone.trim()) || !address.trim()) {
      setError("Enter your name, a 10-digit phone number, and an address.");
      return;
    }
    if (!restaurantId) return;
    const snapshots = lines.flatMap((line) => {
      const item = getMenuItem(line.itemId);
      if (!item) return [];
      return [{ itemId: item.id, name: item.name, price: item.price, quantity: line.quantity, veg: item.veg }];
    });
    const order = placeOrder({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      restaurantId,
      lines: snapshots,
      total: subtotal,
    });
    clear();
    router.push(`/orders/${order.id}`);
  }

  return (
    <form className="page stack" onSubmit={submit} style={{ maxWidth: 640 }}>
      <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>Checkout</h1>
      <p className="muted">This places a demo order on this device.</p>
      <TextField label="Name" value={name} onChange={setName} autoComplete="name" />
      <TextField label="Phone" value={phone} onChange={setPhone} inputMode="tel" autoComplete="tel" />
      <TextField label="Address" value={address} onChange={setAddress} autoComplete="street-address" />
      {error ? <p style={{ color: "var(--danger)" }}>{error}</p> : null}
      <Button variant="primary" type="submit">Place order</Button>
    </form>
  );
}
