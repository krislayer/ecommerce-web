"use client";

import { ChevronDown } from "lucide-react";

export type SortOption = "relevance" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

interface ProductSortProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  currentCount?: number;
  totalCount?: number;
  searchQuery?: string;
}

export function ProductSort({ sortBy, onSortChange, currentCount, totalCount, searchQuery }: ProductSortProps) {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "relevance", label: "Relevancia" },
    { value: "price-asc", label: "Menor precio" },
    { value: "price-desc", label: "Mayor precio" },
    { value: "name-asc", label: "Nombre A-Z" },
    { value: "name-desc", label: "Nombre Z-A" },
  ];

  return (
    <div className="flex items-center gap-mac-sm">
      <span className="mac-text-subhead mac-text-secondary font-medium">Ordenar:</span>
      <div className="mac-card p-mac-xs flex items-center relative">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="bg-transparent border-none outline-none mac-text-primary cursor-pointer mac-text-footnote font-medium py-0 appearance-none pr-6"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-mac-secondary-grouped-background mac-text-primary">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="mac-icon-small mac-text-secondary absolute right-2 pointer-events-none" />
      </div>
    </div>
  );
}
