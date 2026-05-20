import { categories } from "@/lib/data/categories";
import { collectionPath, searchPath } from "@/lib/paths";
import type { PathFilterItem } from "./filter";

export const collectionItems: PathFilterItem[] = [
  { title: "Todos", path: searchPath() },
  ...categories.map((cat) => ({
    title: cat.name,
    path: collectionPath(cat.handle),
  })),
];
