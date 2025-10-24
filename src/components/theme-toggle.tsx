"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="glass-button-round"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-adaptive-primary" />
      ) : (
        <Moon className="w-5 h-5 text-adaptive-primary" />
      )}
    </button>
  );
}
