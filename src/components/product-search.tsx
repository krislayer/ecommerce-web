"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";

interface ProductSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  /** Cuando llega desde la URL u otra navegación, fuerza el texto del campo una sola vez por valor distinto. */
  hydrateFromExternal?: string;
}

export function ProductSearch({
  onSearch,
  placeholder = "Buscar productos...",
  hydrateFromExternal,
}: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const isMountedRef = useRef(false);

  /** Alinea el campo con `?q=` u otra navegación; el filtrado lo maneja el padre vía URL. */
  useEffect(() => {
    if (hydrateFromExternal === undefined) return;
    setSearchQuery(hydrateFromExternal);
  }, [hydrateFromExternal]);

  // Ejecutar búsqueda cuando cambia el valor debounced (pero no en el primer render)
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    onSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  // Permitir búsqueda con Enter también
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(searchQuery);
    }
  };

  return (
    <div className="w-full mac-search-field">
      {/* Icono de búsqueda */}
      <div className="mac-search-field-icon">
        <Search className="mac-icon-medium" />
      </div>
      
      {/* Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="mac-search-field-input"
        aria-label="Buscar productos"
      />
      
      {/* Botón limpiar */}
      {searchQuery && (
        <button
          type="button"
          onClick={handleClear}
          className="mac-search-field-clear"
          aria-label="Limpiar búsqueda"
        >
          <X className="mac-icon-small" />
        </button>
      )}
    </div>
  );
}
