import type { Category, FacetDefinition } from "../domain/entities/product";

export const categories: Category[] = [
  {
    id: "woman",
    name: "Mujer",
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
  {
    id: "beauty",
    name: "Belleza",
    slug: "belleza",
    description: "Productos de belleza y cuidado personal",
    facetDefs: [
      {
        key: "type",
        type: "enum",
        values: ["Cuidado Facial", "Maquillaje", "Fragancia"],
        widget: "select",
      },
      {
        key: "brand",
        type: "enum",
        values: ["Premium", "Luxury", "Deluxe"],
        widget: "select",
      },
      {
        key: "skin-type",
        type: "enum",
        values: ["Todos los tipos", "Seca", "Grasa", "Mixta"],
        widget: "select",
      },
      {
        key: "gender",
        type: "enum",
        values: ["Femenino", "Masculino", "Unisex"],
        widget: "select",
      },
    ],
  },
  {
    id: "home",
    name: "Hogar",
    slug: "hogar",
    description: "Artículos para el hogar",
    facetDefs: [
      {
        key: "type",
        type: "enum",
        values: ["Decoración", "Iluminación", "Textiles"],
        widget: "select",
      },
      {
        key: "color",
        type: "enum",
        values: ["Blanco", "Negro", "Beige", "Multicolor"],
        widget: "swatch",
      },
      {
        key: "material",
        type: "enum",
        values: ["Algodón", "Metal", "Lino"],
        widget: "select",
      },
    ],
  },
  {
    id: "technology",
    name: "Tecnología",
    slug: "tecnologia",
    description: "Dispositivos y accesorios tecnológicos",
    facetDefs: [
      {
        key: "type",
        type: "enum",
        values: ["Audio", "Wearables", "Accesorios"],
        widget: "select",
      },
      {
        key: "brand",
        type: "enum",
        values: ["TechPro", "PowerTech", "SportTech"],
        widget: "select",
      },
      {
        key: "connectivity",
        type: "enum",
        values: ["Bluetooth", "USB-C", "Wireless"],
        widget: "select",
      },
      {
        key: "resistance",
        type: "enum",
        values: ["Agua", "Polvo", "Golpes"],
        widget: "select",
      },
      {
        key: "compatibility",
        type: "enum",
        values: ["Universal", "iOS", "Android"],
        widget: "select",
      },
    ],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find(cat => cat.id === id);
}

export function getCategoriesForIds(ids: string[]): Category[] {
  return categories.filter(cat => ids.includes(cat.id));
}

