# ¡Qué Chulito! - Ecommerce Guatemala

Ecommerce moderno para Guatemala con diseño Liquid Glass, mobile-first y arquitectura SOLID.

## 🚀 Tecnologías

- **Next.js 16** (App Router, React 19, TypeScript)
- **TailwindCSS v4** (Design Tokens, modo oscuro)
- **Redux Toolkit** + RTK Query + redux-persist
- **Firebase** (Hosting, Functions, Firestore, Auth)
- **next-themes** (tema claro/oscuro)
- **zod** (validación)

## 📦 Instalación

```bash
npm install
```

## ⚙️ Configuración

1. Copia `.env.local.example` a `.env.local`
2. Configura tus credenciales de Firebase
3. Ejecuta el seed de datos iniciales:

```bash
npm run seed
```

## 🏃 Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 🏗️ Build

```bash
npm run build
npm start
```

## 🚀 Deploy a Firebase

```bash
firebase login
firebase init
firebase deploy
```

## 📱 Características

- ✅ Diseño Liquid Glass mobile-first
- ✅ Arquitectura SOLID + Patrones de Diseño
- ✅ Firestore optimizado multi-categoría
- ✅ Checkout vía WhatsApp
- ✅ Modo oscuro automático
- ✅ Accesibilidad WCAG básica
- ✅ SEO optimizado

## 🏗️ Arquitectura

```
src/
├── app/              # Pages (App Router)
├── components/       # UI Liquid Glass
├── store/           # Redux Toolkit
├── lib/
│   ├── firebase/    # Client + Admin SDK
│   ├── domain/      # Entities, Repositories, Services
│   ├── infrastructure/ # Firestore implementations
│   ├── services/    # OrderService, WhatsAppFactory
│   └── utils/       # Helpers
├── scripts/         # Seed scripts
└── seeds/           # Data seeds
```

## 🧪 Testing

```bash
npm run lint
```

## 📄 Licencia

MIT
