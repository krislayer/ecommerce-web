"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={isDark}
    >
      <span className="flex px-3">
        {!mounted ? (
          <Moon className="h-3.5 w-3.5" aria-hidden />
        ) : isDark ? (
          <Sun className="h-3.5 w-3.5" aria-hidden />
        ) : (
          <Moon className="h-3.5 w-3.5" aria-hidden />
        )}
      </span>
      <hr className="h-full border-r border-neutral-200 dark:border-neutral-700" />
      <span className="px-3">{!mounted ? "Tema" : isDark ? "Claro" : "Oscuro"}</span>
    </button>
  );
}
