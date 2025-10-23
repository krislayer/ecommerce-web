"use client";

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
      <span className="text-adaptive-primary">{theme === "dark" ? "☀️" : "🌙"}</span>
    </button>
  );
}
