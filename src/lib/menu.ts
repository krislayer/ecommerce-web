import { categories } from "@/lib/data/categories";
import { collectionPath } from "@/lib/paths";

export type MenuItem = {
  title: string;
  path: string;
};

export const footerShopLinks: MenuItem[] = categories.map((category) => ({
  title: category.name,
  path: collectionPath(category.handle),
}));

export const footerInfoLinks: MenuItem[] = [
  { title: "Acerca de", path: "/about" },
  { title: "Devoluciones", path: "/contact#devoluciones" },
  { title: "Contacto", path: "/contact" },
];
