"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/slice/cartSlice";
import { setCartOpen } from "@/store/slice/cartSlice";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import type { Product } from "@/lib/domain/entities/product";

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
    <div className="min-h-screen mac-bg-grouped">
      <div className="max-w-7xl mx-auto px-mac-md py-mac-xl mac-fade-in">
        {/* Header */}
        <div className="mac-card text-center mb-mac-lg">
          <h1 className="mac-text-large-title mac-text-primary mb-mac-md">
            {product.name}
          </h1>
          <p className="mac-text-title-2 mac-text-primary">
            Q{product.price.toFixed(2)}
          </p>
        </div>

        {/* Product Details */}
        <div className="mac-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-mac-xl">
            {/* Images */}
            <div className="space-y-mac-md">
              {product.images.map((image, index) => (
                <div key={index} className="mac-card overflow-hidden p-0">
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
            <div className="space-y-mac-lg">
              <div>
                <p className="mac-text-body mac-text-secondary">{product.description}</p>
              </div>

              {/* Variant Selection */}
              <div className="space-y-mac-md">
                <div>
                  <label className="mac-text-subhead mac-text-primary mb-mac-sm block">
                    Talla
                  </label>
                  <div className="flex flex-wrap gap-mac-sm">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          setSelectedAttributes({ ...selectedAttributes, size: size })
                        }
                        className={`mac-chip ${
                          selectedAttributes.size === size
                            ? "selected"
                            : ""
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="mac-text-subhead mac-text-primary mb-mac-sm block">
                  Cantidad
                </label>
                <div className="flex items-center gap-mac-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="mac-touch-target flex items-center justify-center rounded-mac-sm bg-mac-gray-2 dark:bg-mac-gray-6 hover:bg-mac-gray-3 dark:hover:bg-mac-gray-5 mac-transition-colors"
                  >
                    <Minus className="mac-icon-medium mac-text-primary" />
                  </button>
                  <span className="mac-text-headline mac-text-primary min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="mac-touch-target flex items-center justify-center rounded-mac-sm bg-mac-gray-2 dark:bg-mac-gray-6 hover:bg-mac-gray-3 dark:hover:bg-mac-gray-5 mac-transition-colors"
                  >
                    <Plus className="mac-icon-medium mac-text-primary" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="mac-button-primary w-full"
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
