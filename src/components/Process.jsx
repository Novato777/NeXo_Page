import Reveal from "./Reveal"

const PASOS = [
  { n: "01", title: "Descubrimiento", text: "Entendemos tu negocio, tus objetivos y a quién le hablas. Definimos juntos el alcance." },
  { n: "02", title: "Diseño", text: "Prototipamos la solución: estructura, interfaz y experiencia, antes de escribir código." },
  { n: "03", title: "Desarrollo", text: "Construimos con tecnologías modernas, con avances visibles y comunicación constante." },
  { n: "04", title: "Entrega y soporte", text: "Lanzamos, capacitamos a tu equipo y seguimos acompañándote con mejoras y soporte." },
]

export default function Process() {
  return (
    <section id="proceso" className="relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/40 to-white py-20 sm:py-28">
      {/* Puntos + blobs suaves */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="bg-dots absolute inset-0 opacity-40"
          style={{ maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent 80%)" }}
        />
        <div className="absolute left-1/2 top-8 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-indigo-200/25 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-nexo-indigo">
            Cómo trabajamos
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Un proceso claro, de principio a fin
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Sin sorpresas ni tecnicismos. Sabes en qué etapa vamos en todo momento.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Línea conectora (desktop) */}
          <div className="absolute left-8 right-8 top-9 hidden h-0.5 rounded-full bg-gradient-to-r from-nexo-indigo/40 via-nexo-blue/40 to-nexo-cyan/40 lg:block" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PASOS.map((p, i) => (
              <Reveal key={p.n} delay={i * 100}>
                <div className="gradient-ring group relative h-full rounded-3xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex items-center gap-4">
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-nexo-indigo to-nexo-cyan text-xl font-black text-white shadow-lg shadow-blue-500/25 ring-4 ring-white">
                      {p.n}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
