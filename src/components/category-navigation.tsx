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

  const categoryIcons: Record<string, React.ReactNode> = {
    "ropa-mujer": <User className="w-4 h-4 currentColor" />,
    "ropa-hombre": <Users className="w-4 h-4 currentColor" />,
    "ropa-niño": <Baby className="w-4 h-4 currentColor" />,
    "belleza": <Sparkles className="w-4 h-4 currentColor" />,
    "hogar": <Home className="w-4 h-4 currentColor" />,
    "tecnologia": <Smartphone className="w-4 h-4 currentColor" />,
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
        <Grid3X3 className="w-4 h-4 currentColor" />
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
