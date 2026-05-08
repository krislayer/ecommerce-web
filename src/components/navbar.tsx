"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { toggleCart } from "@/store/slice/cartSlice";
import { ThemeToggle } from "./theme-toggle";
import type { RootState } from "@/store";

export function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="mac-navbar backdrop-blur-xs backdrop-saturate-180 sticky top-0 z-100 border-b border-(--mac-separator) px-mac-md py-mac-md shadow-[0_1px_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_rgba(255,255,255,0.05)]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="mac-text-title-2 mac-text-primary hover:opacity-70 mac-transition-opacity"
          >
                ¡Qué Chulito!
              </Link>

          <div className="flex items-center gap-mac-md">
                <ThemeToggle />
                <div className="relative">
                  <button 
                    onClick={() => dispatch(toggleCart())}
                className="mac-touch-target flex items-center justify-center rounded-full hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors"
                aria-label="Carrito de compras"
                  >
                <ShoppingCart className="mac-icon-medium mac-text-primary" />
                  </button>
                  {itemCount > 0 && (
                <span className="mac-badge absolute -top-1 -right-1">
                      {itemCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
      </div>
    </nav>
  );
}
