"use client";

import Link from "next/link";
import { getRestaurant } from "@/data";
import type { PlacedOrder } from "@/data";
import { formatRupee, formatWhen } from "@/lib/format";
import { useOrders } from "@/state/OrderProvider";
import { usePersonalization } from "@/personalization/usePersonalization";
import { EmptyState, VegMark } from "@/components/ui/bits";

export function OrderCard({ order }: { order: PlacedOrder }) {
  const restaurant = getRestaurant(order.restaurantId);
  const count = order.lines.reduce((sum, line) => sum + line.quantity, 0);
  return (
    <Link href={`/orders/${order.id}`} className="bite-card card-body">
      <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700 }}>{restaurant?.name ?? "Restaurant"}</h2>
      <p className="muted">{formatWhen(order.createdAt)}</p>
      <p>{count} items · {formatRupee(order.total)}</p>
      <p style={{ fontWeight: 700 }}>{order.status}</p>
    </Link>
  );
}

export function OrderList() {
  const { orders, ready } = useOrders();
  if (!ready) return <div className="page" />;
  if (!orders.length) {
    return (
      <div className="page">
        <EmptyState title="No orders yet" body="Orders you place in this demo stay on this device." action={{ href: "/restaurants", label: "Browse restaurants" }} />
      </div>
    );
  }
  return (
    <div className="page stack">
      <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>My Orders</h1>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

export function OrderDetail({ id }: { id: string }) {
  const { getOrder, ready } = useOrders();
  const { profile } = usePersonalization();
  if (!ready || !profile) return <div className="page" />;
  const order = getOrder(id);
  if (!order) {
    return (
      <div className="page">
        <EmptyState title="Order not found" body="That order is not on this device." action={{ href: "/orders", label: "View orders" }} />
      </div>
    );
  }
  const restaurant = getRestaurant(order.restaurantId);
  return (
    <div className="page stack">
      <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>{restaurant?.name ?? "Order"}</h1>
      <p style={{ fontWeight: 700 }}>{order.status}</p>
      <p className="muted">{formatWhen(order.createdAt)}</p>
      <p>This is a demo order. Nothing will be delivered.</p>
      <div>
        {order.lines.map((line) => (
          <div key={line.itemId} className="food-row">
            <div className="food-copy">
              <p style={{ fontWeight: 700 }}>{line.name}</p>
              <VegMark veg={line.veg} labeled={profile.cards.labeledFacts} />
            </div>
            <p>{line.quantity} × {formatRupee(line.price)}</p>
          </div>
        ))}
      </div>
      <p style={{ fontWeight: 700 }}>To pay {formatRupee(order.total)}</p>
      <p>{order.addressLabel}</p>
    </div>
  );
}
