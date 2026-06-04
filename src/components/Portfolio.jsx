import { useEffect, useRef, useState } from "react"
import CardSwap, { Card } from "./CardSwap"
import { projects } from "../data/projects"
import ScrollReveal from "./ScrollReveal"
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon } from "./Icons"

// Vista previa (marco de navegador + screenshot/gradiente) usada dentro de cada card.
function Preview({ project }) {
  const [imgError, setImgError] = useState(false)
  const showImage = project.image && !imgError

  return (
    <div className="flex h-full w-full flex-col">
      {/* Barra de navegador */}
      <div className="flex items-center gap-1.5 border-b border-nexo-border bg-nexo-bg px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <div className="ml-1 flex-1 truncate rounded bg-nexo-panel px-2 py-0.5 text-[10px] text-nexo-muted">
          {project.domain}
        </div>
      </div>

      {/* Preview */}
      <div className="relative flex-1 overflow-hidden bg-nexo-bg2">
        {showImage ? (
          <img
            src={project.image}
            alt={`Vista previa de ${project.title}`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${project.accent}`}>
            <span className="text-xl font-extrabold tracking-tight text-nexo-bg/90">
              {project.title}
            </span>
          </div>
        )}

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nexo-panel via-nexo-panel/85 to-transparent p-4">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-nexo-cyan">
            {project.category}
          </span>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">{project.title}</h3>
            {project.link && <ArrowUpRightIcon className="h-4 w-4 text-nexo-cyan" />}
          </div>
        </div>
      </div>
    </div>
  )
}

// ===== Móvil: carrusel horizontal con swipe táctil + flechas + puntitos =====
function MobileCarousel() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const scrollToIndex = (i) => {
    const track = trackRef.current
    if (!track) return
    const clamped = Math.max(0, Math.min(i, projects.length - 1))
    const card = track.children[clamped]
    if (!card) return
    const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2
    track.scrollTo({ left, behavior: "smooth" })
  }

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const center = track.scrollLeft + track.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    Array.from(track.children).forEach((c, i) => {
      const cc = c.offsetLeft + c.clientWidth / 2
      const d = Math.abs(cc - center)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    })
    setActive(best)
  }

  return (
    <div>
      {/* Pista deslizable: cada tarjeta ocupa 85% y deja asomar la siguiente */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-1"
      >
        {projects.map((p) => {
          const cardInner = (
            <div className="h-72 overflow-hidden rounded-2xl border border-nexo-border bg-nexo-panel">
              <Preview project={p} />
            </div>
          )
          return (
            <div key={p.id} className="w-[85%] shrink-0 snap-center">
              {p.link ? (
                <a href={p.link} target="_blank" rel="noreferrer">
                  {cardInner}
                </a>
              ) : (
                cardInner
              )}
            </div>
          )
        })}
      </div>

      {/* Controles: flecha · puntitos · flecha */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => scrollToIndex(active - 1)}
          disabled={active === 0}
          aria-label="Proyecto anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-nexo-border bg-nexo-bg/70 text-nexo-text transition-colors hover:border-nexo-cyan hover:text-nexo-cyan disabled:opacity-30"
        >
          <ChevronLeftIcon />
        </button>

        <div className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => scrollToIndex(i)}
              aria-label={`Ir al proyecto ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-nexo-cyan" : "w-2 bg-nexo-border"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => scrollToIndex(active + 1)}
          disabled={active === projects.length - 1}
          aria-label="Proyecto siguiente"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-nexo-border bg-nexo-bg/70 text-nexo-text transition-colors hover:border-nexo-cyan hover:text-nexo-cyan disabled:opacity-30"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}

// Encabezado (columna izquierda)
function Header() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-nexo-cyan sm:w-16" />
        <span className="text-sm font-bold uppercase tracking-[0.35em] text-nexo-cyan">
          Nuestro trabajo
        </span>
      </div>
      <ScrollReveal
        textClassName="text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
        wordClassName="text-gradient drop-shadow-[0_0_35px_rgba(34,211,238,0.35)]"
        baseRotation={2}
        blurStrength={5}
      >
        Nuestro Portafolio
      </ScrollReveal>
      <p className="mt-7 max-w-md text-xl leading-relaxed text-nexo-muted sm:text-2xl">
        Proyectos reales{" "}
        <span className="font-semibold text-nexo-text">funcionando</span>. Usa las
        flechas para navegar y haz clic para verlos en vivo.
      </p>
      <a
        href={projects[0].link}
        target="_blank"
        rel="noreferrer"
        className="glow mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-nexo-blue to-nexo-cyan px-9 py-4 text-lg font-semibold text-nexo-bg transition-transform hover:scale-105"
      >
        Ver BarberControl <ArrowUpRightIcon className="h-5 w-5" />
      </a>
    </div>
  )
}

export default function Portfolio() {
  const [isMobile, setIsMobile] = useState(false)
  const swapRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)")
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  const openProject = (i) => {
    const p = projects[i]
    if (p?.link) window.open(p.link, "_blank", "noopener")
  }

  return (
    <section
      id="portafolio"
      className="flex min-h-screen flex-col justify-center overflow-hidden border-y border-nexo-border bg-nexo-bg2 py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {isMobile ? (
          // ===== Móvil: encabezado + carrusel deslizable =====
          <div className="flex flex-col gap-10">
            <Header />
            <MobileCarousel />
          </div>
        ) : (
          // ===== Escritorio: texto + Card Swap =====
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Header />
            <div className="relative h-[440px]">
              <CardSwap
                ref={swapRef}
                width={420}
                height={300}
                cardDistance={50}
                verticalDistance={55}
                delay={4000}
                onCardClick={openProject}
              >
                {projects.map((p) => (
                  <Card key={p.id}>
                    <Preview project={p} />
                  </Card>
                ))}
              </CardSwap>

              {/* Controles manuales */}
              <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 gap-3">
                <button
                  onClick={() => swapRef.current?.prev()}
                  aria-label="Proyecto anterior"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-nexo-border bg-nexo-bg/70 text-nexo-text backdrop-blur transition-colors hover:border-nexo-cyan hover:text-nexo-cyan"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  onClick={() => swapRef.current?.next()}
                  aria-label="Proyecto siguiente"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-nexo-border bg-nexo-bg/70 text-nexo-text backdrop-blur transition-colors hover:border-nexo-cyan hover:text-nexo-cyan"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
