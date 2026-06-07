import MagicBento from "./MagicBento"
import ScrollReveal from "./ScrollReveal"
import { BagIcon, ArrowUpRightIcon } from "./Icons"

export default function Services() {
  return (
    <section
      id="servicios"
      className="flex min-h-screen flex-col justify-center px-6 py-12 [@media(max-height:780px)]:py-6"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 text-center [@media(max-height:780px)]:mb-4">
          {/* Eyebrow con líneas a los lados */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-nexo-cyan sm:w-12" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-nexo-cyan sm:text-sm">
              Lo que hacemos
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-nexo-cyan sm:w-12" />
          </div>

          {/* Título grande con degradado + Scroll Reveal */}
          <ScrollReveal
            containerClassName="flex justify-center"
            textClassName="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
            wordClassName="text-gradient"
            baseRotation={2}
            blurStrength={5}
          >
            Nuestros Servicios
          </ScrollReveal>

          {/* Subtítulo más grande con palabra resaltada */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-nexo-muted sm:text-xl">
            Todo lo que tu negocio necesita para dar el{" "}
            <span className="font-semibold text-nexo-text">salto digital</span>, en un
            solo lugar.
          </p>
        </div>

        {/* Mosaico interactivo (partículas + glow que sigue el cursor) */}
        <MagicBento
          textAutoHide={true}
          enableStars
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={12}
          glowColor="34, 211, 238"
          disableAnimations={false}
        />

        {/* Banner: nuestra tienda virtual propia (mundo NeXo Drop) */}
        <a
          href="#tienda"
          className="group mt-8 flex flex-col items-center gap-5 rounded-2xl border border-nexo-lime/30 bg-gradient-to-r from-nexo-green/10 to-nexo-lime/10 p-6 text-center transition-colors hover:border-nexo-lime/60 sm:flex-row sm:justify-between sm:text-left sm:p-7 [@media(max-height:780px)]:mt-4 [@media(max-height:780px)]:p-4"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-nexo-lime/30 bg-gradient-to-br from-nexo-lime/20 to-nexo-green/20 text-nexo-lime">
              <BagIcon className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-nexo-text sm:text-2xl">
                Estrena nuestra{" "}
                <span className="text-gradient-lime font-extrabold">Tienda Virtual</span>
              </h3>
              <p className="mt-1 text-sm text-nexo-muted sm:text-base">
                Productos seleccionados al mejor precio, con atención directa por
                WhatsApp.
              </p>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-nexo-lime to-nexo-green px-6 py-3 font-semibold text-nexo-bg transition-transform group-hover:scale-105">
            Ver productos
            <ArrowUpRightIcon className="h-4 w-4" />
          </span>
        </a>
      </div>
    </section>
  )
}
