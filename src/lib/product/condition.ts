import type { Product } from "@/lib/domain/entities/product";

const CONDITION_LABELS: Record<Product["condition"], string> = {
  new: "Nuevo",
  used: "Seminuevo",
};

export function formatProductCondition(condition: Product["condition"]): string {
  return CONDITION_LABELS[condition];
}
