import Reveal from "./Reveal"

const PASOS = [
  { n: "01", title: "Descubrimiento", text: "Entendemos tu negocio, tus objetivos y a quién le hablas. Definimos juntos el alcance." },
  { n: "02", title: "Diseño", text: "Prototipamos la solución: estructura, interfaz y experiencia, antes de escribir una línea de código." },
  { n: "03", title: "Desarrollo", text: "Construimos con tecnologías modernas, con avances visibles y comunicación constante." },
  { n: "04", title: "Entrega y soporte", text: "Lanzamos, capacitamos a tu equipo y seguimos acompañándote con mejoras y soporte." },
]

export default function Process() {
  return (
    <section id="proceso" className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28">
      {/* Fondo: cuadrícula sutil + resplandores */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)",
          }}
        />
        <div className="absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-nexo-blue/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 translate-x-1/2 rounded-full bg-nexo-cyan/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-nexo-cyan">
            Cómo trabajamos
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Un proceso claro, de principio a fin
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Sin sorpresas ni tecnicismos. Sabes en qué etapa vamos en todo momento.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Línea conectora (desktop) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PASOS.map((p, i) => (
              <Reveal key={p.n} delay={i * 100}>
                <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-nexo-blue to-nexo-cyan text-xl font-black text-white shadow-lg shadow-blue-500/30 ring-4 ring-slate-950">
                    {p.n}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
