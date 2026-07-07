import { useState } from "react"
import Reveal from "./Reveal"
import { site, whatsappLink } from "../data/site"
import { WhatsAppIcon, MailIcon, MapPinIcon, ClockIcon, ArrowUpRightIcon } from "./Icons"

const serviceOptions = [
  "Página web",
  "Sistema a medida",
  "Automatización",
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
    <section id="contacto" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-nexo-blue">
            Hablemos
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            ¿Listo para crecer?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Cuéntanos tu proyecto y te respondemos por WhatsApp en minutos.{" "}
            <span className="font-semibold text-slate-900">La primera asesoría es gratis.</span>
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Formulario */}
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-nexo-blue to-nexo-cyan px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition-transform hover:scale-[1.02] sm:w-auto sm:self-start sm:px-10"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Enviar por WhatsApp
                </button>
              </form>
            </div>
          </Reveal>

          {/* Métodos de contacto */}
          <Reveal delay={90} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                O escríbenos directo
              </p>
              {methods.map((m) => {
                const Icon = m.icon
                const inner = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-nexo-blue ring-1 ring-inset ring-blue-100">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{m.label}</p>
                      <p className="truncate font-medium text-slate-900">{m.value}</p>
                    </div>
                    {m.href && <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-nexo-blue" />}
                  </>
                )
                const cls = "group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all"
                return m.href ? (
                  <a key={m.label} href={m.href} target={m.external ? "_blank" : undefined} rel={m.external ? "noreferrer" : undefined} className={`${cls} hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md`}>
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
