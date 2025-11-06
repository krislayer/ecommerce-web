"use client";

import { useState, useMemo, useCallback } from "react";
import { ProductGrid } from "./product-grid";
import { ProductList } from "./product-list";
import { ProductSearch } from "@/components/product-search";
import { ProductFilters, FilterState } from "@/components/product-filters";
import { ProductSort, SortOption } from "@/components/product-sort";
import { ViewToggle } from "@/components/view-toggle";
import { Pagination } from "@/components/pagination";
import { CategoryNavigation } from "@/components/category-navigation";
import { sampleProducts } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";

type ViewMode = "grid" | "list";

// Función para normalizar texto eliminando acentos
const normalizeText = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export default function CatalogoPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    facets: {},
    priceRange: "all",
  });
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Extraer facetas disponibles de los productos reales (solo valores que existen en productos)
  const availableFacets = useMemo(() => {
    const allFacets = new Map<string, Set<string>>();
    
    // Filtrar productos activos y por categoría seleccionada si hay una
    // Filtrar solo productos activos (control manual desde admin)
    let productsToProcess = sampleProducts.filter(product => product.active);
    if (selectedCategory) {
      productsToProcess = productsToProcess.filter(product => 
        product.categoryIds.includes(selectedCategory)
      );
    }
    
    // Extraer facetas de los productos reales, no de las definiciones de categorías
    productsToProcess.forEach((product) => {
      // Agregar valores de atributos que existen en los productos
      Object.entries(product.attrs).forEach(([key, value]) => {
        if (!allFacets.has(key)) {
          allFacets.set(key, new Set());
        }
        allFacets.get(key)?.add(value);
      });
    });

    // Obtener widget de las categorías para mantener consistencia
    const getWidget = (key: string): "swatch" | "select" | "range" => {
      // Buscar en todas las categorías para encontrar el widget correcto
      for (const category of categories) {
        const facetDef = category.facetDefs.find(f => f.key === key);
        if (facetDef?.widget) {
          return facetDef.widget;
        }
      }
      // Default: color es swatch, otros son select
      return key === "color" ? "swatch" : "select";
    };

    // Convertir a FacetDefinition solo con valores que existen en productos
    return Array.from(allFacets.entries())
      .filter(([key, values]) => values.size > 0) // Solo facetas con valores
      .map(([key, values]) => ({
        key,
        type: "enum" as const,
        values: Array.from(values).sort(), // Ordenar valores para consistencia
        widget: getWidget(key),
      }));
  }, [selectedCategory]);

  // Mapeo de categorías para búsqueda (mantiene términos en español para UX)
  const categoryMap: Record<string, string[]> = {
    "woman": ["mujer", "femenino", "femenina", "dama", "damas"],
    "men": ["hombre", "masculino", "masculina", "caballero", "caballeros"],
    "kids": ["niño", "niña", "niños", "niñas", "infantil"],
    "accesorios": ["accesorio", "accesorios", "complemento", "complementos"],
  };

  const handleRemoveFilter = (type: keyof FilterState, value: string) => {
    const newFilters = { ...filters };
    
    if (type === "facets") {
      // value es el formato "key:value"
      const [facetKey, facetValue] = value.split(":");
      if (facetKey && facetValue) {
        const newFacets = { ...newFilters.facets };
        newFacets[facetKey] = newFacets[facetKey]?.filter(v => v !== facetValue) || [];
        if (newFacets[facetKey].length === 0) {
          delete newFacets[facetKey];
        }
        newFilters.facets = newFacets;
      }
    } else if (type === "priceRange") {
      newFilters.priceRange = "all";
    }
    
    setFilters(newFilters);
  };

  // Calcular contadores de facetas (cuántos productos coinciden con cada valor)
  const facetCounts = useMemo(() => {
    const counts: Record<string, Record<string, number>> = {};
    
    // Primero aplicar búsqueda y filtros de precio (pero no facetas específicas)
    // Filtrar solo productos activos (control manual desde admin)
    let baseProducts = sampleProducts.filter(product => product.active);
    
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeText(searchQuery);
      baseProducts = baseProducts.filter((product) => {
        if (normalizeText(product.name).includes(normalizedQuery)) return true;
        if (normalizeText(product.description).includes(normalizedQuery)) return true;
        
        const categoryMatches = product.categoryIds.some(catId => {
          if (normalizeText(catId).includes(normalizedQuery)) return true;
          const mappedTerms = categoryMap[catId] || [];
          return mappedTerms.some(term => normalizeText(term).includes(normalizedQuery));
        });
        if (categoryMatches) return true;
        
        const attrsMatch = Object.values(product.attrs).some(
          value => normalizeText(value).includes(normalizedQuery)
        );
        if (attrsMatch) return true;
        
        return false;
      });
    }

    // Filtrar por precio
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange === "1000+" 
        ? [1000, Infinity]
        : filters.priceRange.split("-").map(Number);
      
      baseProducts = baseProducts.filter(product => 
        product.price >= min && product.price <= max
      );
    }

    // Contar cada faceta
    availableFacets.forEach(facet => {
      counts[facet.key] = {};
      
      facet.values?.forEach(value => {
        const count = baseProducts.filter(product => {
          // Aplicar filtros de otras facetas excepto la actual
          for (const [otherFacetKey, selectedValues] of Object.entries(filters.facets)) {
            if (otherFacetKey !== facet.key && selectedValues.length > 0) {
              if (otherFacetKey === "category") {
                // Para categorías, verificar si el producto pertenece a alguna de las categorías seleccionadas
                const productCategoryNames = product.categoryIds.map(catId => {
                  const category = categories.find(c => c.id === catId);
                  return category?.name;
                }).filter((name): name is string => Boolean(name));
                
                if (!productCategoryNames.some(catName => selectedValues.includes(catName))) {
                  return false;
                }
              } else {
                // Para otras facetas, usar los atributos del producto
                const productValue = product.attrs[otherFacetKey];
                if (!productValue || !selectedValues.includes(productValue)) {
                  return false;
                }
              }
            }
          }
          
          // Contar si el producto tiene este valor en la faceta actual
          if (facet.key === "category") {
            // Para categorías, verificar si el producto pertenece a esta categoría
            return product.categoryIds.some(catId => {
              const category = categories.find(c => c.id === catId);
              return category && category.name === value;
            });
          }
          return product.attrs[facet.key] === value;
        }).length;
        
        counts[facet.key][value] = count;
      });
    });

    return counts;
  }, [searchQuery, filters.priceRange, filters.facets, availableFacets]);

  const filteredAndSortedProducts = useMemo(() => {
    // Filtrar solo productos activos (control manual desde admin)
    let products = sampleProducts.filter(product => product.active);

    // Aplicar filtro de categoría primero
    if (selectedCategory) {
      products = products.filter(product => 
        product.categoryIds.includes(selectedCategory)
      );
    }

    // Aplicar búsqueda
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeText(searchQuery);
      products = products.filter((product) => {
        if (normalizeText(product.name).includes(normalizedQuery)) return true;
        if (normalizeText(product.description).includes(normalizedQuery)) return true;
        
        const categoryMatches = product.categoryIds.some(catId => {
          if (normalizeText(catId).includes(normalizedQuery)) return true;
          const mappedTerms = categoryMap[catId] || [];
          return mappedTerms.some(term => normalizeText(term).includes(normalizedQuery));
        });
        if (categoryMatches) return true;
        
        const attrsMatch = Object.values(product.attrs).some(
          value => normalizeText(value).includes(normalizedQuery)
        );
        if (attrsMatch) return true;
        
        return false;
      });
    }

    // Aplicar filtros de facetas
    products = products.filter((product) => {
      // Filtro de precio
      if (filters.priceRange !== "all") {
        const [min, max] = filters.priceRange === "1000+" 
          ? [1000, Infinity]
          : filters.priceRange.split("-").map(Number);
        
        if (product.price < min || product.price > max) {
          return false;
        }
      }

      // Filtros de facetas dinámicas
      for (const [facetKey, selectedValues] of Object.entries(filters.facets)) {
        if (selectedValues.length > 0) {
          if (facetKey === "category") {
            // Para categorías, verificar si el producto pertenece a alguna de las categorías seleccionadas
            const productCategoryNames = product.categoryIds.map(catId => {
              const category = categories.find(c => c.id === catId);
              return category?.name;
            }).filter((name): name is string => Boolean(name));
            
            if (!productCategoryNames.some(catName => selectedValues.includes(catName))) {
              return false;
            }
          } else {
            // Para otras facetas, usar los atributos del producto
            const productValue = product.attrs[facetKey];
            if (!productValue || !selectedValues.includes(productValue)) {
              return false;
            }
          }
        }
      }

      return true;
    });

    // Aplicar ordenamiento
    const sorted = [...products].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, selectedCategory, filters, sortBy]);

  // Paginación
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

  // Resetear a página 1 cuando cambian los filtros
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen mac-bg-grouped">
      <div className="max-w-7xl mx-auto px-mac-md py-mac-xl mac-fade-in">
        {/* Header */}
        <div className="mac-card text-center mb-mac-lg">
          <h1 className="mac-text-large-title mac-text-primary mb-mac-md">
            Catálogo
          </h1>
          <p className="mac-text-title-3 mac-text-secondary mb-mac-lg">
            Descubre moda, belleza, hogar, tecnología y más. Encuentra todo lo que necesitas en un solo lugar.
          </p>
          
          <ProductSearch 
            onSearch={handleSearch}
            placeholder="Buscar por nombre, descripción o categoría..."
          />
          
          {/* Navegación de categorías */}
          <div className="mt-mac-md">
            <CategoryNavigation 
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-mac-md mb-mac-md">
        <div className="lg:col-span-1">
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            availableFacets={availableFacets}
            facetCounts={facetCounts}
            onRemoveFilter={handleRemoveFilter}
          />
        </div>
        
        <div className="lg:col-span-3">
          {/* Barra de controles: Ordenar + Vista */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-mac-md mb-mac-lg">
            {/* Contador a la izquierda */}
            <div className="mac-text-subhead mac-text-secondary">
              {(() => {
                const startItem = (currentPage - 1) * itemsPerPage + 1;
                const endItem = Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length);
                return (
                  <>
                    Mostrando <span className="font-semibold mac-text-primary">{startItem}-{endItem}</span> de <span className="font-semibold mac-text-primary">{filteredAndSortedProducts.length}</span> producto{filteredAndSortedProducts.length !== 1 ? 's' : ''}
                    {selectedCategory && (
                      <> en: <span className="font-semibold mac-text-primary">{categories.find(c => c.id === selectedCategory)?.name}</span></>
                    )}
                    {searchQuery && (
                      <> para: <span className="font-semibold mac-text-primary">&quot;{searchQuery}&quot;</span></>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Controles a la derecha */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-mac-md">
              <ProductSort 
                sortBy={sortBy} 
                onSortChange={setSortBy}
              />
              
              <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
            </div>
          </div>

          {/* Vista de productos */}
          {viewMode === "grid" ? (
            <ProductGrid products={paginatedProducts} />
          ) : (
            <ProductList products={paginatedProducts} />
          )}

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="mt-mac-lg">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={filteredAndSortedProducts.length}
              />
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
