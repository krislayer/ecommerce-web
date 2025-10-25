"use client";

import Link from "next/link";
import { LiquidGlassCard } from "@/components/liquid-glass-card";
import { AdvancedLiquidGlassCard, LiquidGlassButton, StatusIndicator, AudioVisualizer } from "@/components/advanced-liquid-glass-card";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 fade-in">
      <div className="text-center">
        {/* Hero Section con efecto avanzado */}
        <AdvancedLiquidGlassCard 
          className="mb-4"
          variant="hero"
        >
          <div className="text-center mb-4">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 text-white">
              ¡Qué Chulito!
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-6">
              Moda y estilo para toda la familia
            </p>
            
            {/* Botón central con efecto de micrófono */}
            <div className="mb-4">
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

            {/* Visualizador de audio */}
            <div className="mb-4">
              <AudioVisualizer bars={7} height="md" />
              <p className="text-center text-sm text-white/70 mt-2">
                Di "Hola" para comenzar a explorar
              </p>
            </div>

            {/* Indicador de estado */}
            <div className="flex justify-center">
              <StatusIndicator status="listening" label="Escuchando" />
            </div>
          </div>
        </AdvancedLiquidGlassCard>
        
        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/catalogo" className="glass-button px-8 py-4">
            <span className="text-white font-semibold relative z-10">Ver Catálogo</span>
          </Link>
          <Link href="/about" className="glass-button px-8 py-4">
            <span className="text-white font-semibold relative z-10">Sobre Nosotros</span>
          </Link>
        </div>

        {/* Sección de características */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <AdvancedLiquidGlassCard variant="hero" className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto glass-button-round flex items-center justify-center">
                <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Envío Rápido</h3>
            <p className="text-white/90">Entrega en 24-48 horas en toda Guatemala</p>
          </AdvancedLiquidGlassCard>

          <AdvancedLiquidGlassCard variant="hero" className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto glass-button-round flex items-center justify-center">
                <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Calidad Premium</h3>
            <p className="text-white/90">Productos seleccionados con los mejores materiales</p>
          </AdvancedLiquidGlassCard>

          <AdvancedLiquidGlassCard variant="hero" className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto glass-button-round flex items-center justify-center">
                <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Soporte 24/7</h3>
            <p className="text-white/90">Atención al cliente disponible siempre</p>
          </AdvancedLiquidGlassCard>
        </div>
      </div>
    </div>
  );
}
