"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";

export function DeleteItemButton({ onRemove }: { onRemove: () => void }) {
  return (
    <button
      type="button"
      aria-label="Eliminar producto del carrito"
      onClick={onRemove}
      className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500"
    >
      <XMarkIcon className="mx-[1px] h-4 w-4 text-white dark:text-black" />
    </button>
  );
}
