# 🚀 Inicio Rápido - ¡Qué Chulito!

## Pasos Iniciales

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
```bash
cp env.example .env.local
# Edita .env.local con tus credenciales de Firebase
```

### 3. Desarrollo Local
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
src/
├── app/                    # Páginas Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Homepage
│   ├── catalogo/          # Catálogo de productos
│   ├── checkout/          # Checkout → WhatsApp
│   └── about/             # Sobre nosotros
├── components/            # Componentes UI
│   ├── navbar.tsx        # Navegación
│   ├── cart-sidebar.tsx  # Carrito lateral
│   ├── footer.tsx         # Footer
│   └── theme-toggle.tsx  # Toggle tema
├── store/                # Redux
│   ├── index.ts          # Store config
│   └── slice/            # Slices
├── lib/
│   ├── firebase/         # Firebase client/admin
│   ├── domain/           # SOLID domain layer
│   ├── infrastructure/   # Implementaciones
│   ├── services/         # Servicios de negocio
│   └── utils/            # Utilidades
└── scripts/              # Scripts (seed)
```

## Características Implementadas

✅ **Arquitectura SOLID**
- Separation of Concerns
- Dependency Injection
- Repository Pattern
- Strategy Pattern
- Factory Pattern

✅ **Diseño Liquid Glass**
- Transparencias y blur
- Modo oscuro automático
- Efectos glass con backdrop-filter

✅ **Mobile First**
- Breakpoints ascendentes
- Touch targets 48px+
- Layouts fluidos
- Imágenes optimizadas

✅ **Firebase**
- Client SDK para frontend
- Admin SDK para backend
- Firestore con reglas de seguridad
- Modelo multi-categoría

✅ **Funcionalidades**
- Catálogo de productos
- Carrito de compras
- Checkout con WhatsApp
- Tema claro/oscuro
- Persistencia del carrito

## Próximos Pasos

1. **Configurar Firebase**
   - Crea proyecto en Firebase Console
   - Configura Firestore
   - Actualiza `.env.local`

2. **Poblar Datos**
   ```bash
   npm run seed
   ```

3. **Personalizar**
   - Edita productos en el seed
   - Modifica estilos en `globals.css`
   - Agrega más páginas según necesites

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## Comandos Útiles

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run start    # Servidor producción
npm run lint     # Linter
npm run seed     # Poblar Firestore
```

## Conceptos Clave

### Mobile First
El diseño prioriza móviles (ancho base < 640px) y escala hacia desktop.

### Liquid Glass
Efectos visuales con transparencias, blur y reflejos suaves inspirados en Apple.

### SOLID
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

### Patrones
- Strategy: Envío y descuentos
- Factory: Mensajes WhatsApp
- Repository: Acceso a datos
- Facade: OrderService

---

¡Disfruta construyendo tu ecommerce! 🎉

