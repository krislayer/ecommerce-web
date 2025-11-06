"use client";

import { useFavorites } from "@/lib/hooks/useFavorites";

/**
 * Componente que inicializa la sincronización de favoritos con Firebase
 * Solo se ejecuta en el cliente para evitar problemas de hidratación
 */
export function FavoritesSync() {
  // Este hook maneja la sincronización automática cuando el usuario inicia/cierra sesión
  // Solo se ejecuta en el cliente, no causa problemas de SSR
  useFavorites();
  return null;
}

