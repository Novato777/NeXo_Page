import Reveal from "./Reveal"

const PASOS = [
  { n: "01", title: "Descubrimiento", text: "Entendemos tu negocio, tus objetivos y a quién le hablas. Definimos juntos el alcance." },
  { n: "02", title: "Diseño", text: "Prototipamos la solución: estructura, interfaz y experiencia, antes de escribir una línea de código." },
  { n: "03", title: "Desarrollo", text: "Construimos con tecnologías modernas, con avances visibles y comunicación constante." },
  { n: "04", title: "Entrega y soporte", text: "Lanzamos, capacitamos a tu equipo y seguimos acompañándote con mejoras y soporte." },
]

export default function Process() {
  return (
    <section id="proceso" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-nexo-blue">
            Cómo trabajamos
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Un proceso claro, de principio a fin
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Sin sorpresas ni tecnicismos. Sabes en qué etapa vamos en todo momento.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((p, i) => (
            <Reveal key={p.n} delay={i * 90}>
              <div className="relative h-full rounded-2xl border border-slate-200 bg-slate-50 p-7">
                <span className="text-4xl font-black text-transparent [-webkit-text-stroke:1.5px_#cbd5e1]">
                  {p.n}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{p.text}</p>
                {i < PASOS.length - 1 && (
                  <span className="absolute right-6 top-8 hidden text-slate-300 lg:block">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
