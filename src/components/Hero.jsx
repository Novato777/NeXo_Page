import Logo from "./Logo"
import { whatsappLink } from "../data/site"
import { BagIcon } from "./Icons"

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Líneas diagonales decorativas (estilo tarjeta) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/4 h-px w-96 rotate-45 bg-gradient-to-r from-transparent via-nexo-cyan/40 to-transparent" />
        <div className="absolute -right-20 bottom-1/4 h-px w-96 rotate-45 bg-gradient-to-r from-transparent via-nexo-blue/40 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nexo-cyan/10 blur-[120px]" />
      </div>


      <div className="animate-fade-up relative z-10 flex flex-col items-center text-center">
        <Logo
          size={300}
          className="animate-float -mb-6 [filter:drop-shadow(0_0_25px_rgba(34,211,238,0.7))_drop-shadow(0_0_60px_rgba(59,130,246,0.45))] sm:size-[350px]"
        />

        <h1 className="text-7xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
          Ne<span className="text-gradient">X</span>o
        </h1>

        <div className="my-7 h-px w-56 bg-gradient-to-r from-transparent via-nexo-cyan to-transparent" />

        {/* Dos mundos al mismo nivel: tienda + tecnología */}
        <p className="flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-2xl font-bold uppercase tracking-tight sm:text-3xl">
          <span className="font-display text-gradient-lime whitespace-nowrap drop-shadow-[0_0_20px_rgba(163,230,53,0.4)]">
            Tienda Virtual
          </span>
          <span className="text-xl font-light text-nexo-muted sm:text-2xl">+</span>
          <span className="font-display text-gradient whitespace-nowrap drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
            Desarrollo Web
          </span>
        </p>

        <p className="mt-5 max-w-2xl text-base text-white/85 [text-shadow:0_0_16px_rgba(34,211,238,0.4)] sm:text-lg">
          Compra{" "}
          <strong className="font-semibold text-nexo-lime">nuestros productos</strong>{" "}
          por WhatsApp. Diseñamos{" "}
          <strong className="font-semibold text-nexo-cyan">páginas web</strong>,{" "}
          <strong className="font-semibold text-nexo-cyan">sistemas a medida</strong> y{" "}
          <strong className="font-semibold text-nexo-cyan">automatizaciones</strong> para
          impulsar tu negocio.
        </p>

        {/* Un mismo equipo, dos mundos */}
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-nexo-muted">
          Un mismo equipo · dos mundos
        </p>

        <div className="mt-5 flex flex-col items-center gap-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Mundo Drop (lima) — CTA principal */}
            <a
              href="#tienda"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-nexo-lime to-nexo-green px-10 py-4 text-lg font-semibold text-nexo-bg shadow-[0_0_40px_-8px_rgba(163,230,53,0.65)] transition-transform duration-300 hover:scale-105"
            >
              <BagIcon className="h-5 w-5" />
              Ver productos
            </a>
            {/* Mundo Tech (cian) — secundario */}
            <a
              href="#servicios"
              className="rounded-full border border-nexo-cyan/40 bg-nexo-blue/25 px-10 py-4 text-lg font-semibold text-white shadow-[0_0_35px_-8px_rgba(34,211,238,0.55)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-nexo-cyan hover:bg-nexo-blue/35"
            >
              Ver servicios
            </a>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-white/75 underline-offset-4 transition-colors hover:text-nexo-cyan hover:underline"
          >
            o escríbenos por WhatsApp →
          </a>
        </div>
      </div>
    </section>
  )
}
