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
        <h1 className="text-4xl font-bold mb-4">
          Algo salió mal
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          {error.message || "Ocurrió un error inesperado"}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={reset}
            className="px-8 py-4 rounded-full backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 font-semibold transition-all hover:scale-105 hover:bg-white/30 dark:hover:bg-black/30 shadow-xl"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="px-8 py-4 rounded-full backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-white/20 dark:border-white/10 font-semibold transition-all hover:scale-105 hover:bg-white/40 dark:hover:bg-black/40 shadow-2xl"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

