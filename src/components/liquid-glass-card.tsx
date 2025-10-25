'use client'

import { ReactNode } from 'react'

interface LiquidGlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  variant?: 'default' | 'hero' | 'product' | 'feature'
}

export function LiquidGlassCard({ 
  children, 
  className = '', 
  hover = true, 
  variant = 'default'
}: LiquidGlassCardProps) {
  const baseClasses = "glass-card"
  
  const variantClasses = {
    default: "p-4",
    hero: "p-6 sm:p-12",
    product: "p-4",
    feature: "p-6"
  }

  const hoverClasses = hover ? 'hover-lift' : ''

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
