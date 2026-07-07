import { useEffect, useRef, useState } from "react"
import Reveal from "./Reveal"
import { projects } from "../data/projects"
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon } from "./Icons"

// Vista previa con marco de navegador (screenshot o degradado de respaldo).
function Preview({ project }) {
  const [imgError, setImgError] = useState(false)
  const showImage = project.image && !imgError

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
        <div className="ml-2 flex-1 truncate rounded bg-white px-2 py-0.5 text-[11px] text-slate-400 ring-1 ring-slate-200">
          {project.domain}
        </div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {showImage ? (
          <img
            src={project.image}
            alt={`Vista previa de ${project.title}`}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${project.accent}`}>
            <span className="text-2xl font-extrabold tracking-tight text-white/95">
              {project.title}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function Card({ p }) {
  const isLink = Boolean(p.link)
  const Wrapper = isLink ? "a" : "div"
  const wrapperProps = isLink ? { href: p.link, target: "_blank", rel: "noreferrer" } : {}
  return (
    <Wrapper
      {...wrapperProps}
      className={`group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 ${
        isLink ? "hover:-translate-y-1 hover:border-nexo-blue/30 hover:shadow-xl" : ""
      }`}
    >
      <Preview project={p} />
      <div className="mt-5 flex flex-1 flex-col px-1 pb-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-nexo-blue">{p.category}</span>
            <h3 className="mt-1 text-xl font-bold text-slate-900">{p.title}</h3>
          </div>
          {isLink && (
            <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors group-hover:bg-nexo-blue group-hover:text-white">
              <ArrowUpRightIcon className="h-4 w-4" />
            </span>
          )}
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{p.description}</p>
        {p.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  )
}

export default function Portfolio() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  // Sincroniza el punto activo según el scroll del carrusel.
  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[0]
    if (!card) return
    const step = card.offsetWidth + 20 // ancho de card + gap
    setActive(Math.round(track.scrollLeft / step))
  }

  const goTo = (i) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[0]
    if (!card) return
    const step = card.offsetWidth + 20
    track.scrollTo({ left: step * i, behavior: "smooth" })
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener("scroll", onScroll, { passive: true })
    return () => track.removeEventListener("scroll", onScroll)
  }, [])

  const last = projects.length - 1

  return (
    <section id="portafolio" className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-14 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-nexo-blue">
              <span className="h-1.5 w-6 rounded-full bg-gradient-to-r from-nexo-indigo to-nexo-cyan" />
              Nuestro trabajo
            </span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Proyectos reales, funcionando
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Sistemas y sitios que ya están en producción, hechos a la medida de cada negocio.
            </p>
          </div>

          {/* Flechas (desktop) */}
          <div className="hidden shrink-0 gap-3 sm:flex">
            <button
              onClick={() => goTo(Math.max(0, active - 1))}
              disabled={active === 0}
              aria-label="Anterior"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition-all hover:border-nexo-blue hover:text-nexo-blue disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => goTo(Math.min(last, active + 1))}
              disabled={active === last}
              aria-label="Siguiente"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition-all hover:border-nexo-blue hover:text-nexo-blue disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </Reveal>

        {/* Carrusel */}
        <div
          ref={trackRef}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4"
        >
          {projects.map((p) => (
            <div
              key={p.id}
              className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(50%-10px)]"
            >
              <Card p={p} />
            </div>
          ))}
        </div>

        {/* Puntos */}
        <div className="mt-6 flex justify-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              aria-label={`Ir al proyecto ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-8 bg-nexo-blue" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
