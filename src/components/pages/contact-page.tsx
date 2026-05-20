export function ContactPageContent() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-2 text-5xl font-medium">Contáctanos</h1>
      <p className="mb-12 text-sm leading-tight text-black/60 dark:text-white/60">
        Estamos aquí para ayudarte. Escríbenos o visítanos en nuestra tienda física.
      </p>

      <div className="prose prose-sm max-w-none text-black/60 dark:prose-invert dark:text-white/60">
        <h2 className="text-sm uppercase tracking-wide text-neutral-500">Contacto</h2>
        <p>WhatsApp: +502 5012-3456</p>
        <p>Email: info@quechulito.com</p>
        <p>Ciudad de Guatemala, Zona 10</p>

        <h2 className="text-sm uppercase tracking-wide text-neutral-500">Horarios</h2>
        <p>Lunes a Viernes: 9:00 – 19:00</p>
        <p>Sábados: 9:00 – 18:00</p>
        <p>Domingos: 10:00 – 16:00</p>

        <h2 id="devoluciones" className="scroll-mt-24 text-sm uppercase tracking-wide text-neutral-500">
          Devoluciones
        </h2>
        <p>
          Escríbenos por WhatsApp o correo para coordinar devoluciones o cambios según disponibilidad.
        </p>
      </div>
    </div>
  );
}
