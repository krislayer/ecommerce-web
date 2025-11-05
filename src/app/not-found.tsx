import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center px-4 py-20">
      <div className="backdrop-blur-2xl bg-white/30 dark:bg-black/30 rounded-3xl p-12 border border-white/20 dark:border-white/10 shadow-2xl text-center">
        <h1 className="mac-text-404 mac-text-primary mb-mac-md">404</h1>
        <p className="mac-text-title-3 mac-text-secondary mb-mac-lg">
          Página no encontrada
        </p>
        <Link
          href="/"
          className="mac-button-primary"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

