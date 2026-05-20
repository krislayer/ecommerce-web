"use client";

import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Price from "@/components/price";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { removeItem, setCartOpen, updateQuantity } from "@/store/slice/cartSlice";
import { iconControlClassName, iconControlGlyphClassName } from "@/lib/ui/icon-control";
import { CartLineItem } from "./cart-line-item";
import OpenCart from "./open-cart";

function CloseCart({ className }: { className?: string }) {
  return (
    <div className={iconControlClassName}>
      <XMarkIcon className={clsx(iconControlGlyphClassName, "h-6 w-6", className)} />
    </div>
  );
}

export default function CartModal() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
  const quantityRef = useRef<number | null>(null);

  const openCart = () => dispatch(setCartOpen(true));
  const closeCart = () => dispatch(setCartOpen(false));

  useEffect(() => {
    if (quantityRef.current === null) {
      quantityRef.current = quantity;
      return;
    }

    if (quantity > quantityRef.current && quantity > 0 && !isOpen) {
      dispatch(setCartOpen(true));
    }

    quantityRef.current = quantity;
  }, [quantity, isOpen, dispatch]);

  return (
    <>
      <button type="button" aria-label="Abrir carrito" onClick={openCart}>
        <OpenCart quantity={quantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Carrito</p>
                <button type="button" aria-label="Cerrar carrito" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!items.length ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">Tu carrito está vacío.</p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="grow overflow-auto py-4">
                    {[...items]
                      .sort((a, b) =>
                        (a.variant.name ?? a.variant.productId).localeCompare(
                          b.variant.name ?? b.variant.productId,
                        ),
                      )
                      .map((item) => (
                        <CartLineItem
                          key={item.variant.id}
                          item={item}
                          onNavigate={closeCart}
                          onRemove={() => dispatch(removeItem(item.variant.id))}
                          onUpdateQuantity={(qty) =>
                            dispatch(updateQuantity({ id: item.variant.id, quantity: qty }))
                          }
                        />
                      ))}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      <p>Subtotal</p>
                      <Price amount={subtotal} className="text-right text-base text-black dark:text-white" />
                    </div>
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                    >
                      Finalizar compra
                    </Link>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
