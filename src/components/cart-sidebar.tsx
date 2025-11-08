"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
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

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center sm:justify-end p-mac-md">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => dispatch(setCartOpen(false))}
      />

      {/* Sidebar */}
      <div className="cart-sidebar relative w-full sm:w-96 h-full max-h-[90vh] flex flex-col backdrop-blur-[4px] backdrop-saturate-[180%] shadow-mac-lg rounded-mac-lg overflow-hidden border border-[var(--mac-separator)]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-mac-md border-b border-mac-separator shrink-0">
            <div className="flex items-center gap-mac-sm">
              <h2 className="mac-text-title-2 mac-text-primary">Carrito</h2>
              {items.length > 0 && (
                <span className="mac-text-footnote mac-text-secondary">
                  ({totalItems} {totalItems === 1 ? 'artículo' : 'artículos'})
                </span>
              )}
            </div>
            <button
              onClick={() => dispatch(setCartOpen(false))}
              className="mac-touch-target flex items-center justify-center rounded-full hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="mac-icon-medium mac-text-secondary" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-mac-md space-y-mac-md">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-mac-2xl">
                <ShoppingBag className="mac-icon-xlarge mac-text-tertiary mb-mac-md" />
                <p className="mac-text-subhead mac-text-secondary text-center mb-mac-md">
                  Tu carrito está vacío
                </p>
                <Link
                  href="/catalogo"
                  className="mac-button-secondary"
                  onClick={() => dispatch(setCartOpen(false))}
                >
                  <ShoppingBag className="mac-icon-small" />
                  Continuar comprando
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variant.id}
                  className="mac-card p-mac-md"
                >
                  <div className="flex gap-mac-md">
                    {item.variant.image && (
                      <Image
                        src={item.variant.image}
                        alt={item.variant.sku}
                        width={60}
                        height={60}
                        className="rounded-mac-sm object-cover bg-mac-gray-2"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="mac-text-footnote mac-text-primary font-medium truncate">
                        {item.variant.sku}
                      </p>
                      <p className="mac-text-footnote mac-text-secondary mt-mac-xs">
                        {ShippingService.formatPrice(item.variant.price)}
                      </p>
                      <div className="flex items-center gap-mac-sm mt-mac-sm">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.variant.id,
                                quantity: Math.max(1, item.quantity - 1),
                              })
                            )
                          }
                          className="mac-touch-target flex items-center justify-center rounded-mac-sm bg-mac-gray-2 dark:bg-mac-gray-6 hover:bg-mac-gray-3 dark:hover:bg-mac-gray-5 mac-transition-colors"
                        >
                          <Minus className="mac-icon-small mac-text-primary" />
                        </button>
                        <span className="mac-text-footnote mac-text-primary min-w-[24px] text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.variant.id,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          className="mac-touch-target flex items-center justify-center rounded-mac-sm bg-mac-gray-2 dark:bg-mac-gray-6 hover:bg-mac-gray-3 dark:hover:bg-mac-gray-5 mac-transition-colors"
                        >
                          <Plus className="mac-icon-small mac-text-primary" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(removeItem(item.variant.id))}
                      className="mac-touch-target flex items-center justify-center rounded-full hover:bg-mac-red/10 mac-transition-colors self-start"
                      aria-label="Eliminar item"
                    >
                      <Trash2 className="mac-icon-medium mac-text-secondary hover:text-mac-red mac-transition-colors" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-mac-md border-t border-mac-separator space-y-mac-md shrink-0">
              {/* Subtotal */}
              <div className="flex justify-between mac-text-title-3 mac-text-primary">
                <span>Subtotal:</span>
                <span>{ShippingService.formatPrice(subtotal)}</span>
              </div>
              
              {/* Botón Finalizar compra - CTA Principal */}
              <Link
                href="/checkout"
                className="mac-button-primary w-full text-center"
                onClick={() => dispatch(setCartOpen(false))}
              >
                Finalizar Compra
              </Link>
              
              {/* Botón Continuar comprando - Acción secundaria */}
              <Link
                href="/catalogo"
                className="mac-button-secondary w-full text-center"
                onClick={() => dispatch(setCartOpen(false))}
              >
                <ShoppingBag className="mac-icon-small" />
                Continuar comprando
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
