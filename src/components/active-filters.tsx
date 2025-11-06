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

// Mapeo de traducción de keys de facetas a español para el frontend
const FACET_LABELS: Record<string, string> = {
  "size": "Talla",
  "color": "Color",
  "material": "Material",
  "type": "Tipo",
  "brand": "Marca",
  "skin-type": "Tipo de Piel",
  "gender": "Género",
  "connectivity": "Conectividad",
  "resistance": "Resistencia",
  "compatibility": "Compatibilidad",
  "category": "Categoría",
};

export function ActiveFilters({ filters, onRemoveFilter, onClearAll }: ActiveFiltersProps) {
  const activeFilters: Array<{ type: keyof FilterState; value: string; label: string }> = [];

  Object.entries(filters.facets).forEach(([facetKey, values]) => {
    values.forEach(value => {
      const facetLabel = FACET_LABELS[facetKey] || facetKey.replace(/_/g, " ");
      activeFilters.push({ 
        type: "facets", 
        value: `${facetKey}:${value}`, 
        label: `${facetLabel}: ${value}` 
      });
    });
  });
  
  if (filters.priceRange !== "all") {
    activeFilters.push({ type: "priceRange", value: filters.priceRange, label: PRICE_LABELS[filters.priceRange] });
  }

  if (activeFilters.length === 0) return null;

  return (
    <div className="mac-card mb-mac-md">
      <div className="flex items-center gap-mac-sm flex-wrap">
        <span className="mac-text-subhead font-semibold mac-text-primary">Filtros activos:</span>
        {activeFilters.map((filter, index) => (
          <button
            key={index}
            onClick={() => onRemoveFilter(filter.type, filter.value)}
            className="mac-chip flex items-center gap-mac-xs"
          >
            <span>{filter.label}</span>
            <X className="mac-icon-small currentColor" />
          </button>
        ))}
        <button
          onClick={onClearAll}
          className="mac-button-tertiary mac-text-caption-1 font-medium ml-auto"
          aria-label="Limpiar todos los filtros"
        >
          Limpiar todo
        </button>
      </div>
    </div>
  );
}
