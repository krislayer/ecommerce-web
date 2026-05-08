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

export function ProductFilters({ filters, onFiltersChange, availableFacets, facetCounts, onRemoveFilter }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    precio: true,
    category: true,
  });

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
    activeFilters.push({ 
      type: "priceRange", 
      value: filters.priceRange, 
      label: PRICE_LABELS[filters.priceRange] 
    });
  }

  return (
    <div className="mac-card">
      {/* Header */}
      <div className={`flex items-center justify-between ${activeFilters.length > 0 && onRemoveFilter ? 'mb-0 pb-0' : 'mb-mac-md pb-mac-sm'} border-b border-mac-separator`}>
        <div className="flex items-center gap-mac-sm">
          <h2 className="mac-text-title-2 mac-text-primary">Filtros</h2>
          {hasActiveFilters && (
            <span className="mac-badge">
              {activeFilters.length}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters} 
            className="mac-text-caption-1 mac-text-secondary hover:mac-text-primary mac-transition-colors font-medium"
          >
            Limpiar todo
          </button>
        )}
      </div>

      {/* Filtros activos */}
      {activeFilters.length > 0 && onRemoveFilter && (
        <div className="border-b border-mac-separator mb-mac-md">
          <div className="flex items-center gap-mac-sm flex-wrap py-mac-md">
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
          </div>
        </div>
      )}

      <div className="space-y-0">
        {/* Filtro de Precio */}
        <div className={`border-b border-mac-separator ${!expandedSections.precio ? 'pb-mac-md' : ''}`}>
          <button
            onClick={() => toggleSection("precio")}
            className="w-full flex items-center justify-between py-mac-md hover:bg-mac-gray-2 dark:hover:bg-(--mac-tertiary-background) rounded-mac-sm px-mac-sm mac-transition-colors"
          >
            <h3 className="mac-text-subhead mac-text-primary uppercase tracking-wide font-semibold">
              Precio
            </h3>
            <ChevronDown
              className={`mac-icon-medium mac-text-secondary mac-transition-transform ${
                expandedSections.precio ? "rotate-180" : ""
              }`}
            />
          </button>
          
          {expandedSections.precio && (
            <div className="px-mac-sm pb-mac-md space-y-mac-xs">
              {PRICE_RANGES.map((range) => (
                <label
                  key={range.value}
                  className="flex items-center justify-between cursor-pointer hover:bg-mac-gray-2 dark:hover:bg-(--mac-tertiary-background) p-mac-sm rounded-mac-sm mac-transition-colors group"
                >
                  <div className="flex items-center gap-mac-md">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceRange === range.value}
                      onChange={() => handlePriceChange(range.value)}
                      className="w-4 h-4 border-2 border-mac-separator mac-text-primary focus:ring-mac-blue focus:ring-2 cursor-pointer"
                    />
                    <span className="mac-text-footnote mac-text-secondary group-hover:mac-text-primary mac-transition-colors">
                      {range.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Filtros dinámicos */}
        {availableFacets
          .sort((a, b) => {
            const priority = { category: 1, brand: 2, size: 3, color: 4, material: 5 };
            const aPriority = priority[a.key as keyof typeof priority] || 10;
            const bPriority = priority[b.key as keyof typeof priority] || 10;
            return aPriority - bPriority;
          })
          .map((facet) => {
          const sectionKey = facet.key;
          const isExpanded = expandedSections[sectionKey] ?? (sectionKey === 'category' || sectionKey === 'brand');
          
          return (
            <div key={facet.key} className={`border-b border-mac-separator last:border-0 ${!isExpanded ? 'pb-mac-md' : ''}`}>
              <button
                onClick={() => toggleSection(sectionKey)}
                className="w-full flex items-center justify-between py-mac-md hover:bg-mac-gray-2 dark:hover:bg-(--mac-tertiary-background) rounded-mac-sm px-mac-sm mac-transition-colors"
              >
                <h3 className="mac-text-subhead mac-text-primary uppercase tracking-wide font-semibold">
                  {FACET_LABELS[facet.key] || facet.key.replace(/_/g, " ")}
                </h3>
                <ChevronDown
                  className={`mac-icon-medium mac-text-secondary mac-transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {isExpanded && (
                <div className="px-mac-sm pb-mac-md">
                  {facet.widget === "swatch" ? (
                    <>
                      <div className="flex flex-wrap gap-mac-sm">
                        {(() => {
                          // Filtrar solo valores que tienen productos disponibles
                          const availableValues = facet.values?.filter(value => {
                            const count = facetCounts?.[facet.key]?.[value] || 0;
                            return count > 0;
                          }) || [];
                          
                          // Para tamaño (size), mostrar solo S, M, L por defecto
                          if (facet.key === "size" && !showAllOptions[facet.key]) {
                            const standardSizes = availableValues.filter(v => ["S", "M", "L"].includes(v));
                            return standardSizes;
                          }
                          // Para otros filtros, mostrar primeras 3 opciones
                          return showAllOptions[facet.key] ? availableValues : availableValues.slice(0, 3);
                        })().map((value) => {
                          const count = facetCounts?.[facet.key]?.[value] || 0;
                          return (
                            <button
                              key={value}
                              onClick={() => toggleFacet(facet.key, value)}
                              className={`mac-chip ${
                                filters.facets[facet.key]?.includes(value)
                                  ? "selected"
                                  : ""
                              }`}
                            >
                              {value}
                              {count > 0 && (
                                <span className="mac-text-caption-1 opacity-75">({count})</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      {(() => {
                        // Filtrar solo valores que tienen productos disponibles
                        const availableValues = facet.values?.filter(value => {
                          const count = facetCounts?.[facet.key]?.[value] || 0;
                          return count > 0;
                        }) || [];
                        
                        // Para tamaño (size), mostrar botón "Ver más" si hay más de S, M, L
                        if (facet.key === "size") {
                          const hasMoreSizes = availableValues.some(v => !["S", "M", "L"].includes(v));
                          if (hasMoreSizes && !showAllOptions[facet.key]) {
                            const hiddenCount = availableValues.filter(v => !["S", "M", "L"].includes(v)).length;
                            return (
                              <div className="pt-mac-xs">
                                <button 
                                  onClick={() => toggleShowAll(facet.key)}
                                  className="mac-button-tertiary mac-text-caption-1"
                                >
                                  +{hiddenCount} más
                                </button>
                              </div>
                            );
                          }
                          if (hasMoreSizes && showAllOptions[facet.key]) {
                            return (
                              <div className="pt-mac-xs">
                                <button 
                                  onClick={() => toggleShowAll(facet.key)}
                                  className="mac-button-tertiary mac-text-caption-1"
                                >
                                  Ver menos
                                </button>
                              </div>
                            );
                          }
                          return null;
                        }
                        // Para otros filtros, mostrar botón si hay más de 3 opciones disponibles
                        if (availableValues.length > 3 && !showAllOptions[facet.key]) {
                          return (
                            <div className="pt-mac-xs">
                              <button 
                                onClick={() => toggleShowAll(facet.key)}
                                className="mac-button-tertiary mac-text-caption-1"
                              >
                                +{availableValues.length - 3} más
                              </button>
                            </div>
                          );
                        }
                        if (availableValues.length > 3 && showAllOptions[facet.key]) {
                          return (
                            <div className="pt-mac-xs">
                              <button 
                                onClick={() => toggleShowAll(facet.key)}
                                className="mac-button-tertiary mac-text-caption-1"
                              >
                                Ver menos
                              </button>
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </>
                  ) : (
                    <div className="space-y-mac-xs pb-mac-md">
                      {(() => {
                        // Filtrar solo valores que tienen productos disponibles
                        const availableValues = facet.values?.filter(value => {
                          const count = facetCounts?.[facet.key]?.[value] || 0;
                          return count > 0;
                        }) || [];
                        
                        // Para tamaño (size), mostrar solo S, M, L por defecto
                        if (facet.key === "size" && !showAllOptions[facet.key]) {
                          const standardSizes = availableValues.filter(v => ["S", "M", "L"].includes(v));
                          return standardSizes;
                        }
                        // Para otros filtros, mostrar primeras 3 opciones
                        return showAllOptions[facet.key] ? availableValues : availableValues.slice(0, 3);
                      })().map((value) => {
                        const count = facetCounts?.[facet.key]?.[value] || 0;
                        return (
                          <label
                            key={value}
                            className="flex items-center justify-between cursor-pointer hover:bg-mac-gray-2 dark:hover:bg-(--mac-tertiary-background) p-mac-sm rounded-mac-sm mac-transition-colors group"
                          >
                            <div className="flex items-center gap-mac-md">
                              <input
                                type="checkbox"
                                checked={filters.facets[facet.key]?.includes(value) || false}
                                onChange={() => toggleFacet(facet.key, value)}
                                className="w-4 h-4 border-2 border-mac-separator rounded-mac-sm mac-text-primary focus:ring-mac-blue focus:ring-2 cursor-pointer"
                              />
                              <span className="mac-text-footnote mac-text-secondary group-hover:mac-text-primary mac-transition-colors">
                                {value}
                              </span>
                            </div>
                            {count > 0 && (
                              <span className="mac-text-caption-1 mac-text-tertiary font-medium">
                                {count}
                              </span>
                            )}
                          </label>
                        );
                      })}
                      {(() => {
                        // Filtrar solo valores que tienen productos disponibles
                        const availableValues = facet.values?.filter(value => {
                          const count = facetCounts?.[facet.key]?.[value] || 0;
                          return count > 0;
                        }) || [];
                        
                        // Para tamaño (size), mostrar botón "Ver más" si hay más de S, M, L
                        if (facet.key === "size") {
                          const hasMoreSizes = availableValues.some(v => !["S", "M", "L"].includes(v));
                          if (hasMoreSizes && !showAllOptions[facet.key]) {
                            const hiddenCount = availableValues.filter(v => !["S", "M", "L"].includes(v)).length;
                            return (
                              <div className="pt-mac-xs pb-mac-md">
                                <button 
                                  onClick={() => toggleShowAll(facet.key)}
                                  className="mac-button-tertiary mac-text-caption-1"
                                >
                                  +{hiddenCount} más
                                </button>
                              </div>
                            );
                          }
                          if (hasMoreSizes && showAllOptions[facet.key]) {
                            return (
                              <div className="pt-mac-xs pb-mac-md">
                                <button 
                                  onClick={() => toggleShowAll(facet.key)}
                                  className="mac-button-tertiary mac-text-caption-1"
                                >
                                  Ver menos
                                </button>
                              </div>
                            );
                          }
                          return null;
                        }
                        // Para otros filtros, mostrar botón si hay más de 3 opciones disponibles
                        if (availableValues.length > 3 && !showAllOptions[facet.key]) {
                          return (
                            <div className="pt-mac-xs">
                              <button 
                                onClick={() => toggleShowAll(facet.key)}
                                className="mac-button-tertiary mac-text-caption-1"
                              >
                                +{availableValues.length - 3} más
                              </button>
                            </div>
                          );
                        }
                        if (availableValues.length > 3 && showAllOptions[facet.key]) {
                          return (
                            <div className="pt-mac-xs">
                              <button 
                                onClick={() => toggleShowAll(facet.key)}
                                className="mac-button-tertiary mac-text-caption-1"
                              >
                                Ver menos
                              </button>
                            </div>
                          );
                        }
                        return null;
                      })()}
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
