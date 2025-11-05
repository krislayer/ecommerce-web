"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center px-4 py-20">
      <div className="backdrop-blur-2xl bg-white/30 dark:bg-black/30 rounded-3xl p-12 border border-white/20 dark:border-white/10 shadow-2xl text-center max-w-2xl">
        <h1 className="mac-text-large-title mac-text-primary mb-mac-md">
          Algo salió mal
        </h1>
        <p className="mac-text-body mac-text-secondary mb-mac-lg">
          {error.message || "Ocurrió un error inesperado"}
        </p>
        <div className="flex gap-mac-md justify-center flex-wrap">
          <button
            onClick={reset}
            className="mac-button-primary"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="mac-button-secondary"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

