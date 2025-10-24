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
      <span className="text-adaptive-secondary text-sm font-medium">Vista:</span>
      <div className="flex items-center glass-input p-0 overflow-hidden">
        {/* Botón Vista Grid */}
        <button
          onClick={() => onViewChange("grid")}
          className={`p-2 transition-colors border-r border-white/20 ${
            viewMode === "grid"
              ? "bg-white/10 backdrop-blur-sm text-adaptive-primary"
              : "text-adaptive-secondary hover:text-adaptive-primary hover:bg-white/5"
          }`}
          aria-label="Vista de cuadrícula"
        >
          <Grid3X3 className="w-5 h-5" />
        </button>

        {/* Botón Vista Lista */}
        <button
          onClick={() => onViewChange("list")}
          className={`p-2 transition-colors ${
            viewMode === "list"
              ? "bg-white/10 backdrop-blur-sm text-adaptive-primary"
              : "text-adaptive-secondary hover:text-adaptive-primary hover:bg-white/5"
          }`}
          aria-label="Vista de lista"
        >
          <List className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

