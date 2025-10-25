"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { AdvancedLiquidGlassCard } from "./advanced-liquid-glass-card";
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
            <Search className="w-5 h-5 text-white/70 shrink-0" />
            
            {/* Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/70 text-sm sm:text-base"
            />
            
            {/* Botón limpiar */}
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="shrink-0 text-white/70 hover:text-white transition-colors"
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
          <span className="relative z-10">Buscar</span>
        </button>
      </div>
    </form>
  );
}
