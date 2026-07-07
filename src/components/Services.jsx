import Reveal from "./Reveal"

// Íconos de línea para cada servicio.
const I = {
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15.3 15.3 0 0 1 0 18M12 3a15.3 15.3 0 0 0 0 18" />
    </>
  ),
  software: (
    <>
      <rect x="3" y="4" width="18" height="8" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 8h.01M7 17h.01" />
    </>
  ),
  automation: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />,
  integration: (
    <>
      <path d="M9 17H7A5 5 0 0 1 7 7h2" />
      <path d="M15 7h2a5 5 0 0 1 0 10h-2" />
      <path d="M8 12h8" />
    </>
  ),
  support: (
    <>
      <path d="M12 22a10 10 0 1 0-10-10" />
      <path d="M2 12a10 10 0 0 0 10 10" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  design: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </>
  ),
}

function Icon({ paths, className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {paths}
    </svg>
  )
}

const SERVICIOS = [
  { icon: I.web, title: "Páginas web", text: "Sitios modernos, rápidos y responsivos que representan tu marca y convierten visitantes en clientes." },
  { icon: I.software, title: "Sistemas a medida", text: "Agendas, inventarios, clientes y reportes: software hecho exactamente para cómo funciona tu negocio." },
  { icon: I.automation, title: "Automatizaciones", text: "Conectamos tus herramientas y eliminamos el trabajo repetitivo. Menos tiempo perdido, más resultados." },
  { icon: I.integration, title: "Integraciones", text: "Pagos, WhatsApp, correo, APIs y más — todo conectado y trabajando en conjunto." },
  { icon: I.support, title: "Soporte y mantenimiento", text: "Te acompañamos también después de entregar: actualizaciones, mejoras y soporte continuo." },
  { icon: I.design, title: "Diseño UX/UI", text: "Interfaces limpias, intuitivas y con estilo, pensadas para que usar tu producto sea un placer." },
]

export default function Services() {
  return (
    <section id="servicios" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-nexo-blue">
            Lo que hacemos
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Todo lo que tu negocio necesita para crecer
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Desde la idea hasta el lanzamiento y más allá. Un solo equipo, soluciones completas.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICIOS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-nexo-blue ring-1 ring-inset ring-blue-100 transition-colors group-hover:from-nexo-blue group-hover:to-nexo-cyan group-hover:text-white group-hover:ring-transparent">
                  <Icon paths={s.icon} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
