"use client";

import { ShippingService } from "@/lib/services/shipping.service";

interface FreeShippingProgressProps {
  subtotal: number;
}

/**
 * Componente de progreso hacia envío gratis
 * Diseñado siguiendo Apple Human Interface Guidelines
 * 
 * Apple HIG: Los indicadores de progreso deben ser claros, simples y usar
 * colores del sistema de manera apropiada. El azul se usa para progreso positivo,
 * el verde para éxito completado.
 */
export function FreeShippingProgress({ subtotal }: FreeShippingProgressProps) {
  const calculation = ShippingService.calculateShipping(subtotal);
  const { isFreeShipping, remainingForFreeShipping, freeShippingThreshold } = calculation;

  // Calcular el porcentaje de progreso
  const progressPercentage = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  // Determinar el mensaje según el estado
  const message = isFreeShipping 
    ? "¡Tu envío es totalmente gratis!"
    : `Faltan ${ShippingService.formatPrice(remainingForFreeShipping || 0)} para que tu envío sea gratis!`;

  // Apple HIG: Usar azul para progreso positivo, verde solo cuando está completo
  // El rojo se reserva para errores/alertas, no para progreso
  const progressColor = isFreeShipping ? 'var(--mac-green)' : 'var(--mac-blue)';

  return (
    <div className="flex flex-col gap-mac-sm">
      {/* Mensaje superior - Apple HIG: Usar tipografía apropiada para información secundaria */}
      <p className="mac-text-footnote mac-text-primary text-center">
        {message}
      </p>

      {/* Barra de progreso - Apple HIG: Diseño simple y claro */}
      <div className="relative w-full">
        {/* Fondo de la barra - Apple HIG: Usar colores sutiles del sistema */}
        <div 
          className="w-full rounded-full relative overflow-visible"
          style={{ 
            backgroundColor: 'var(--mac-gray-2)',
            height: '6px', // Balance entre visibilidad y sutileza según Apple HIG
          }}
        >
          {/* Barra de progreso rellena - Transición suave según Apple HIG */}
          <div
            className="h-full rounded-full relative transition-all duration-300 ease-out"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: progressColor,
            }}
          >
            {/* Indicador al final - Apple HIG: Sutil y discreto, solo cuando hay progreso */}
            {progressPercentage > 0 && (
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full"
                style={{ 
                  backgroundColor: progressColor,
                  width: '12px',
                  height: '12px',
                  border: '2px solid var(--mac-secondary-grouped-background)',
                }}
              />
            )}
          </div>
        </div>

        {/* Etiquetas inferiores - Apple HIG: Información secundaria con tipografía pequeña */}
        <div className="flex justify-between mt-mac-sm">
          <span className="mac-text-caption-1 mac-text-secondary">
            Q 0
          </span>
          <span className="mac-text-caption-1 mac-text-secondary">
            Q {freeShippingThreshold}
          </span>
        </div>
      </div>
    </div>
  );
}

