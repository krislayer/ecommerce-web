export default function Loading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="backdrop-blur-xl bg-white/30 dark:bg-black/30 p-8 rounded-2xl border border-white/20 dark:border-white/10 shadow-xl">
        <div className="animate-spin text-4xl">⏳</div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando...</p>
      </div>
    </div>
  );
}

