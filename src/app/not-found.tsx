import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-5xl font-medium">404</p>
      <p className="mt-4 text-sm text-black/60 dark:text-white/60">Esta página no existe.</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
