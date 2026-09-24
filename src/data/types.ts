export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisines: string[];
  categoryIds: string[];
  rating: number;
  deliveryMinutes: [number, number];
  priceForTwo: number;
  offer?: string;
  veg: boolean;
  image: string;
  area: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  category: string;
  name: string;
  description: string;
  price: number;
  veg: boolean;
  image: string;
}

export interface Offer {
  id: string;
  title: string;
  detail: string;
  code: string;
  restaurantIds?: string[];
}

export interface CartLine {
  itemId: string;
  restaurantId: string;
  quantity: number;
}

export interface PlacedOrderLine {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  veg: boolean;
}

export interface PlacedOrder {
  id: string;
  createdAt: string;
  restaurantId: string;
  lines: PlacedOrderLine[];
  total: number;
  status: "Placed";
  addressLabel: string;
}
