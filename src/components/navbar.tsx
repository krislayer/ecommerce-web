"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { toggleCart } from "@/store/slice/cartSlice";
import { ThemeToggle } from "./theme-toggle";
import { AuthButton } from "./auth-button";
import type { RootState } from "@/store";

export function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 glass-card mx-4 my-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-lg sm:text-xl font-bold text-adaptive-primary">
            ¡Qué Chulito!
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/catalogo" className="glass-button px-2 sm:px-4 py-2 hidden sm:inline-block">
              <span className="text-adaptive-primary text-sm sm:text-base">Catálogo</span>
            </Link>
            <AuthButton />
            <ThemeToggle />
            <button 
              onClick={() => dispatch(toggleCart())}
              className="glass-button-round relative"
            >
              <ShoppingCart className="w-6 h-6 text-adaptive-primary" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 glass-button-round w-5 h-5 flex items-center justify-center text-xs shadow-lg">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
