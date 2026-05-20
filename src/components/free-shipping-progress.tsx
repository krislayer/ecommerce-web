"use client";

import { ShippingService } from "@/lib/services/shipping.service";

interface FreeShippingProgressProps {
  subtotal: number;
}

export function FreeShippingProgress({ subtotal }: FreeShippingProgressProps) {
  const calculation = ShippingService.calculateShipping(subtotal);
  const { isFreeShipping, remainingForFreeShipping, freeShippingThreshold } = calculation;
  const progressPercentage = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const message = isFreeShipping
    ? "¡Tu entrega a domicilio es totalmente gratis!"
    : `Agrega ${ShippingService.formatPrice(remainingForFreeShipping || 0)} para envío gratis`;

  return (
    <div className="space-y-2">
      <p className="text-xs text-black dark:text-white">{message}</p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
        <div
          className={`h-full rounded-full transition-all duration-300 ${isFreeShipping ? "bg-green-600" : "bg-blue-600"}`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <span>{ShippingService.formatPrice(0)}</span>
        <span>{ShippingService.formatPrice(freeShippingThreshold)}</span>
      </div>
    </div>
  );
}
