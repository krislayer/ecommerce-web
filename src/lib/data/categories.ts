import type { Category, FacetDefinition } from "../domain/entities/product";

export const categories: Category[] = [
  {
    id: "ropa-mujer",
    name: "Ropa Mujer",
    slug: "ropa-mujer",
    description: "Moda femenina para todas las ocasiones",
    facetDefs: [
      {
        key: "talla",
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
    id: "ropa-hombre",
    name: "Ropa Hombre",
    slug: "ropa-hombre",
    description: "Moda masculina moderna",
    facetDefs: [
      {
        key: "talla",
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
    id: "ropa-niño",
    name: "Ropa Niño",
    slug: "ropa-niño",
    description: "Ropa para niños y niñas",
    facetDefs: [
      {
        key: "talla",
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
    id: "belleza",
    name: "Belleza",
    slug: "belleza",
    description: "Productos de belleza y cuidado personal",
    facetDefs: [
      {
        key: "tipo",
        type: "enum",
        values: ["Cuidado Facial", "Maquillaje", "Fragancia"],
        widget: "select",
      },
      {
        key: "marca",
        type: "enum",
        values: ["Premium", "Luxury", "Deluxe"],
        widget: "select",
      },
      {
        key: "piel",
        type: "enum",
        values: ["Todos los tipos", "Seca", "Grasa", "Mixta"],
        widget: "select",
      },
      {
        key: "genero",
        type: "enum",
        values: ["Femenino", "Masculino", "Unisex"],
        widget: "select",
      },
    ],
  },
  {
    id: "hogar",
    name: "Hogar",
    slug: "hogar",
    description: "Artículos para el hogar",
    facetDefs: [
      {
        key: "tipo",
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
    id: "tecnologia",
    name: "Tecnología",
    slug: "tecnologia",
    description: "Dispositivos y accesorios tecnológicos",
    facetDefs: [
      {
        key: "tipo",
        type: "enum",
        values: ["Audio", "Wearables", "Accesorios"],
        widget: "select",
      },
      {
        key: "marca",
        type: "enum",
        values: ["TechPro", "PowerTech", "SportTech"],
        widget: "select",
      },
      {
        key: "conectividad",
        type: "enum",
        values: ["Bluetooth", "USB-C", "Wireless"],
        widget: "select",
      },
      {
        key: "resistencia",
        type: "enum",
        values: ["Agua", "Polvo", "Golpes"],
        widget: "select",
      },
      {
        key: "compatibilidad",
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

