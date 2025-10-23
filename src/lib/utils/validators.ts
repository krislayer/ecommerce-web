import { z } from "zod";

export const guestCheckoutSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().regex(/^502\d{8}$/, "Teléfono debe tener formato 50212345678"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
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

