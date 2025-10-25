"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { X, Trash2 } from "lucide-react";
import { setCartOpen, removeItem, updateQuantity } from "@/store/slice/cartSlice";
import type { RootState } from "@/store";
import Image from "next/image";
import { ShippingService } from "@/lib/services/shipping.service";

export function CartSidebar() {
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const subtotal = items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  const shippingCalculation = ShippingService.calculateShipping(subtotal);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-end p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => dispatch(setCartOpen(false))}
      />

      {/* Sidebar */}
      <div className="relative w-full sm:w-96 h-full flex flex-col">
        <div 
            className="relative text-white bg-black/20 border border-white/50 backdrop-blur-sm rounded-lg shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] hover:bg-black/30 hover:border-white/60 transition-all duration-200 before:content-[''] before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:content-[''] after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none pt-4 pb-4 pl-4 pr-4 flex flex-col h-full overflow-hidden"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between shrink-0 pb-2 mb-2">
              <h2 className="text-xl font-bold text-white">Carrito</h2>
              <button
                onClick={() => dispatch(setCartOpen(false))}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

          <div 
            className="flex-1 overflow-y-auto space-y-4 scrollbar-hide min-h-0" 
            style={{ 
              scrollBehavior: 'auto',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
              maxHeight: 'calc(100vh - 320px)'
            }}
          >
          {items.length === 0 ? (
            <p className="text-white/90 text-center py-8">
              Tu carrito está vacío
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.variant.id}
                className="flex gap-4 glass-secondary p-3"
              >
                {item.variant.image && (
                  <Image
                    src={item.variant.image}
                    alt={item.variant.sku}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium text-white">
                    {item.variant.sku}
                  </p>
                  <p className="text-sm text-white/90">
                    Q{item.variant.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.variant.id,
                            quantity: Math.max(1, item.quantity - 1),
                          })
                        )
                      }
                      className="glass-button w-8 h-8 flex items-center justify-center"
                    >
                      <span className="text-white relative z-10">-</span>
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.variant.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      className="glass-button w-8 h-8 flex items-center justify-center"
                    >
                      <span className="text-white relative z-10">+</span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeItem(item.variant.id))}
                  className="glass-button w-8 h-8 flex items-center justify-center"
                  aria-label="Eliminar item"
                >
                  <Trash2 className="w-4 h-4 text-white relative z-10" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-2 shrink-0 pt-6">
            {/* Desglose de precios */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/90">
                <span>Subtotal:</span>
                <span>{ShippingService.formatPrice(shippingCalculation.subtotal)}</span>
              </div>
              
              <div className="flex justify-between text-sm text-white/90">
                <span className="text-sm text-white/90">
                  Envío:
                </span>
                <span className="text-white/90">
                  {shippingCalculation.isFreeShipping ? "Gratis" : ShippingService.formatPrice(shippingCalculation.shippingCost)}
                </span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold text-white">
              <span>Total:</span>
              <span>{ShippingService.formatPrice(shippingCalculation.total)}</span>
            </div>
            
            {!shippingCalculation.isFreeShipping && shippingCalculation.remainingForFreeShipping && (
              <div className="text-center text-sm text-white/90 py-2">
                Agrega {ShippingService.formatPrice(shippingCalculation.remainingForFreeShipping)} más para envío gratis
              </div>
            )}
            
            {shippingCalculation.isFreeShipping && (
              <div className="text-center text-sm text-white/90 py-2">
                ¡Felicitaciones! Tienes envío gratis
              </div>
            )}
            
            <Link
              href="/checkout"
              className="block w-full glass-button-primary py-3 px-6 text-center"
              onClick={() => dispatch(setCartOpen(false))}
            >
              <span className="text-white font-medium relative z-10">Finalizar Compra</span>
            </Link>
          </div>
         )}
         </div>
         </div>
      </div>
    </div>
  );
}
