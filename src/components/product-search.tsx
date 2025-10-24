"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";

interface ProductSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function ProductSearch({ onSearch, placeholder = "Buscar productos..." }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    onSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center gap-2">
        {/* Campo de búsqueda - Más ancho y prominente */}
        <div className="relative flex-1 glass-secondary">
          <div className="flex items-center gap-2 px-4 py-3">
            {/* Icono de búsqueda a la izquierda */}
            <Search className="w-5 h-5 text-adaptive-tertiary shrink-0" />
            
            {/* Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none outline-none text-adaptive-primary placeholder:text-adaptive-tertiary text-sm sm:text-base"
            />
            
            {/* Botón limpiar */}
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="shrink-0 text-adaptive-tertiary hover:text-adaptive-primary transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        
        {/* Botón de búsqueda destacado */}
        <button
          type="submit"
          className="glass-button px-6 py-3 font-semibold text-sm sm:text-base shrink-0 hover-button"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
