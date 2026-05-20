"use client";

import { searchPath } from "@/lib/paths";
import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("welcome-toast=2")) {
      toast("🛍️ Bienvenido a ¡Qué Chulito!", {
        id: "welcome-toast",
        duration: Infinity,
        onDismiss: () => {
          document.cookie = "welcome-toast=2; max-age=31536000; path=/";
        },
        description: (
          <>
            Moda y estilo para toda la familia en Guatemala.{" "}
            <a href={searchPath()} className="text-blue-600 hover:underline">
              Ver catálogo
            </a>
            .
          </>
        ),
      });
    }
  }, []);

  return null;
}
