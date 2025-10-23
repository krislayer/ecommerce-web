"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setCartOpen, removeItem, updateQuantity } from "@/store/slice/cartSlice";
import type { RootState } from "@/store";
import Image from "next/image";

export function CartSidebar() {
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => dispatch(setCartOpen(false))}
      />

      {/* Sidebar */}
      <div className="relative w-full sm:w-96 h-full sm:h-auto sm:max-h-[90vh] glass-card flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <h2 className="text-xl font-bold text-adaptive-primary">Carrito</h2>
          <button
            onClick={() => dispatch(setCartOpen(false))}
            className="text-adaptive-tertiary hover:text-adaptive-primary transition-colors"
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {items.length === 0 ? (
            <p className="text-adaptive-secondary text-center py-8">
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
                  <p className="font-medium text-adaptive-primary">
                    {item.variant.sku}
                  </p>
                  <p className="text-sm text-adaptive-secondary">
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
                      <span className="text-adaptive-primary">-</span>
                    </button>
                    <span className="text-adaptive-primary">{item.quantity}</span>
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
                      <span className="text-adaptive-primary">+</span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeItem(item.variant.id))}
                  className="glass-button w-8 h-8 flex items-center justify-center"
                  aria-label="Eliminar item"
                >
                  <span className="text-adaptive-primary">🗑️</span>
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/20 p-4 space-y-4">
            <div className="flex justify-between text-lg font-bold text-adaptive-primary">
              <span>Total:</span>
              <span>Q{total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className="block w-full glass-button-primary py-3 px-6 text-center"
            >
              <span className="text-adaptive-primary font-medium">Finalizar Compra</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
