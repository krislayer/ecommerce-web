"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/slice/cartSlice";
import type { Product } from "@/lib/domain/entities/product";
import { productToCartVariant } from "@/lib/product/cart-variant";

export function AddToCartButton({ product, disabled }: { product: Product; disabled?: boolean }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      addItem({
        variant: productToCartVariant(product),
        quantity: 1,
      }),
    );
  };

  return (
    <button
      type="button"
      disabled={disabled || !product.active}
      onClick={handleClick}
      className={clsx(
        "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white",
        (!product.active || disabled) && "cursor-not-allowed opacity-60 hover:opacity-60",
        product.active && !disabled && "hover:opacity-90",
      )}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      {product.active ? "Agregar al carrito" : "Agotado"}
    </button>
  );
}
