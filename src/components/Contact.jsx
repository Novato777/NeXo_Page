import { useState } from "react"
import Reveal from "./Reveal"
import { site, whatsappLink } from "../data/site"
import { WhatsAppIcon, MailIcon, MapPinIcon, ClockIcon, ArrowUpRightIcon } from "./Icons"

const serviceOptions = [
  "Página web",
  "Sistema a medida",
  "Automatización",
  "Servicio técnico: Computador",
  "Servicio técnico: Impresora",
  "Otro / No estoy seguro",
]

const methods = [
  { icon: WhatsAppIcon, label: "WhatsApp", value: site.whatsappDisplay, href: whatsappLink, external: true },
  { icon: MailIcon, label: "Correo", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPinIcon, label: "Ubicación", value: site.location, href: "https://maps.google.com/?q=La+Dorada+Caldas", external: true },
  { icon: ClockIcon, label: "Horario", value: "Lun a Sáb · 8am - 7pm", href: null },
]

export default function Contact() {
  const [form, setForm] = useState({
    nombre: "",
    negocio: "",
    servicio: serviceOptions[0],
    mensaje: "",
  })

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg =
      `Hola NeXo, soy *${form.nombre || "—"}*` +
      (form.negocio ? ` de *${form.negocio}*` : "") +
      `.\nMe interesa: *${form.servicio}*.` +
      (form.mensaje ? `\n\n${form.mensaje}` : "")
    const url = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(msg)}`
    window.open(url, "_blank", "noopener")
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-nexo-blue focus:outline-none focus:ring-2 focus:ring-blue-100"

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-gradient-to-br from-nexo-indigo via-nexo-blue to-nexo-navy py-14 text-white sm:py-28"
    >
      {/* Decoración */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent 80%)",
          }}
        />
        <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
            <span className="h-1.5 w-6 rounded-full bg-gradient-to-r from-cyan-300 to-white/60" />
            Hablemos
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            ¿Listo para crecer?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Cuéntanos tu proyecto y te respondemos por WhatsApp en minutos.{" "}
            <span className="font-semibold text-white">La primera asesoría es gratis.</span>
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Formulario (card blanca) */}
          <Reveal className="lg:col-span-3">
            <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/20 sm:p-8">
              <h3 className="text-xl font-bold text-slate-900">Cuéntanos de tu proyecto</h3>
              <p className="mt-1 text-sm text-slate-500">
                Llena esto y te abrimos WhatsApp con tu mensaje listo.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Tu nombre *" className={inputClass} />
                  <input name="negocio" value={form.negocio} onChange={handleChange} placeholder="Tu negocio (opcional)" className={inputClass} />
                </div>
                <select name="servicio" value={form.servicio} onChange={handleChange} className={inputClass}>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows={4} placeholder="¿Qué necesitas? (opcional)" className={`${inputClass} resize-none`} />
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-nexo-indigo to-nexo-blue px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] sm:w-auto sm:self-start sm:px-10"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Enviar por WhatsApp
                </button>
              </form>
            </div>
          </Reveal>

          {/* Métodos (cards translúcidas) */}
          <Reveal delay={90} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/80">
                O escríbenos directo
              </p>
              {methods.map((m) => {
                const Icon = m.icon
                const inner = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-inset ring-white/25 backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-blue-200/80">{m.label}</p>
                      <p className="truncate font-medium text-white">{m.value}</p>
                    </div>
                    {m.href && <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-blue-200 transition-colors group-hover:text-white" />}
                  </>
                )
                const cls = "group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur transition-all"
                return m.href ? (
                  <a key={m.label} href={m.href} target={m.external ? "_blank" : undefined} rel={m.external ? "noreferrer" : undefined} className={`${cls} hover:-translate-y-0.5 hover:bg-white/15`}>
                    {inner}
                  </a>
                ) : (
                  <div key={m.label} className={cls}>{inner}</div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
