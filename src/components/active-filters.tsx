"use client";

import { X } from "lucide-react";
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
    <div className="glass-secondary p-4 mb-6">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-semibold text-adaptive-primary">Filtros activos:</span>
        {activeFilters.map((filter, index) => (
          <button
            key={index}
            onClick={() => onRemoveFilter(filter.type, filter.value)}
            className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition-colors"
          >
            <span>{filter.label}</span>
            <X className="w-3 h-3" />
          </button>
        ))}
        <button
          onClick={onClearAll}
          className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-medium ml-auto"
        >
          Limpiar todo
        </button>
      </div>
    </div>
  );
}
