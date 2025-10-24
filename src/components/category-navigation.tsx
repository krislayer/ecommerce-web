"use client";

import { useState } from "react";
import { categories } from "@/lib/data/categories";
import { Shirt, Baby, Sparkles, Home, Smartphone, User, Users, Grid3X3 } from "lucide-react";

interface CategoryNavigationProps {
  selectedCategory?: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export function CategoryNavigation({ selectedCategory, onCategorySelect }: CategoryNavigationProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Mapeo de iconos para cada categoría
  const categoryIcons: Record<string, React.ReactNode> = {
    "ropa-mujer": <User className="w-4 h-4" />,
    "ropa-hombre": <Users className="w-4 h-4" />,
    "ropa-niño": <Baby className="w-4 h-4" />,
    "belleza": <Sparkles className="w-4 h-4" />,
    "hogar": <Home className="w-4 h-4" />,
    "tecnologia": <Smartphone className="w-4 h-4" />,
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {/* Botón "Todas las categorías" */}
        <button
          onClick={() => onCategorySelect(null)}
          className={`px-3 py-2 flex items-center gap-2 glass-button transition-colors ${
            !selectedCategory
              ? "bg-white/10 backdrop-blur-sm text-adaptive-primary"
              : "text-adaptive-secondary hover:text-adaptive-primary hover:bg-white/5"
          }`}
        >
          <Grid3X3 className="w-4 h-4" />
          <span className="text-sm font-medium">Todas las categorías</span>
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
            className={`px-3 py-2 flex items-center gap-2 glass-button transition-colors ${
              selectedCategory === category.id
                ? "bg-white/10 backdrop-blur-sm text-adaptive-primary"
                : "text-adaptive-secondary hover:text-adaptive-primary hover:bg-white/5"
            }`}
          >
            {icon}
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}
