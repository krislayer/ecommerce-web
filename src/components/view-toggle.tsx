"use client";

import { Grid3X3, List } from "lucide-react";

type ViewMode = "grid" | "list";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white/90 text-sm font-medium">Vista:</span>
      <div className="glass-button">
        {/* Botón Vista Grid */}
        <button
          onClick={() => onViewChange("grid")}
          className={`px-3 py-2 ${
            viewMode === "grid"
              ? "glass-button bg-white/20 text-white"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
          aria-label="Vista de cuadrícula"
        >
          <Grid3X3 className="w-5 h-5 relative z-10" />
        </button>

        {/* Botón Vista Lista */}
        <button
          onClick={() => onViewChange("list")}
          className={`px-3 py-2 ${
            viewMode === "list"
              ? "glass-button bg-white/20 text-white"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
          aria-label="Vista de lista"
        >
          <List className="w-5 h-5 relative z-10" />
        </button>
      </div>
    </div>
  );
}

