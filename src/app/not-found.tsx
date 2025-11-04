import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center px-4 py-20">
      <div className="backdrop-blur-2xl bg-white/30 dark:bg-black/30 rounded-3xl p-12 border border-white/20 dark:border-white/10 shadow-2xl text-center">
        <h1 className="text-8xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
          Página no encontrada
        </p>
        <Link
          href="/"
          className="px-8 py-4 rounded-full backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-white/20 dark:border-white/10 font-semibold mac-transition-all hover:scale-[1.02] hover:bg-white/40 dark:hover:bg-black/40 shadow-2xl"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

