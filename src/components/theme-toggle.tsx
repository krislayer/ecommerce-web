"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button 
      onClick={toggleTheme}
      className="mac-touch-target flex items-center justify-center rounded-full hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors"
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? (
        <Sun className="mac-icon-medium mac-text-primary" />
      ) : (
        <Moon className="mac-icon-medium mac-text-primary" />
      )}
    </button>
  );
}
