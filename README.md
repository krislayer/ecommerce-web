# ecommerce-web — ¡Qué Chulito!

Tienda en línea construida con **Next.js 16** (App Router): catálogo local, carrito y favoritos en el navegador, y pedidos por **WhatsApp**. No hay servidor de auth ni backend de datos: el contenido sale de archivos en el repo.

## Requisitos

- Node.js 20 o superior (recomendado para alinear con el tipo de proyecto)

## Arranque

```bash
npm install
cp env.example .env.local   # opcional pero recomendado en local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copia `env.example` a `.env.local` y ajusta:

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp Business (solo dígitos: código país + número, sin `+`, espacios ni guiones). Ejemplo Guatemala: `50256995320`. |

El checkout construye enlaces `wa.me` con ese número.

## Catálogo y categorías

- **Productos:** [`src/lib/data/products.ts`](src/lib/data/products.ts) — arreglo `sampleProducts`; cada ítem debe cumplir el tipo [`Product`](src/lib/domain/entities/product.ts).
- **Categorías y facetas (filtros):** [`src/lib/data/categories.ts`](src/lib/data/categories.ts) — `categoryIds` de cada producto deben coincidir con ids definidos ahí.

Las imágenes usan URLs externas; los hosts permitidos están en [`next.config.ts`](next.config.ts) (`images.remotePatterns`), hoy orientados a Unsplash.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Desarrollo (Turbopack por defecto en Next 16) |
| `npm run build` | Compilación de producción |
| `npm run start` | Servir el build (`build` antes) |
| `npm run lint` | ESLint |

## Estado en el cliente

- **Carrito y favoritos:** Redux + persistencia (`redux-persist`).
- Sin cuentas de usuario ni Firebase.

## Assets del plantilla Next (`create-next-app`)

Siguen los mismos archivos por defecto de la plantilla **App Router + TypeScript**:

- [`src/app/favicon.ico`](src/app/favicon.ico)
- En [`public/`](public/): `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` (ilustraciones de ejemplo; la app no los importa hoy).

Si necesitas `robots.txt` u Open Graph en producción, conviene añadirlos aparte (no forman parte del scaffold mínimo).

## Tipos de TypeScript

`next-env.d.ts` está versionado; Next puede regenerarlo al ejecutar `dev`/`build`.
