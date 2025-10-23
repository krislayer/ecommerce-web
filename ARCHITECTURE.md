# 🏗️ Arquitectura del Proyecto

## Principios SOLID

### Single Responsibility Principle (SRP)
- Cada componente/clase tiene una única responsabilidad
- `OrderService`: solo gestión de pedidos
- `ProductRepository`: solo acceso a productos
- `CartSidebar`: solo UI del carrito

### Open/Closed Principle (OCP)
- Las estrategias de envío son extensibles sin modificar código existente
- `IShippingStrategy` permite agregar nuevos métodos sin cambios
- `IDiscountStrategy` permite nuevos tipos de descuento

### Liskov Substitution Principle (LSP)
- Los repositorios son intercambiables
- `FirestoreProductRepository` puede sustituir cualquier implementación de `IProductRepository`

### Interface Segregation Principle (ISP)
- Interfaces pequeñas y específicas
- `IProductRepository` separado de `ICategoryRepository`
- `IShippingStrategy` separado de `IDiscountStrategy`

### Dependency Inversion Principle (DIP)
- Dependencias inyectadas por interfaces
- `OrderService` depende de `IOrderRepository`, no de implementación concreta
- Servicios inyectan estrategias por interfaces

## Patrones de Diseño

### Strategy Pattern
```typescript
// shipping-strategy.ts
interface IShippingStrategy {
  calculate(weight: number): number;
}

class PickupStrategy implements IShippingStrategy { }
class LocalDeliveryStrategy implements IShippingStrategy { }
```

### Factory Pattern
```typescript
// whatsapp-factory.ts
class WhatsAppMessageFactory {
  createOrderMessage(order: Order): string { }
}
```

### Repository Pattern
```typescript
// product.repository.ts
interface IProductRepository {
  findById(id: string): Promise<Product>;
}

class FirestoreProductRepository implements IProductRepository { }
```

### Facade Pattern
```typescript
// order.service.ts
class OrderService {
  // Simplifica operaciones complejas de pedidos
  async createOrder(...) { }
}
```

### Observer Pattern
```typescript
// EventBus para eventos reactivos
emit('order:created', order);
```

## Capas de la Aplicación

### Presentation Layer (`app/`, `components/`)
- Páginas Next.js App Router
- Componentes React UI
- Liquid Glass styling

### Application Layer (`lib/services/`)
- Lógica de negocio
- Orquestación de operaciones
- Servicios de alto nivel

### Domain Layer (`lib/domain/`)
- Entidades (`entities/`)
- Interfaces de repositorios (`repositories/`)
- Servicios de dominio (`services/`)

### Infrastructure Layer (`lib/infrastructure/`)
- Implementaciones de repositorios
- Adaptadores de Firebase
- Acceso a datos

### Data Layer (`firebase/`)
- Configuración Firestore
- Reglas de seguridad
- Indexes

## Flujo de Datos

```
User Action
    ↓
Component (Presentation)
    ↓
Redux Action (State Management)
    ↓
Service (Application)
    ↓
Repository Interface (Domain)
    ↓
Firestore Implementation (Infrastructure)
    ↓
Firebase Firestore (Data)
```

## Estado Global (Redux)

### Slices
- `cartSlice`: Estado del carrito
- `authSlice`: Estado de autenticación

### Persistencia
- `redux-persist` para carrito y auth
- Persistencia local en navegador

## Optimizaciones

### Firestore
- Colecciones cacheables: `catalog_summaries`, `product_variants_compact`
- Lecturas mínimas con consultas eficientes
- Indexes en Firestore para búsquedas rápidas

### Next.js
- App Router con Server Components
- Image optimization con `next/image`
- CSS con Tailwind v4

### Mobile First
- Breakpoints ascendentes (`sm:`, `md:`, `lg:`)
- Touch targets mínimos de 48px
- Imágenes optimizadas con `sizes` attribute

## Seguridad

### Firestore Rules
- Productos: solo lectura pública
- Usuarios: lectura/escritura propia
- Pedidos: creación pública, lectura propia
- Solo Admin SDK puede modificar productos/categorías

### Variables de Entorno
- Credenciales en `.env.local`
- No commitear credenciales
- Admin SDK solo en server-side

## Escalabilidad

### Multi-categoría
- Modelo `categories` con `facetDefs`
- Productos con `facets` array
- Búsqueda y filtrado por facetas

### Caching
- Redux cache de productos
- localStorage persistencia
- Catalog summaries en Firestore

## Testing (Futuro)

```typescript
// Unit tests para servicios
test('OrderService calculates total correctly', () => {});

// Integration tests para repositorios
test('FirestoreProductRepository finds product', () => {});

// E2E tests para flujos críticos
test('User can add product to cart and checkout', () => {});
```

