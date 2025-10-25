# Liquid Glass UI System

Este proyecto ahora incluye un sistema completo de componentes con efectos de cristal líquido (liquid glass) avanzados, inspirado en el diseño moderno de interfaces de usuario.

## 🎨 Características Principales

### Efectos de Cristal Líquido Avanzados
- **Backdrop blur** con múltiples niveles de intensidad
- **Gradientes internos** que simulan reflexiones de luz
- **Sombras múltiples** para profundidad y realismo
- **Transiciones suaves** en todas las interacciones
- **Efectos hover** con transformaciones sutiles

### Componentes Disponibles

#### 1. AdvancedLiquidGlassCard
Componente principal con efectos avanzados de cristal líquido.

```tsx
<AdvancedLiquidGlassCard 
  variant="hero"
  backgroundImage="https://example.com/image.jpg"
  className="mb-8"
>
  <div className="text-center">
    <h1 className="text-white">Título</h1>
    <p className="text-white/90">Descripción</p>
  </div>
</AdvancedLiquidGlassCard>
```

**Props:**
- `variant`: 'default' | 'hero' | 'product' | 'feature'
- `backgroundImage`: URL de imagen de fondo opcional
- `hover`: boolean para efectos hover
- `className`: clases CSS adicionales

#### 2. LiquidGlassButton
Botones con efectos de cristal líquido y gradientes internos.

```tsx
<LiquidGlassButton 
  variant="primary" 
  size="lg"
  onClick={() => console.log('Clicked')}
>
  <svg>...</svg>
</LiquidGlassButton>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'round'
- `size`: 'sm' | 'md' | 'lg'
- `onClick`: función de callback
- `disabled`: boolean

#### 3. StatusIndicator
Indicadores de estado con animaciones.

```tsx
<StatusIndicator status="listening" label="Escuchando" />
```

**Props:**
- `status`: 'listening' | 'processing' | 'idle' | 'error'
- `label`: texto personalizado opcional

#### 4. AudioVisualizer
Visualizador de audio con barras animadas.

```tsx
<AudioVisualizer bars={7} height="md" />
```

**Props:**
- `bars`: número de barras (default: 7)
- `height`: 'sm' | 'md' | 'lg'
- `className`: clases CSS adicionales

### Clases CSS Disponibles

#### Componentes Base
- `.glass-card` - Tarjeta principal con efectos avanzados
- `.glass-button` - Botón con efectos de cristal líquido
- `.glass-button-round` - Botón redondo
- `.glass-input` - Input con efectos glass
- `.glass-panel` - Panel con efectos glass
- `.glass-interactive` - Elemento interactivo

#### Utilidades
- `.glass-secondary` - Variante secundaria con menos prominencia
- `.glass-button-primary` - Botón principal con sombras adicionales
- `.hover-lift` - Efecto de elevación en hover
- `.fade-in` - Animación de aparición suave

## 🎯 Implementación

### Estilos Globales
Los estilos están definidos en `src/app/globals.css` con:
- Variables CSS para temas claro/oscuro
- Efectos de backdrop-filter optimizados
- Gradientes internos con pseudo-elementos
- Animaciones y transiciones suaves
- Media queries para responsive design

### Configuración de Tailwind
El archivo `tailwind.config.ts` incluye:
- Colores personalizados para glass
- Backdrop blur adicionales
- Animaciones personalizadas
- Sombras específicas para glass
- Utilidades personalizadas

## 📱 Responsive Design

El sistema incluye ajustes automáticos para:
- **Desktop**: Efectos completos con gradientes y sombras
- **Tablet**: Ajustes de tamaño y espaciado
- **Mobile**: Optimización de touch targets y legibilidad
- **Small screens**: Reducción de efectos para mejor rendimiento

## 🌙 Soporte de Temas

- **Tema Claro**: Fondos blancos translúcidos con bordes sutiles
- **Tema Oscuro**: Fondos oscuros translúcidos con bordes más visibles
- **Transiciones**: Cambios suaves entre temas
- **Variables CSS**: Colores adaptativos automáticos

## 🚀 Páginas Actualizadas

### Página Principal (`/`)
- Hero section con imagen de fondo
- Botón de micrófono interactivo
- Visualizador de audio
- Indicadores de estado
- Grid de características

### Catálogo (`/catalogo`)
- Header con imagen de fondo
- Filtros y búsqueda con efectos glass
- Cards de productos mejoradas

### Checkout (`/checkout`)
- Header con imagen de fondo
- Formularios con inputs glass
- Resumen de pedido estilizado

### Contacto (`/contact`)
- Header con imagen de fondo
- Grid de información de contacto
- Botones de redes sociales

### Demo (`/liquid-glass-demo`)
- Página de demostración completa
- Todos los componentes en acción
- Ejemplos de uso

## 🎨 Personalización

### Colores
```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.5);
  --glass-border: rgba(255, 255, 255, 0.6);
  --glass-hover: rgba(255, 255, 255, 0.6);
}
```

### Efectos
```css
.glass-card {
  backdrop-filter: blur(40px);
  box-shadow: inset 0 1px 0px rgba(255,255,255,0.75), 
              0 0 9px rgba(0,0,0,0.2), 
              0 3px 8px rgba(0,0,0,0.15);
}
```

## 🔧 Mantenimiento

- Los componentes son completamente reutilizables
- Los estilos están centralizados en globals.css
- Fácil personalización mediante variables CSS
- Compatible con temas claro/oscuro
- Optimizado para rendimiento

## 📈 Rendimiento

- Efectos CSS optimizados para GPU
- Transiciones suaves sin jank
- Lazy loading de imágenes de fondo
- Media queries para reducir efectos en móvil
- Soporte para `prefers-reduced-motion`

---

¡El sistema de Liquid Glass UI está listo para usar! Todos los componentes están optimizados para rendimiento, accesibilidad y experiencia de usuario moderna.
