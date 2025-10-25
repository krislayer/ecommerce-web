"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, User } from "lucide-react";
import { toggleCart } from "@/store/slice/cartSlice";
import { AdvancedLiquidGlassCard } from "./advanced-liquid-glass-card";
import { AuthButton } from "./auth-button";
import type { RootState } from "@/store";

export function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-4 z-50 w-full">
      <div className="mx-4 my-4">
        <AdvancedLiquidGlassCard variant="hero">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-lg sm:text-xl font-bold text-white relative z-10">
                ¡Qué Chulito!
              </Link>

              <div className="flex items-center gap-2 sm:gap-4">
                <AuthButton />
                <div className="relative">
                  <button 
                    onClick={() => dispatch(toggleCart())}
                    className="glass-button-round relative"
                  >
                    <ShoppingCart className="w-6 h-6 text-white relative z-10" />
                  </button>
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full shadow-lg z-20">
                      {itemCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </AdvancedLiquidGlassCard>
      </div>
    </nav>
  );
}
