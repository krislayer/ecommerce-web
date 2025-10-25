'use client'

import { ReactNode } from 'react'

interface AdvancedLiquidGlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  backgroundImage?: string
  variant?: 'default' | 'hero' | 'product' | 'feature'
}

export function AdvancedLiquidGlassCard({ 
  children, 
  className = '', 
  hover = true, 
  backgroundImage,
  variant = 'default'
}: AdvancedLiquidGlassCardProps) {
  const baseClasses = "relative text-white bg-black/20 border border-white/50 backdrop-blur-sm rounded-lg shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] transition-all duration-200 before:content-[''] before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:content-[''] after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none p-4"

  const hoverClasses = hover ? "hover:bg-black/30 hover:border-white/60" : ""

  const containerClasses = backgroundImage 
    ? "flex items-center justify-center w-full min-h-[400px] bg-cover bg-center bg-no-repeat rounded-md"
    : "relative w-full"

  const style = backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : {}

  return (
    <div className={`${containerClasses} ${className}`} style={style}>
      <div className="relative w-full">
        <div className={`${baseClasses} ${hoverClasses}`}>
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente específico para botones con efecto de cristal líquido
interface LiquidGlassButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'round'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export function LiquidGlassButton({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  size = 'md',
  disabled = false
}: LiquidGlassButtonProps) {
  const baseClasses = "inline-flex items-center justify-center bg-white/20 border border-white/30 backdrop-blur-sm rounded-full shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] hover:bg-white/30 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-white/60 relative overflow-hidden"
  
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16", 
    lg: "w-20 h-20"
  }

  const variantClasses = {
    primary: "bg-white/20 hover:bg-white/30",
    secondary: "bg-black/20 hover:bg-black/30",
    round: "rounded-full"
  }

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : ""

  return (
    <button 
      type="button"
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/60 via-transparent to-transparent opacity-70 pointer-events-none" />
      <div className="absolute inset-0 rounded-full bg-linear-to-tl from-white/30 via-transparent to-transparent opacity-50 pointer-events-none" />
      <div className="relative z-10 group-hover:scale-105 transition-transform duration-200">
        {children}
      </div>
    </button>
  )
}

// Componente para indicadores de estado (como el ejemplo del micrófono)
interface StatusIndicatorProps {
  status: 'listening' | 'processing' | 'idle' | 'error'
  label?: string
}

export function StatusIndicator({ status, label }: StatusIndicatorProps) {
  const statusConfig = {
    listening: { color: 'bg-green-400', text: 'Escuchando' },
    processing: { color: 'bg-yellow-400', text: 'Procesando' },
    idle: { color: 'bg-gray-400', text: 'Inactivo' },
    error: { color: 'bg-red-400', text: 'Error' }
  }

  const config = statusConfig[status]

  return (
    <div className="flex items-center gap-1">
      <div className={`w-1 h-1 ${config.color} rounded-full animate-pulse`} />
      <span className="text-xs opacity-70">{label || config.text}</span>
    </div>
  )
}

// Componente para visualizador de audio (como las barras del ejemplo)
interface AudioVisualizerProps {
  bars?: number
  height?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AudioVisualizer({ bars = 7, height = 'md', className = '' }: AudioVisualizerProps) {
  const heightClasses = {
    sm: 'h-2',
    md: 'h-4', 
    lg: 'h-6'
  }

  const heights = [4, 6, 3, 8, 2, 5, 7] // Alturas fijas para el efecto visual

  return (
    <div className={`flex justify-center items-center gap-1 ${className}`}>
      {Array.from({ length: bars }).map((_, index) => (
        <div 
          key={index}
          className={`w-1 ${heightClasses[height]} bg-white/70 rounded-full animate-pulse`}
          style={{ 
            height: `${heights[index % heights.length] * 0.25}rem`,
            animationDelay: `${index * 100}ms`
          }}
        />
      ))}
    </div>
  )
}

// Componente específico para cart-sidebar que omite configuraciones problemáticas pero mantiene TODO el diseño
interface AdvancedLiquidGlassCardCartSidebarProps {
  children: ReactNode
  className?: string
}

export function AdvancedLiquidGlassCardCartSidebar({ 
  children, 
  className = ''
}: AdvancedLiquidGlassCardCartSidebarProps) {
  // Versión ultra-simplificada: solo estilos glass sin wrappers que interfieran
  const baseClasses = "relative text-white bg-black/20 border border-white/50 backdrop-blur-sm rounded-lg shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] hover:bg-black/30 hover:border-white/60 transition-all duration-200 before:content-[''] before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:content-[''] after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none p-4"

  return (
    <div className={`${baseClasses} ${className}`}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
