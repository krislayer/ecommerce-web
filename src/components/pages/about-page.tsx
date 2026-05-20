export function AboutPageContent() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-2 text-5xl font-medium">Sobre nosotros</h1>
      <p className="mb-12 text-sm leading-tight text-black/60 dark:text-white/[60%]">
        ¡Qué Chulito! es tu tienda de moda y estilo en Guatemala.
      </p>
      <div className="prose prose-sm max-w-none text-black/60 dark:prose-invert dark:text-white/[60%]">
        <p>
          Hacemos la moda accesible para todos en Guatemala, ofreciendo productos de calidad a precios justos
          con un servicio excepcional.
        </p>
        <p>
          WhatsApp: +502 5012-3456 · info@quechulito.com · Zona 10, Ciudad de Guatemala
        </p>
      </div>
    </div>
  );
}
