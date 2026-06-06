import Logo from "./Logo"
import { site, whatsappLink } from "../data/site"

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

        <p className="max-w-3xl text-2xl font-medium text-white [text-shadow:0_0_22px_rgba(34,211,238,0.5)] sm:text-3xl">
          {site.slogan}
        </p>

        <p className="mt-5 max-w-2xl text-base text-white/85 [text-shadow:0_0_16px_rgba(34,211,238,0.4)] sm:text-lg">
          Tecnología a tu medida{" "}
          <span className="font-semibold text-nexo-cyan">y</span> una tienda con
          productos que te van a encantar.
        </p>

        {/* Un mismo equipo, dos mundos */}
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-nexo-muted">
          Un mismo equipo · dos mundos
        </p>

        <div className="mt-5 flex flex-col items-center gap-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Mundo Tech (cian) */}
            <a
              href="#servicios"
              className="rounded-full border border-nexo-cyan/40 bg-nexo-blue/25 px-10 py-4 text-lg font-semibold text-white shadow-[0_0_35px_-8px_rgba(34,211,238,0.55)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-nexo-cyan hover:bg-nexo-blue/35"
            >
              Ver servicios
            </a>
            {/* Mundo Drop (lima) */}
            <a
              href="#tienda"
              className="rounded-full border border-nexo-lime/40 bg-nexo-green/20 px-10 py-4 text-lg font-semibold text-white shadow-[0_0_35px_-8px_rgba(132,204,22,0.55)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-nexo-lime hover:bg-nexo-green/30"
            >
              Ver tienda
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
