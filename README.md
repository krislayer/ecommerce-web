# ecommerce-web — ¡Qué Chulito!

Tienda en línea con **Next.js 16** (App Router): catálogo, carrito y pedidos por **WhatsApp**. UI inspirada en [vercel/commerce](https://github.com/vercel/commerce).

## Requisitos

- Node.js 20 o superior

## Arranque

```bash
npm install
cp env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número WhatsApp Business (solo dígitos, ej. `50256995320`) |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (sitemap, OG, JSON-LD). En producción: `https://tudominio.com` |

## Catálogo

- **Capa de datos:** [`src/lib/catalog/fetch-products.ts`](src/lib/catalog/fetch-products.ts) — punto único de lectura; hoy usa `sampleProducts` locales.
- **Productos:** [`src/lib/data/products.ts`](src/lib/data/products.ts)
- **Categorías:** [`src/lib/data/categories.ts`](src/lib/data/categories.ts)
- **Pendiente:** conectar Google Sheets en `fetch-products.ts`

## Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Home (grid destacado + carrusel) |
| `/search` | Catálogo / búsqueda |
| `/search/woman`, `/search/man`, … | Colecciones |
| `/product/[handle]` | Ficha de producto |
| `/checkout` | Pedido por WhatsApp |
| `/about`, `/contact` | Páginas estáticas |
| `/sitemap.xml`, `/robots.txt` | SEO |

Redirects legacy vía middleware: `/catalogo` → `/search`, slugs en español → handles en inglés.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servir build |
| `npm run lint` | ESLint |

## Estado en el cliente

- **Carrito:** Redux + `redux-persist` (localStorage)
- Sin cuentas de usuario

## Deploy (Vercel)

1. Conectar repositorio en [vercel.com](https://vercel.com)
2. Configurar variables de entorno (`NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`)
3. Deploy — Next.js se detecta automáticamente

## SEO

- JSON-LD (`Product`) y Open Graph en cada PDP
- Imagen OG del sitio: `/opengraph-image`
- Imagen OG dinámica por producto: `/product/[handle]/opengraph-image`
- Sitemap dinámico con productos activos y colecciones
