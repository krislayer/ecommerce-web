'use client'

import { ReactNode } from 'react'

interface LiquidGlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function LiquidGlassCard({ children, className = '', hover = true }: LiquidGlassCardProps) {
  return (
    <div className={`glass-card ${hover ? 'hover-lift' : ''} ${className}`}>
      {children}
    </div>
  )
}
