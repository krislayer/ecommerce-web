"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Componente para prevenir la restauración automática de scroll
 * que Next.js realiza después de refrescar la página.
 * Esto soluciona el problema de scroll gradual que sube "de poco en poco".
 */
export function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Prevenir la restauración automática de scroll
    if (typeof window !== "undefined") {
      // Scroll inmediato al top sin animación
      window.scrollTo(0, 0);
      
      // Prevenir que el navegador restaure la posición de scroll
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    }
  }, [pathname]);

  return null;
}

