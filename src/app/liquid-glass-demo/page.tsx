"use client";

import { AdvancedLiquidGlassCard, LiquidGlassButton, StatusIndicator, AudioVisualizer } from "@/components/advanced-liquid-glass-card";
import { LiquidGlassCard } from "@/components/liquid-glass-card";

export default function LiquidGlassDemo() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 fade-in">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-adaptive-primary">
          Liquid Glass UI Demo
        </h1>
        <p className="text-xl text-adaptive-secondary">
          Demostración de los nuevos componentes con efectos de cristal líquido avanzados
        </p>
      </div>

      {/* Hero Card con imagen de fondo */}
      <div className="mb-16">
        <AdvancedLiquidGlassCard 
          variant="hero"
          className="mb-8"
        >
          <div className="text-center mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium opacity-90">AI Voice Assistant</span>
              <StatusIndicator status="listening" />
            </div>
            
            <div className="text-center mb-4">
              <LiquidGlassButton 
                variant="primary" 
                size="lg"
                onClick={() => console.log('Voice activated')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                  <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                  <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291A6.751 6.751 0 0 1 5.25 12.75v-1.5A.75.75 0 0 1 6 10.5Z" />
                </svg>
              </LiquidGlassButton>
            </div>
            
            <div className="mb-4">
              <AudioVisualizer bars={7} height="md" />
              <p className="text-center text-xs opacity-70 mt-2">Say "Hey AI" to start speaking</p>
            </div>
          </div>
        </AdvancedLiquidGlassCard>
      </div>

      {/* Grid de componentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Card básica */}
        <AdvancedLiquidGlassCard variant="hero">
          <h3 className="text-xl font-semibold text-white mb-3">Card Básica</h3>
          <p className="text-white/90 mb-4">
            Esta es una tarjeta básica con efecto de cristal líquido mejorado.
          </p>
          <button className="glass-button px-4 py-2">
            <span className="text-adaptive-primary relative z-10">Acción</span>
          </button>
        </AdvancedLiquidGlassCard>

        {/* Card de producto */}
        <AdvancedLiquidGlassCard variant="hero">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 glass-button-round flex items-center justify-center">
              <svg className="w-10 h-10 text-adaptive-primary relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Producto Premium</h3>
            <p className="text-white/90 text-sm mb-3">
              Descripción del producto con efecto glass
            </p>
            <div className="text-2xl font-bold text-white">Q299.00</div>
          </div>
        </AdvancedLiquidGlassCard>

        {/* Card de característica */}
        <AdvancedLiquidGlassCard variant="hero">
          <h3 className="text-xl font-semibold text-white mb-3">Característica</h3>
          <p className="text-white/90 mb-4">
            Descripción de una característica importante del producto o servicio.
          </p>
          <div className="flex gap-2">
            <LiquidGlassButton variant="primary" size="sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </LiquidGlassButton>
            <LiquidGlassButton variant="secondary" size="sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </LiquidGlassButton>
          </div>
        </AdvancedLiquidGlassCard>

        {/* Estados de indicadores */}
        <AdvancedLiquidGlassCard variant="hero">
          <h3 className="text-xl font-semibold text-white mb-4">Estados</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/90">Escuchando:</span>
              <StatusIndicator status="listening" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/90">Procesando:</span>
              <StatusIndicator status="processing" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/90">Inactivo:</span>
              <StatusIndicator status="idle" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/90">Error:</span>
              <StatusIndicator status="error" />
            </div>
          </div>
        </AdvancedLiquidGlassCard>

        {/* Visualizador de audio */}
        <AdvancedLiquidGlassCard variant="hero">
          <h3 className="text-xl font-semibold text-white mb-4">Visualizador de Audio</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-white/90 mb-2">Pequeño:</p>
              <AudioVisualizer bars={5} height="sm" />
            </div>
            <div>
              <p className="text-sm text-white/90 mb-2">Mediano:</p>
              <AudioVisualizer bars={7} height="md" />
            </div>
            <div>
              <p className="text-sm text-white/90 mb-2">Grande:</p>
              <AudioVisualizer bars={9} height="lg" />
            </div>
          </div>
        </AdvancedLiquidGlassCard>

        {/* Botones de diferentes tamaños */}
        <AdvancedLiquidGlassCard variant="hero">
          <h3 className="text-xl font-semibold text-white mb-4">Botones</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <LiquidGlassButton variant="primary" size="sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </LiquidGlassButton>
              <LiquidGlassButton variant="primary" size="md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </LiquidGlassButton>
              <LiquidGlassButton variant="primary" size="lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </LiquidGlassButton>
            </div>
            <div className="flex items-center gap-4">
              <LiquidGlassButton variant="secondary" size="sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </LiquidGlassButton>
              <LiquidGlassButton variant="secondary" size="md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </LiquidGlassButton>
              <LiquidGlassButton variant="secondary" size="lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </LiquidGlassButton>
            </div>
          </div>
        </AdvancedLiquidGlassCard>
      </div>

      {/* Sección de botones tradicionales */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-adaptive-primary">
          Botones Tradicionales con Glass Effect
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="glass-button px-6 py-3">
            <span className="text-adaptive-primary font-semibold relative z-10">Botón Principal</span>
          </button>
          <button className="glass-button px-6 py-3">
            <span className="text-adaptive-primary font-semibold relative z-10">Botón Secundario</span>
          </button>
          <button className="glass-button-round">
            <svg className="w-6 h-6 text-adaptive-primary relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
