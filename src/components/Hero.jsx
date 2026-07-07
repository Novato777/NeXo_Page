import { whatsappLink } from "../data/site"
import { WhatsAppIcon, ArrowUpRightIcon, CheckIcon } from "./Icons"

const pilares = ["Hecho a tu medida", "Entrega ágil", "Soporte continuo"]

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-white pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* Fondo sutil: cuadrícula + resplandor claro (nada saturado) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(#eef2f7 1px, transparent 1px), linear-gradient(90deg, #eef2f7 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 55% at 50% 30%, black, transparent 75%)",
          }}
        />
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-100/70 via-blue-50/60 to-transparent blur-3xl" />
      </div>

      <div className="animate-fade-up relative mx-auto max-w-4xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Agencia de desarrollo de software
        </span>

        <h1 className="mt-7 text-5xl font-extrabold leading-[1.04] tracking-tight text-slate-900 sm:text-7xl">
          Software que <span className="text-gradient">impulsa</span>
          <br className="hidden sm:block" /> tu negocio
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
          Diseñamos y desarrollamos{" "}
          <strong className="font-semibold text-slate-900">páginas web</strong>,{" "}
          <strong className="font-semibold text-slate-900">sistemas a medida</strong> y{" "}
          <strong className="font-semibold text-slate-900">automatizaciones</strong> que
          hacen crecer a las empresas.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-nexo-blue to-nexo-cyan px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-transform hover:scale-[1.03] sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Hablemos de tu proyecto
          </a>
          <a
            href="#portafolio"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
          >
            Ver portafolio
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate-500">
          {pilares.map((p) => (
            <span key={p} className="inline-flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-nexo-blue" />
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
