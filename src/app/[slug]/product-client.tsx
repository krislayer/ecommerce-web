"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/slice/cartSlice";
import { setCartOpen } from "@/store/slice/cartSlice";
import Image from "next/image";
import type { Product, ProductVariant } from "@/lib/domain/entities/product";
import { LiquidGlassCard } from "@/components/liquid-glass-card";

interface ProductClientProps {
  product: Product;
}

export function ProductClient({ product }: ProductClientProps) {
  const dispatch = useDispatch();
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const tempVariant = {
      id: product.id,
      productId: product.id,
      attributes: selectedAttributes,
      price: product.price,
      stock: 10,
      sku: product.id,
      image: product.images[0],
    };

    dispatch(
      addItem({
        variant: tempVariant,
        quantity,
      })
    );
    dispatch(setCartOpen(true));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative z-10 fade-in">
      <LiquidGlassCard className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            {product.images.map((image, index) => (
              <div key={index} className="glass-secondary overflow-hidden">
                <Image
                  src={image}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-adaptive-primary">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-adaptive-primary">
                Q{product.price.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-adaptive-secondary">{product.description}</p>
            </div>

            {/* Variant Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-adaptive-primary">
                  Talla
                </label>
                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedAttributes({ ...selectedAttributes, talla: size })
                      }
                      className={`glass-button px-4 py-2 ${
                        selectedAttributes.talla === size
                          ? "bg-white/20"
                          : ""
                      }`}
                    >
                      <span className="text-adaptive-primary">{size}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-2 text-adaptive-primary">
                Cantidad
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="glass-button w-12 h-12 flex items-center justify-center"
                >
                  <span className="text-adaptive-primary">-</span>
                </button>
                <span className="text-lg font-medium text-adaptive-primary">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="glass-button w-12 h-12 flex items-center justify-center"
                >
                  <span className="text-adaptive-primary">+</span>
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full glass-button-primary py-4 px-6"
            >
              <span className="text-adaptive-primary text-lg font-medium">Agregar al Carrito</span>
            </button>
          </div>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
