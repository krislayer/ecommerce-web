"use client";

import Image from "next/image";
import Link from "next/link";
import { productPath } from "@/lib/paths";
import Price from "@/components/price";
import type { CartItem } from "@/store/slice/cartSlice";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";

type CartLineItemProps = {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
  onNavigate?: () => void;
  showQuantityControls?: boolean;
};

/** Línea de carrito — clases idénticas a vercel/commerce cart/modal.tsx */
export function CartLineItem({
  item,
  onRemove,
  onUpdateQuantity,
  onNavigate,
  showQuantityControls = true,
}: CartLineItemProps) {
  const title = item.variant.name ?? item.variant.productId;
  const image = item.variant.image;
  const href = productPath(item.variant.productId);

  return (
    <li className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700">
      <div className="relative flex w-full flex-row justify-between px-1 py-4">
        <div className="absolute z-40 -ml-1 -mt-2">
          <DeleteItemButton onRemove={onRemove} />
        </div>
        <div className="flex flex-row">
          <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
            {image ? (
              <Image
                className="h-full w-full object-cover"
                width={64}
                height={64}
                alt={title}
                src={image}
              />
            ) : null}
          </div>
          <Link href={href} onClick={onNavigate} className="z-30 ml-2 flex flex-row space-x-4">
            <div className="flex flex-1 flex-col text-base">
              <span className="leading-tight">{title}</span>
            </div>
          </Link>
        </div>
        <div className="flex h-16 flex-col justify-between">
          <Price
            amount={item.variant.price * item.quantity}
            className="flex justify-end space-y-2 text-right text-sm"
          />
          {showQuantityControls ? (
            <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
              <EditItemQuantityButton
                type="minus"
                onClick={() => {
                  if (item.quantity <= 1) onRemove();
                  else onUpdateQuantity(item.quantity - 1);
                }}
              />
              <p className="w-6 text-center">
                <span className="w-full text-sm">{item.quantity}</span>
              </p>
              <EditItemQuantityButton type="plus" onClick={() => onUpdateQuantity(item.quantity + 1)} />
            </div>
          ) : (
            <p className="ml-auto text-right text-sm text-neutral-500">×{item.quantity}</p>
          )}
        </div>
      </div>
    </li>
  );
}
