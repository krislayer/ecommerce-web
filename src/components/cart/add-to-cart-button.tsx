"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/slice/cartSlice";
import type { Product } from "@/lib/domain/entities/product";

export function AddToCartButton({ product, disabled }: { product: Product; disabled?: boolean }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      addItem({
        variant: {
          id: `${product.id}-default`,
          productId: product.id,
          sku: product.id,
          name: product.name,
          price: product.price,
          stock: 10,
          attributes: product.attrs,
          image: product.images[0],
        },
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
