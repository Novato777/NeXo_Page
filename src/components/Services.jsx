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

const FEATURED = { icon: I.web, title: "Páginas web", text: "Sitios modernos, rápidos y responsivos que representan tu marca y convierten visitantes en clientes." }
const DARK = { icon: I.software, title: "Sistemas a medida", text: "Agendas, inventarios, clientes y reportes: software hecho exactamente para cómo funciona tu negocio." }
const COMPACT = [
  { icon: I.automation, title: "Automatizaciones", text: "Eliminamos el trabajo repetitivo conectando tus herramientas." },
  { icon: I.integration, title: "Integraciones", text: "Pagos, WhatsApp, correo y APIs, todo trabajando en conjunto." },
  { icon: I.support, title: "Soporte continuo", text: "Actualizaciones, mejoras y acompañamiento después de entregar." },
  { icon: I.design, title: "Diseño UX/UI", text: "Interfaces limpias e intuitivas, pensadas para tus usuarios." },
]

export default function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-20 sm:py-28">
      {/* Manchas de color de fondo (para que no se vea tan plano) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-nexo-blue">
            <span className="h-1.5 w-6 rounded-full bg-gradient-to-r from-nexo-indigo to-nexo-cyan" />
            Lo que hacemos
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Todo lo que tu negocio necesita para crecer
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Desde la idea hasta el lanzamiento y más allá. Un solo equipo, soluciones completas.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Destacada — azul → cian */}
          <Reveal className="sm:col-span-2">
            <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-nexo-blue to-nexo-cyan p-8 text-white shadow-xl shadow-blue-500/20">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-inset ring-white/30 backdrop-blur">
                <Icon paths={FEATURED.icon} className="h-7 w-7" />
              </span>
              <h3 className="relative mt-6 text-2xl font-bold">{FEATURED.title}</h3>
              <p className="relative mt-2 max-w-sm text-[15px] leading-relaxed text-white/90">{FEATURED.text}</p>
              <span className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-950 shadow">
                Nuestro fuerte
              </span>
            </div>
          </Reveal>

          {/* Destacada — indigo → azul */}
          <Reveal delay={90} className="sm:col-span-2">
            <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-nexo-indigo to-nexo-blue p-8 text-white shadow-xl shadow-indigo-500/20">
              <div className="pointer-events-none absolute -right-12 -top-8 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-14 -left-12 h-48 w-48 rounded-full bg-cyan-300/20 blur-2xl" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-inset ring-white/30 backdrop-blur">
                <Icon paths={DARK.icon} className="h-7 w-7" />
              </span>
              <h3 className="relative mt-6 text-2xl font-bold">{DARK.title}</h3>
              <p className="relative mt-2 max-w-sm text-[15px] leading-relaxed text-white/90">{DARK.text}</p>
              <span className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider ring-1 ring-inset ring-white/25">
                A tu medida
              </span>
            </div>
          </Reveal>

          {/* Compactas */}
          {COMPACT.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="group h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-nexo-blue/30 hover:shadow-xl">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 text-nexo-blue ring-1 ring-inset ring-blue-100 transition-colors group-hover:from-nexo-indigo group-hover:to-nexo-cyan group-hover:text-white group-hover:ring-transparent">
                  <Icon paths={s.icon} />
                </span>
                <h3 className="mt-5 text-base font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
