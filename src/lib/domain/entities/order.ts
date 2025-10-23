export interface Order {
  id: string;
  userId?: string;
  guestInfo: {
    name: string;
    phone: string;
    email?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingMethod: ShippingMethod;
  status: OrderStatus;
  whatsappSent: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface OrderItem {
  productId: string;
  variantId: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  image?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface ShippingMethod {
  type: "pickup" | "local";
  address?: string;
  cost: number;
}

export interface Discount {
  code: string;
  type: "percent" | "amount";
  value: number;
  minPurchase?: number;
  active: boolean;
}

