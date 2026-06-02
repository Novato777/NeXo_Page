import MagicBento from "./MagicBento"
import ScrollReveal from "./ScrollReveal"

export default function Services() {
  return (
    <section id="servicios" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
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
      </div>
    </section>
  )
}
