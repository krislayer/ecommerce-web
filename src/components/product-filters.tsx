"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import type { FacetDefinition } from "@/lib/domain/entities/product";

export interface FilterState {
  facets: Record<string, string[]>;
  priceRange: string;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableFacets: FacetDefinition[];
  facetCounts?: Record<string, Record<string, number>>;
  onRemoveFilter?: (type: keyof FilterState, value: string) => void;
}

const PRICE_RANGES = [
  { value: "all", label: "Todos" },
  { value: "0-150", label: "Q0 - Q150" },
  { value: "150-300", label: "Q150 - Q300" },
  { value: "300-500", label: "Q300 - Q500" },
  { value: "500-1000", label: "Q500 - Q1000" },
  { value: "1000+", label: "Q1000+" },
];

const PRICE_LABELS: Record<string, string> = {
  "all": "Todos",
  "0-150": "Q0 - Q150",
  "150-300": "Q150 - Q300",
  "300-500": "Q300 - Q500",
  "500-1000": "Q500 - Q1000",
  "1000+": "Q1000+",
};

export function ProductFilters({ filters, onFiltersChange, availableFacets, facetCounts, onRemoveFilter }: ProductFiltersProps) {
  // Solo precio y categoría expandidos por defecto (mejores prácticas)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    precio: true,
    categoria: true,
  });

  // Estado para mostrar todas las opciones en cada filtro
  const [showAllOptions, setShowAllOptions] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const toggleShowAll = (facetKey: string) => {
    setShowAllOptions(prev => ({
      ...prev,
      [facetKey]: !prev[facetKey]
    }));
  };

  const toggleFacet = (facetKey: string, value: string) => {
    const currentValues = filters.facets[facetKey] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFiltersChange({
      ...filters,
      facets: { ...filters.facets, [facetKey]: newValues },
    });
  };

  const handlePriceChange = (range: string) => {
    onFiltersChange({ ...filters, priceRange: range });
  };

  const clearFilters = () => {
    onFiltersChange({
      facets: {},
      priceRange: "all",
    });
  };

  const hasActiveFilters = 
    Object.keys(filters.facets).length > 0 ||
    filters.priceRange !== "all";

  // Construir lista de filtros activos
  const activeFilters: Array<{ type: keyof FilterState; value: string; label: string }> = [];
  
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
    activeFilters.push({ 
      type: "priceRange", 
      value: filters.priceRange, 
      label: PRICE_LABELS[filters.priceRange] 
    });
  }

  return (
    <div className="glass-card p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/20">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-adaptive-primary">Filtros</h2>
          {hasActiveFilters && (
            <span className="glass-secondary text-adaptive-primary text-xs px-2 py-1 rounded-full font-medium">
              {activeFilters.length}
            </span>
          )}
        </div>
        {hasActiveFilters && (
              <button
                onClick={clearFilters} 
                className="text-sm text-adaptive-secondary hover:underline font-medium hover-link"
              >
            Limpiar todo
          </button>
        )}
      </div>

      {/* Filtros activos */}
      {activeFilters.length > 0 && onRemoveFilter && (
        <div className="mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 flex-wrap">
            {activeFilters.map((filter, index) => (
              <button
                key={index}
                onClick={() => onRemoveFilter(filter.type, filter.value)}
                className="flex items-center gap-1 px-2.5 py-1 glass-secondary text-adaptive-primary rounded-full text-xs hover-button"
              >
                <span>{filter.label}</span>
                <span className="text-xs ml-0.5">
                  <X className="w-3 h-3" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-1">
        {/* Filtro de Precio con acordeón */}
        <div className="border-b border-white/10 pb-4 mb-4">
          <button
            onClick={() => toggleSection("precio")}
            className="w-full flex items-center justify-between py-2 hover:bg-white/5 rounded-lg px-2 transition-colors"
          >
            <h3 className="font-semibold text-adaptive-primary text-sm uppercase tracking-wide">
              Precio
            </h3>
            <ChevronDown
              className={`w-5 h-5 text-adaptive-secondary transition-transform ${
                expandedSections.precio ? "rotate-180" : ""
              }`}
            />
          </button>
          
          {expandedSections.precio && (
            <div className="mt-3 space-y-1">
              {PRICE_RANGES.map((range) => (
                <label
                  key={range.value}
                  className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceRange === range.value}
                      onChange={() => handlePriceChange(range.value)}
                      className="w-4 h-4 border-2 border-white/30 glass-secondary text-adaptive-primary focus:ring-white/20 focus:ring-2 cursor-pointer"
                    />
                    <span className="text-adaptive-secondary text-sm group-hover:text-adaptive-primary transition-colors">
                      {range.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Filtros dinámicos con jerarquía optimizada */}
        {availableFacets
          .sort((a, b) => {
            // Jerarquía: categoría/marca primero, luego características específicas
            const priority = { categoria: 1, marca: 2, talla: 3, color: 4, material: 5 };
            const aPriority = priority[a.key as keyof typeof priority] || 10;
            const bPriority = priority[b.key as keyof typeof priority] || 10;
            return aPriority - bPriority;
          })
          .map((facet) => {
          const sectionKey = facet.key;
          const isExpanded = expandedSections[sectionKey] ?? (sectionKey === 'categoria' || sectionKey === 'marca');
          
          return (
            <div key={facet.key} className="border-b border-white/10 pb-4 mb-4 last:border-0">
              <button
                onClick={() => toggleSection(sectionKey)}
                className="w-full flex items-center justify-between py-2 hover:bg-white/5 rounded-lg px-2 transition-colors"
              >
                <h3 className="font-semibold text-adaptive-primary text-sm uppercase tracking-wide">
                  {facet.key.replace(/_/g, " ")}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-adaptive-secondary transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {isExpanded && (
                <div className="mt-3">
                  {facet.widget === "swatch" ? (
                    // Widget de botones para colores (máximo 4-5 visibles)
                    <div className="flex flex-wrap gap-2">
                      {(showAllOptions[facet.key] ? facet.values : facet.values?.slice(0, 5))?.map((value) => {
                        const count = facetCounts?.[facet.key]?.[value] || 0;
                        return (
                          <button
                            key={value}
                            onClick={() => toggleFacet(facet.key, value)}
                            className={`px-3 py-1.5 rounded-md border-2 text-sm font-medium relative ${
                              filters.facets[facet.key]?.includes(value)
                                ? "glass-secondary text-adaptive-primary border-white/30 shadow-md"
                                : "glass-button border-transparent hover:border-white/30 hover-button"
                            }`}
                          >
                            {value}
                            {count > 0 && (
                              <span className="ml-1.5 text-xs opacity-75">({count})</span>
                            )}
                          </button>
                        );
                      })}
                      {facet.values && facet.values.length > 5 && !showAllOptions[facet.key] && (
                        <button 
                          onClick={() => toggleShowAll(facet.key)}
                          className="px-3 py-1.5 text-sm text-adaptive-secondary hover:underline"
                        >
                          +{facet.values.length - 5} más
                        </button>
                      )}
                      {facet.values && facet.values.length > 5 && showAllOptions[facet.key] && (
                        <button 
                          onClick={() => toggleShowAll(facet.key)}
                          className="px-3 py-1.5 text-sm text-adaptive-secondary hover:underline"
                        >
                          Ver menos
                        </button>
                      )}
                    </div>
                  ) : (
                    // Widget de checkboxes mejorados con contadores (máximo 4-5 visibles)
                    <div className="space-y-1">
                      {(showAllOptions[facet.key] ? facet.values : facet.values?.slice(0, 5))?.map((value) => {
                        const count = facetCounts?.[facet.key]?.[value] || 0;
                        return (
                          <label
                            key={value}
                            className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={filters.facets[facet.key]?.includes(value) || false}
                                onChange={() => toggleFacet(facet.key, value)}
                                className="w-4 h-4 border-2 border-white/30 rounded glass-secondary text-adaptive-primary focus:ring-white/20 focus:ring-2 cursor-pointer"
                              />
                              <span className="text-adaptive-secondary text-sm group-hover:text-adaptive-primary transition-colors">
                                {value}
                              </span>
                            </div>
                            {count > 0 && (
                              <span className="text-xs text-adaptive-tertiary font-medium">
                                {count}
                              </span>
                            )}
                          </label>
                        );
                      })}
                      {facet.values && facet.values.length > 5 && !showAllOptions[facet.key] && (
                        <button 
                          onClick={() => toggleShowAll(facet.key)}
                          className="w-full text-left px-2 py-1 text-sm text-adaptive-secondary hover:underline"
                        >
                          Ver {facet.values.length - 5} opciones más
                        </button>
                      )}
                      {facet.values && facet.values.length > 5 && showAllOptions[facet.key] && (
                        <button 
                          onClick={() => toggleShowAll(facet.key)}
                          className="w-full text-left px-2 py-1 text-sm text-adaptive-secondary hover:underline"
                        >
                          Ver menos
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
