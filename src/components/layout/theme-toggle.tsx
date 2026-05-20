"use client";

import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { iconControlClassName, iconControlGlyphClassName } from "@/lib/ui/icon-control";

type ThemeToggleProps = {
  variant?: "default" | "icon";
};

export function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro";

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={clsx(iconControlClassName, "shrink-0")}
        aria-label={label}
        aria-pressed={isDark}
      >
        {!mounted ? (
          <Moon className={clsx(iconControlGlyphClassName, "w-4")} aria-hidden />
        ) : isDark ? (
          <Sun className={clsx(iconControlGlyphClassName, "w-4")} aria-hidden />
        ) : (
          <Moon className={clsx(iconControlGlyphClassName, "w-4")} aria-hidden />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={clsx(
        "flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 text-xs text-black transition-colors dark:border-neutral-700 dark:text-white",
      )}
      aria-label={label}
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
