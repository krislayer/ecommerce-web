"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, User } from "lucide-react";
import { toggleCart } from "@/store/slice/cartSlice";
import { AuthButton } from "./auth-button";
import type { RootState } from "@/store";

export function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="mac-navbar">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="mac-text-title-2 mac-text-primary hover:opacity-70 mac-transition-opacity"
          >
                ¡Qué Chulito!
              </Link>

          <div className="flex items-center gap-mac-md">
                <AuthButton />
                <div className="relative">
                  <button 
                    onClick={() => dispatch(toggleCart())}
                className="mac-touch-target flex items-center justify-center rounded-full hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors"
                aria-label="Carrito de compras"
                  >
                <ShoppingCart className="w-5 h-5 mac-text-primary" />
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
