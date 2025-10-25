"use client";

import { X } from "lucide-react";
import { AdvancedLiquidGlassCard } from "./advanced-liquid-glass-card";
import { FilterState } from "./product-filters";

interface ActiveFiltersProps {
  filters: FilterState;
  onRemoveFilter: (type: keyof FilterState, value: string) => void;
  onClearAll: () => void;
}

const PRICE_LABELS: Record<string, string> = {
  "all": "Todos",
  "0-150": "Q0 - Q150",
  "150-300": "Q150 - Q300",
  "300-500": "Q300 - Q500",
  "500-1000": "Q500 - Q1000",
  "1000+": "Q1000+",
};

export function ActiveFilters({ filters, onRemoveFilter, onClearAll }: ActiveFiltersProps) {
  const activeFilters: Array<{ type: keyof FilterState; value: string; label: string }> = [];

  // Agregar filtros de facetas dinámicas
  Object.entries(filters.facets).forEach(([facetKey, values]) => {
    values.forEach(value => {
      activeFilters.push({ 
        type: "facets", 
        value: `${facetKey}:${value}`, 
        label: `${facetKey}: ${value}` 
      });
    });
  });
  
  if (filters.priceRange !== "all") {
    activeFilters.push({ type: "priceRange", value: filters.priceRange, label: PRICE_LABELS[filters.priceRange] });
  }

  if (activeFilters.length === 0) return null;

  return (
    <AdvancedLiquidGlassCard variant="hero" className="mb-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-semibold text-white">Filtros activos:</span>
        {activeFilters.map((filter, index) => (
          <button
            key={index}
            onClick={() => onRemoveFilter(filter.type, filter.value)}
            className="flex items-center gap-1 px-3 py-1 glass-button text-white rounded-full text-sm hover-button"
          >
            <span className="relative z-10">{filter.label}</span>
            <X className="w-3 h-3 relative z-10" />
          </button>
        ))}
        <button
          onClick={onClearAll}
          className="text-sm text-white/90 hover:text-white hover:underline font-medium ml-auto hover-link"
        >
          Limpiar todo
        </button>
      </div>
    </AdvancedLiquidGlassCard>
  );
}
