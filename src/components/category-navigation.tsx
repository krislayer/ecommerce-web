"use client";

import { useState } from "react";
import { categories } from "@/lib/data/categories";
import { Shirt, Home, Smartphone, Grid3X3, Handbag, ToyBrick, Smile } from "lucide-react";

interface CategoryNavigationProps {
  selectedCategory?: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export function CategoryNavigation({ selectedCategory, onCategorySelect }: CategoryNavigationProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Íconos mejorados según Apple HIG - Más representativos y claros
  // Según SF Symbols y Apple HIG, los íconos deben ser:
  // - Claros y reconocibles
  // - Simples (sin detalles excesivos)
  // - Consistentes en peso visual
  // - Diferenciados entre categorías
  const categoryIcons: Record<string, React.ReactNode> = {
    // Mujer: Handbag representa moda femenina de manera distintiva
    // Más específico y reconocible para categoría femenina, no se confunde con favoritos
    "woman": <Handbag className="mac-icon-small currentColor" />,
    
    // Hombre: Shirt es más asociado con ropa masculina/formal
    // Claramente diferenciado de Handbag para mujer según SF Symbols
    "men": <Shirt className="mac-icon-small currentColor" />,
    
    // Niño: ToyBrick representa "kids" (juguetes/niños)
    // Más apropiado para categoría de ropa infantil según Apple HIG
    "kids": <ToyBrick className="mac-icon-small currentColor" />,
    
    // Belleza: Smile representa labios/lips para make up y cosméticos
    // Más directo y reconocible para productos de belleza según Apple HIG
    "beauty": <Smile className="mac-icon-small currentColor" />,
    
    // Hogar y Tecnología: Ya están bien según Apple HIG
    "home": <Home className="mac-icon-small currentColor" />,
    "technology": <Smartphone className="mac-icon-small currentColor" />,
  };

  return (
    <div className="flex flex-wrap gap-mac-sm">
      {/* Botón "Todas las categorías" */}
      <button
        onClick={() => onCategorySelect(null)}
        className={`mac-chip flex items-center gap-mac-sm ${
          !selectedCategory
            ? "selected"
            : ""
        }`}
      >
        <Grid3X3 className="mac-icon-small currentColor" />
        <span className="mac-text-subhead font-medium">Todas las categorías</span>
      </button>

      {/* Categorías */}
      {categories.map((category) => {
        const icon = categoryIcons[category.id];
        return (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            className={`mac-chip flex items-center gap-mac-sm ${
              selectedCategory === category.id
                ? "selected"
                : ""
            }`}
          >
            {icon}
            <span className="mac-text-subhead font-medium">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}
