"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Mostrar un placeholder mientras se monta para evitar parpadeo
    return (
      <div className="mac-touch-target flex items-center justify-center rounded-full">
        <Moon className="mac-icon-medium mac-text-secondary" />
      </div>
    );
  }

  const toggleTheme = () => {
    // Usar resolvedTheme para obtener el tema actual real (resuelto)
    // Si está en modo oscuro, cambiar a claro, y viceversa
    // Si está en "system", cambiar según el tema resuelto
    const currentTheme = resolvedTheme || theme;
    
    if (currentTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  // Determinar qué icono mostrar basado en el tema resuelto
  const isDark = resolvedTheme === "dark";

  return (
    <button 
      onClick={toggleTheme}
      className="mac-touch-target flex items-center justify-center rounded-full hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={isDark}
      title={theme === "system" ? "Tema del sistema" : `Modo ${isDark ? "oscuro" : "claro"}`}
    >
      {isDark ? (
        <Sun className="mac-icon-medium mac-text-primary" />
      ) : (
        <Moon className="mac-icon-medium mac-text-primary" />
      )}
    </button>
  );
}
