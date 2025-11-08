import { z } from "zod";

export const guestCheckoutSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  shippingMethod: z.enum(["pickup", "local"]),
  address: z.string().optional(),
});

export const orderItemSchema = z.object({
  productId: z.string(),
  variantId: z.string(),
  name: z.string(),
  sku: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  image: z.string().optional(),
});

export type GuestCheckoutForm = z.infer<typeof guestCheckoutSchema>;
export type OrderItemForm = z.infer<typeof orderItemSchema>;

