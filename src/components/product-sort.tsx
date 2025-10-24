"use client";

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
    <div className="flex items-center gap-2">
      <span className="text-adaptive-secondary text-sm font-medium">Ordenar:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="glass-input px-4 py-2 cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
