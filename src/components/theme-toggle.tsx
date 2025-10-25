"use client";

import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // Forzar tema dark siempre
    setTheme("dark");
  }, [setTheme]);

  if (!mounted) return null;

  return (
    <button 
      onClick={() => setTheme("dark")}
      className="glass-button-round"
    >
      <Moon className="w-5 h-5 text-white" />
    </button>
  );
}
