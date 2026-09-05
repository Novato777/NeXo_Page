import { whatsappLink } from "../data/site"
import { WhatsAppIcon, ArrowUpRightIcon, CheckIcon } from "./Icons"

const pilares = [
  { label: "Hecho a tu medida", href: null },
  { label: "Entrega ágil", href: null },
  { label: "Servicio técnico para PC e impresoras", href: "#servicio-tecnico" },
]
const stack = ["React", "Node.js", "PostgreSQL", "Tailwind", "Vercel"]

export default function Hero() {
  return (
    <section
      id="inicio"
      className="bg-mesh relative overflow-hidden bg-white pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* Fondo: rejilla enmascarada + blobs de color */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="bg-grid absolute inset-0 opacity-70"
          style={{ maskImage: "radial-gradient(ellipse 75% 60% at 50% 30%, black, transparent 78%)" }}
        />
        <div className="absolute left-[-8%] top-[6%] h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute right-[-6%] top-[10%] h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl" />
      </div>

      <div className="animate-fade-up relative mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            Desarrollo de software & servicio técnico
          </span>
        </div>

        {/* Wordmark gigante */}
        <div className="relative mt-8 flex justify-center">
          <div className="brand-glow absolute inset-x-0 top-1/2 mx-auto h-40 w-[70%] -translate-y-1/2" />
          <p className="relative text-[5.5rem] font-black leading-[0.85] tracking-tighter text-slate-900 sm:text-[9rem] lg:text-[11rem]">
            Ne<span className="text-gradient-lg">X</span>o
          </p>
        </div>

        {/* Tagline (h1 para SEO) */}
        <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          Software que <span className="text-gradient-lg">impulsa</span> tu negocio
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
          Diseñamos y desarrollamos{" "}
          <strong className="font-semibold text-slate-900">páginas web</strong>,{" "}
          <strong className="font-semibold text-slate-900">sistemas a medida</strong> y{" "}
          <strong className="font-semibold text-slate-900">automatizaciones</strong>. Además, respaldamos tu operación con{" "}
          <a
            href="#servicio-tecnico"
            className="font-semibold text-nexo-blue underline decoration-nexo-blue/30 underline-offset-4 transition-colors hover:text-nexo-indigo hover:decoration-nexo-indigo"
          >
            servicio técnico especializado
          </a>.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-nexo-indigo via-nexo-blue to-nexo-cyan px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-500/25 transition-transform hover:scale-[1.03] sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Hablemos de tu proyecto
          </a>
          <a
            href="#portafolio"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/70 px-8 py-4 text-base font-semibold text-slate-800 backdrop-blur transition-colors hover:border-slate-400 hover:bg-white sm:w-auto"
          >
            Ver portafolio
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </div>

        {/* Pilares */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
          {pilares.map((p) => {
            const isLink = Boolean(p.href)
            const Tag = isLink ? "a" : "span"
            return (
              <Tag
                key={p.label}
                href={p.href}
                className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition-all ${
                  isLink
                    ? "hover:-translate-y-0.5 hover:border-nexo-blue/40 hover:bg-white hover:text-nexo-blue"
                    : ""
                }`}
              >
                <CheckIcon className="h-4 w-4 text-nexo-blue" />
                {p.label}
              </Tag>
            )
          })}
        </div>

        {/* Stack tecnológico */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Construido con tecnología moderna
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {stack.map((t) => (
              <span key={t} className="text-sm font-bold text-slate-400 transition-colors hover:text-slate-700">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
