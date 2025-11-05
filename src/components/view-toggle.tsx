"use client";

import { Grid3X3, List } from "lucide-react";

type ViewMode = "grid" | "list";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-mac-sm">
      <span className="mac-text-subhead mac-text-secondary font-medium">Vista:</span>
      <div className="mac-segmented-control">
        {/* Botón Vista Grid */}
        <button
          onClick={() => onViewChange("grid")}
          className={`mac-segmented-control-button ${viewMode === "grid" ? "active" : ""}`}
          aria-label="Vista de cuadrícula"
          aria-pressed={viewMode === "grid"}
        >
          <Grid3X3 className="mac-icon-medium" />
        </button>

        {/* Botón Vista Lista */}
        <button
          onClick={() => onViewChange("list")}
          className={`mac-segmented-control-button ${viewMode === "list" ? "active" : ""}`}
          aria-label="Vista de lista"
          aria-pressed={viewMode === "list"}
        >
          <List className="mac-icon-medium" />
        </button>
      </div>
    </div>
  );
}

