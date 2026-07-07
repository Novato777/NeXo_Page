import { useState } from "react"
import Reveal from "./Reveal"
import { projects } from "../data/projects"
import { ArrowUpRightIcon } from "./Icons"

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
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
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

export default function Portfolio() {
  return (
    <section id="portafolio" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-nexo-blue">
            Nuestro trabajo
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Proyectos reales, funcionando
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Sistemas y sitios que ya están en producción, hechos a la medida de cada negocio.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((p, i) => {
            const isLink = Boolean(p.link)
            const Wrapper = isLink ? "a" : "div"
            const wrapperProps = isLink
              ? { href: p.link, target: "_blank", rel: "noreferrer" }
              : {}
            return (
              <Reveal key={p.id} delay={(i % 2) * 90}>
                <Wrapper
                  {...wrapperProps}
                  className={`group block h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 ${
                    isLink ? "hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg" : ""
                  }`}
                >
                  <Preview project={p} />
                  <div className="mt-5 px-1 pb-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-nexo-blue">
                          {p.category}
                        </span>
                        <h3 className="mt-1 text-xl font-bold text-slate-900">{p.title}</h3>
                      </div>
                      {isLink && (
                        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors group-hover:bg-nexo-blue group-hover:text-white">
                          <ArrowUpRightIcon className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                      {p.description}
                    </p>
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
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
