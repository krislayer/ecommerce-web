import type { Category } from "../domain/entities/product";

export const categories: Category[] = [
  {
    id: "woman",
    name: "Mujer",
    handle: "woman",
    slug: "mujer",
    description: "Moda femenina para todas las ocasiones",
    facetDefs: [
      {
        key: "size",
        type: "enum",
        values: ["XS", "S", "M", "L", "XL", "XXL"],
        widget: "select",
      },
      {
        key: "color",
        type: "enum",
        values: ["Negro", "Blanco", "Azul", "Rosa", "Rojo", "Verde", "Gris", "Beige", "Amarillo"],
        widget: "swatch",
      },
      {
        key: "material",
        type: "enum",
        values: ["Algodón", "Poliester", "Seda", "Lino", "Denim", "Rayón", "Lana"],
        widget: "select",
      },
    ],
  },
  {
    id: "men",
    name: "Hombre",
    handle: "man",
    slug: "hombre",
    description: "Moda masculina moderna",
    facetDefs: [
      {
        key: "size",
        type: "enum",
        values: ["S", "M", "L", "XL", "XXL"],
        widget: "select",
      },
      {
        key: "color",
        type: "enum",
        values: ["Negro", "Blanco", "Azul", "Gris", "Beige", "Verde"],
        widget: "swatch",
      },
      {
        key: "material",
        type: "enum",
        values: ["Algodón", "Poliester", "Lino", "Denim", "Lana"],
        widget: "select",
      },
    ],
  },
  {
    id: "kids",
    name: "Niño",
    handle: "kids",
    slug: "niño",
    description: "Ropa para niños y niñas",
    facetDefs: [
      {
        key: "size",
        type: "enum",
        values: ["XS", "S", "M", "L"],
        widget: "select",
      },
      {
        key: "color",
        type: "enum",
        values: ["Azul", "Rosa", "Rojo", "Verde", "Amarillo", "Multicolor"],
        widget: "swatch",
      },
      {
        key: "material",
        type: "enum",
        values: ["Algodón", "Poliester"],
        widget: "select",
      },
    ],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

export function getCategoryByHandle(handle: string): Category | undefined {
  return categories.find((cat) => cat.handle === handle);
}

export function getCategoriesForIds(ids: string[]): Category[] {
  return categories.filter((cat) => ids.includes(cat.id));
}

export const collectionHandles = categories.map((c) => c.handle);

