import { useState } from "react"
import TargetCursor from "./TargetCursor"
import ScrollReveal from "./ScrollReveal"
import { site, whatsappLink } from "../data/site"
import {
  WhatsAppIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  ArrowUpRightIcon,
} from "./Icons"

const serviceOptions = [
  "Página web",
  "Sistema a medida",
  "Automatización",
  "Otro / No estoy seguro",
]

const methods = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: site.whatsappDisplay,
    href: whatsappLink,
    external: true,
  },
  {
    icon: MailIcon,
    label: "Correo",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPinIcon,
    label: "Ubicación",
    value: site.location,
    href: "https://maps.google.com/?q=La+Dorada+Caldas",
    external: true,
  },
  {
    icon: ClockIcon,
    label: "Horario",
    value: "Lun a Sáb · 8am - 7pm",
    href: null,
  },
]

export default function Contact() {
  const [cursorActive, setCursorActive] = useState(false)
  const [form, setForm] = useState({
    nombre: "",
    negocio: "",
    servicio: serviceOptions[0],
    mensaje: "",
  })

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg =
      `Hola NeXo 👋, soy *${form.nombre || "—"}*` +
      (form.negocio ? ` de *${form.negocio}*` : "") +
      `.\nMe interesa: *${form.servicio}*.` +
      (form.mensaje ? `\n\n${form.mensaje}` : "")
    const url = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(msg)}`
    window.open(url, "_blank", "noopener")
  }

  return (
    <section
      id="contacto"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-28"
      onMouseEnter={() => setCursorActive(true)}
      onMouseLeave={() => setCursorActive(false)}
    >
      {/* Target Cursor: solo activo dentro de esta sección */}
      {cursorActive && (
        <TargetCursor spinDuration={2} hideDefaultCursor hoverDuration={0.2} parallaxOn />
      )}

      {/* Resplandores de fondo */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-[420px] w-[600px] -translate-x-1/2 rounded-full bg-nexo-blue/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[360px] w-[520px] translate-x-1/4 rounded-full bg-nexo-cyan/10 blur-[130px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Encabezado */}
        <div className="mb-14 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-nexo-cyan sm:w-14" />
            <span className="text-sm font-bold uppercase tracking-[0.35em] text-nexo-cyan">
              Hablemos
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-nexo-cyan sm:w-14" />
          </div>
          <ScrollReveal
            containerClassName="flex justify-center"
            textClassName="text-5xl font-extrabold tracking-tight sm:text-6xl"
            wordClassName="text-gradient drop-shadow-[0_0_35px_rgba(34,211,238,0.35)]"
            baseRotation={2}
            blurStrength={5}
          >
            ¿Listo para crecer?
          </ScrollReveal>
          <p className="mx-auto mt-5 max-w-xl text-lg text-nexo-muted sm:text-xl">
            Escríbenos y armamos juntos la solución para tu negocio.{" "}
            <span className="font-semibold text-nexo-text">
              La primera asesoría es gratis.
            </span>
          </p>
        </div>

        {/* Panel principal con borde glow animado */}
        <div className="contact-glow overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Columna izquierda: formulario que abre WhatsApp pre-llenado */}
            <div className="relative border-b border-nexo-border p-8 sm:p-10 md:border-b-0 md:border-r md:p-12">
              <h3 className="text-2xl font-bold sm:text-3xl">
                Cuéntanos de tu proyecto
              </h3>
              <p className="mt-2 text-sm text-nexo-muted">
                Llena esto y te abrimos WhatsApp con tu mensaje listo. Te
                respondemos en minutos.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre *"
                    className="cursor-target w-full rounded-xl border border-nexo-border bg-nexo-bg px-4 py-3 text-nexo-text transition-colors placeholder:text-nexo-muted/60 focus:border-nexo-cyan focus:outline-none focus:ring-1 focus:ring-nexo-cyan"
                  />
                  <input
                    name="negocio"
                    value={form.negocio}
                    onChange={handleChange}
                    placeholder="Tu negocio (opcional)"
                    className="cursor-target w-full rounded-xl border border-nexo-border bg-nexo-bg px-4 py-3 text-nexo-text transition-colors placeholder:text-nexo-muted/60 focus:border-nexo-cyan focus:outline-none focus:ring-1 focus:ring-nexo-cyan"
                  />
                </div>

                <select
                  name="servicio"
                  value={form.servicio}
                  onChange={handleChange}
                  className="cursor-target w-full rounded-xl border border-nexo-border bg-nexo-bg px-4 py-3 text-nexo-text transition-colors focus:border-nexo-cyan focus:outline-none focus:ring-1 focus:ring-nexo-cyan"
                >
                  {serviceOptions.map((s) => (
                    <option key={s} value={s} className="bg-nexo-bg">
                      {s}
                    </option>
                  ))}
                </select>

                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  rows={3}
                  placeholder="¿Qué necesitas? (opcional)"
                  className="cursor-target w-full resize-none rounded-xl border border-nexo-border bg-nexo-bg px-4 py-3 text-nexo-text transition-colors placeholder:text-nexo-muted/60 focus:border-nexo-cyan focus:outline-none focus:ring-1 focus:ring-nexo-cyan"
                />

                <button
                  type="submit"
                  className="cursor-target glow inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-nexo-blue to-nexo-cyan px-8 py-4 font-semibold text-nexo-bg transition-transform hover:scale-[1.02]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Enviar por WhatsApp
                </button>
              </form>

              <div className="mt-5 flex items-center gap-2 text-sm text-nexo-muted">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nexo-cyan opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-nexo-cyan" />
                </span>
                Disponibles para nuevos proyectos
              </div>
            </div>

            {/* Columna derecha: métodos de contacto (tarjetas) */}
            <div className="flex flex-col justify-center gap-3 p-8 sm:p-10 md:p-12">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-nexo-muted">
                O escríbenos directo
              </p>
              {methods.map((m) => {
                const Icon = m.icon
                const content = (
                  <>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-nexo-cyan/20 bg-gradient-to-br from-nexo-blue/20 to-nexo-cyan/20 text-nexo-cyan transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-nexo-muted">
                        {m.label}
                      </p>
                      <p className="truncate font-medium text-nexo-text">
                        {m.value}
                      </p>
                    </div>
                    {m.href && (
                      <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-nexo-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-nexo-cyan" />
                    )}
                  </>
                )

                const cardClass =
                  "cursor-target group flex items-center gap-4 rounded-2xl border border-nexo-border/60 bg-nexo-bg/40 p-4 transition-all duration-300"

                return m.href ? (
                  <a
                    key={m.label}
                    href={m.href}
                    target={m.external ? "_blank" : undefined}
                    rel={m.external ? "noreferrer" : undefined}
                    className={`${cardClass} hover:translate-x-1 hover:border-nexo-cyan/40 hover:bg-nexo-bg/70`}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={m.label} className={cardClass}>
                    {content}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
