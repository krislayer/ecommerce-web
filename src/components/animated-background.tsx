'use client'

import { ReactNode } from 'react'

export function AnimatedBackground({ children }: { children: ReactNode }) {
  return (
    <div className="animated-background dark">
      {/* Orbes de fondo animados */}
      <div className="background-orb-1" />
      <div className="background-orb-2" />
      <div className="background-orb-3" />
      
      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

