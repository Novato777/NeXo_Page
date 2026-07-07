import Reveal from "./Reveal"

const PASOS = [
  { n: "01", title: "Descubrimiento", text: "Entendemos tu negocio, tus objetivos y a quién le hablas. Definimos juntos el alcance." },
  { n: "02", title: "Diseño", text: "Prototipamos la solución: estructura, interfaz y experiencia, antes de escribir código." },
  { n: "03", title: "Desarrollo", text: "Construimos con tecnologías modernas, con avances visibles y comunicación constante." },
  { n: "04", title: "Entrega y soporte", text: "Lanzamos, capacitamos a tu equipo y seguimos acompañándote con mejoras y soporte." },
]

export default function Process() {
  return (
    <section id="proceso" className="relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/40 to-white py-14 sm:py-28">
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
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-nexo-indigo">
            <span className="h-1.5 w-6 rounded-full bg-gradient-to-r from-nexo-indigo to-nexo-cyan" />
            Cómo trabajamos
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Un proceso claro, de principio a fin
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Sin sorpresas ni tecnicismos. Sabes en qué etapa vamos en todo momento.
          </p>
        </Reveal>

        <div className="relative mt-12 sm:mt-16">
          {/* Línea conectora — vertical en móvil, horizontal en desktop */}
          <div className="absolute left-7 top-8 bottom-8 w-0.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-nexo-indigo/50 via-nexo-blue/40 to-nexo-cyan/40 lg:hidden" />
          <div className="absolute left-8 right-8 top-8 hidden h-0.5 rounded-full bg-gradient-to-r from-nexo-indigo/40 via-nexo-blue/40 to-nexo-cyan/40 lg:block" />

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-4 lg:gap-6">
            {PASOS.map((p, i) => (
              <Reveal key={p.n} delay={i * 100}>
                <div className="relative flex flex-row items-start gap-4 lg:flex-col lg:gap-0">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-nexo-indigo to-nexo-cyan text-lg font-black text-white shadow-lg shadow-blue-500/25 ring-4 ring-white sm:h-16 sm:w-16 sm:text-xl">
                    {p.n}
                  </span>
                  <div className="pt-1 lg:mt-5 lg:pt-0">
                    <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
