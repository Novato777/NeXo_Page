import { useState } from "react"
import Reveal from "./Reveal"
import {
  ComputerIcon,
  PrinterIcon,
  CheckIcon,
  WhatsAppIcon,
  WrenchIcon,
  ArrowUpRightIcon,
} from "./Icons"
import {
  getWhatsAppLink,
  pcServiceWhatsAppLink,
  printerServiceWhatsAppLink,
  techHelpWhatsAppLink,
} from "../data/site"

const PC_FEATURES = [
  "Diagnóstico de fallas y lentitud en el sistema.",
  "Mantenimiento preventivo, limpieza interna y pasta térmica.",
  "Formateo, reinstalación de sistema operativo y programas.",
  "Actualización de componentes: SSD de alta velocidad y RAM.",
  "Solución a problemas de recalentamiento y apagado.",
  "Respaldo y transferencia segura de información.",
]

const PC_CHIPS = [
  "Lentitud / Disco SSD",
  "Mantenimiento preventivo",
  "Formateo de sistema",
  "Se calienta o apaga",
  "Virus o pantalla azul",
  "Instalación de software",
]

const PRINTER_FEATURES = [
  "Diagnóstico de errores y estado general del equipo.",
  "Instalación de controladores (drivers) y puesta en marcha.",
  "Configuración de conexión Wi-Fi y red local multi-usuario.",
  "Mantenimiento preventivo y limpieza de rodillos y cabezales.",
  "Corrección de atascos de papel y alertas de error.",
  "Solución a problemas de calidad de impresión (rayas o manchas).",
]

const PRINTER_CHIPS = [
  "No conecta por Wi-Fi",
  "Instalación de drivers",
  "Mantenimiento y limpieza",
  "Atasco de papel",
  "Manchas o rayas",
  "Error de reconocimiento",
]

export default function TechServices() {
  const [selectedPcChip, setSelectedPcChip] = useState(null)
  const [pcCustomProblem, setPcCustomProblem] = useState("")
  const [selectedPrinterChip, setSelectedPrinterChip] = useState(null)
  const [printerCustomProblem, setPrinterCustomProblem] = useState("")

  const handleTogglePcChip = (chip) => {
    setSelectedPcChip((prev) => (prev === chip ? null : chip))
  }

  const handleTogglePrinterChip = (chip) => {
    setSelectedPrinterChip((prev) => (prev === chip ? null : chip))
  }

  // Generador de enlace WhatsApp para Computador
  const getPcLink = () => {
    const details = []
    if (selectedPcChip) details.push(`*Motivo principal:* ${selectedPcChip}`)
    if (pcCustomProblem.trim()) details.push(`*Detalle:* ${pcCustomProblem.trim()}`)

    if (details.length > 0) {
      return getWhatsAppLink(
        `Hola NeXo 👋, necesito servicio técnico para mi computador.\n\n${details.join("\n")}\n\nQuisiera solicitar un diagnóstico.`
      )
    }
    return pcServiceWhatsAppLink
  }

  // Generador de enlace WhatsApp para Impresora
  const getPrinterLink = () => {
    const details = []
    if (selectedPrinterChip) details.push(`*Motivo principal:* ${selectedPrinterChip}`)
    if (printerCustomProblem.trim()) details.push(`*Detalle:* ${printerCustomProblem.trim()}`)

    if (details.length > 0) {
      return getWhatsAppLink(
        `Hola NeXo 👋, necesito servicio técnico para mi impresora.\n\n${details.join("\n")}\n\nQuisiera solicitar un diagnóstico.`
      )
    }
    return printerServiceWhatsAppLink
  }

  const pcLink = getPcLink()
  const printerLink = getPrinterLink()

  return (
    <section
      id="servicio-tecnico"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 sm:py-24 lg:py-28"
    >
      {/* Elementos decorativos sutiles de fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="bg-dots absolute inset-0 opacity-30"
          style={{
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent 80%)",
          }}
        />
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Encabezado simétrico */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-nexo-blue">
            <span className="h-1.5 w-5 sm:w-6 rounded-full bg-gradient-to-r from-nexo-indigo to-nexo-cyan" />
            Soporte & Equipos
          </span>
          <h2 className="mt-3 sm:mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Servicio técnico para tus <span className="text-gradient-lg">herramientas</span> de trabajo
          </h2>
          <p className="mt-3 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Diagnóstico transparente, mantenimiento y puesta a punto de computadores e impresoras para que la tecnología de tu negocio u hogar nunca se detenga.
          </p>
        </Reveal>

        {/* Grid de las dos categorías maestras */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:gap-7 lg:grid-cols-2">
          {/* Card: Computadores */}
          <Reveal delay={60}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-lg shadow-slate-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-nexo-blue/40 hover:shadow-2xl hover:shadow-blue-500/10 sm:rounded-3xl sm:p-8 lg:p-9">
              {/* Brillo sutil de esquina */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-indigo-100/60 blur-2xl transition-opacity group-hover:opacity-100" />

              <div>
                {/* Cabecera de Card */}
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 text-nexo-blue ring-1 ring-inset ring-blue-100 transition-all duration-300 group-hover:scale-105 group-hover:from-nexo-indigo group-hover:to-nexo-blue group-hover:text-white group-hover:shadow-md sm:h-14 sm:w-14 sm:rounded-2xl">
                    <ComputerIcon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 sm:h-7 sm:w-7" />
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-700 sm:px-3.5 sm:text-xs">
                    Laptops & PCs de mesa
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900 transition-colors group-hover:text-nexo-blue sm:mt-6 sm:text-2xl">
                  Computadores
                </h3>
                <p className="mt-1.5 text-xs sm:text-[14px] leading-relaxed text-slate-600">
                  Diagnóstico especializado, optimización de velocidad, mantenimiento preventivo y solución de fallas físicas o de sistema.
                </p>

                {/* Lista de capacidades con viñetas simétricas */}
                <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
                  {PC_FEATURES.map((item) => (
                    <li key={item} className="group/item flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-700">
                      <span className="mt-0.5 flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-nexo-blue ring-1 ring-blue-200/60 transition-transform duration-200 group-hover/item:scale-110">
                        <CheckIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </span>
                      <span className="transition-colors duration-200 group-hover/item:text-slate-900 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Selector rápido de fallas habituales */}
                <div className="mt-6 border-t border-slate-100 pt-4 sm:mt-7 sm:pt-5">
                  <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
                    ¿Qué presenta tu computador? <span className="font-normal lowercase text-slate-500">(personaliza tu mensaje)</span>:
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5 sm:gap-2">
                    {PC_CHIPS.map((chip) => {
                      const isSelected = selectedPcChip === chip
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleTogglePcChip(chip)}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-200 active:scale-95 sm:px-3 sm:py-1.5 sm:text-xs ${
                            isSelected
                              ? "scale-[1.02] bg-nexo-blue text-white shadow-sm ring-1 ring-blue-600 font-semibold"
                              : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-900"
                          }`}
                        >
                          {isSelected && "✓ "}
                          {chip}
                        </button>
                      )
                    })}
                  </div>

                  {/* Input opcional para describir brevemente el problema */}
                  <div className="mt-2.5 sm:mt-3">
                    <input
                      type="text"
                      maxLength={120}
                      placeholder="Modelo o detalle adicional (opcional)..."
                      value={pcCustomProblem}
                      onChange={(e) => setPcCustomProblem(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:border-nexo-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:px-3.5 sm:py-2.5"
                    />
                  </div>
                </div>
              </div>

              {/* Botón CTA */}
              <div className="mt-6 pt-1 sm:mt-8 sm:pt-2">
                <a
                  href={pcLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-nexo-indigo to-nexo-blue px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-blue-500/35 active:scale-[0.98] sm:px-6 sm:py-3.5"
                >
                  <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover/btn:rotate-12" />
                  <span className="truncate">
                    {selectedPcChip || pcCustomProblem.trim()
                      ? "Solicitar diagnóstico personalizado"
                      : "Solicitar diagnóstico de computador"}
                  </span>
                  <ArrowUpRightIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-75 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:opacity-100" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Card: Impresoras */}
          <Reveal delay={120}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-lg shadow-slate-900/5 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-nexo-blue/40 hover:shadow-2xl hover:shadow-blue-500/10 sm:rounded-3xl sm:p-8 lg:p-9">
              {/* Brillo sutil de esquina */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyan-100/60 blur-2xl transition-opacity group-hover:opacity-100" />

              <div>
                {/* Cabecera de Card */}
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-nexo-blue ring-1 ring-inset ring-cyan-100 transition-all duration-300 group-hover:scale-105 group-hover:from-nexo-blue group-hover:to-nexo-cyan group-hover:text-white group-hover:shadow-md sm:h-14 sm:w-14 sm:rounded-2xl">
                    <PrinterIcon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 sm:h-7 sm:w-7" />
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-700 sm:px-3.5 sm:text-xs">
                    Inyección de tinta & Láser
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900 transition-colors group-hover:text-cyan-600 sm:mt-6 sm:text-2xl">
                  Impresoras
                </h3>
                <p className="mt-1.5 text-xs sm:text-[14px] leading-relaxed text-slate-600">
                  Diagnóstico, mantenimiento preventivo, solución a atascos y configuración de conectividad Wi-Fi o red para tu oficina u hogar.
                </p>

                {/* Lista de capacidades con viñetas simétricas */}
                <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
                  {PRINTER_FEATURES.map((item) => (
                    <li key={item} className="group/item flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-700">
                      <span className="mt-0.5 flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 ring-1 ring-cyan-200/60 transition-transform duration-200 group-hover/item:scale-110">
                        <CheckIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </span>
                      <span className="transition-colors duration-200 group-hover/item:text-slate-900 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Selector rápido de fallas habituales */}
                <div className="mt-6 border-t border-slate-100 pt-4 sm:mt-7 sm:pt-5">
                  <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
                    ¿Qué problema presenta tu impresora? <span className="font-normal lowercase text-slate-500">(personaliza tu mensaje)</span>:
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5 sm:gap-2">
                    {PRINTER_CHIPS.map((chip) => {
                      const isSelected = selectedPrinterChip === chip
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleTogglePrinterChip(chip)}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-200 active:scale-95 sm:px-3 sm:py-1.5 sm:text-xs ${
                            isSelected
                              ? "scale-[1.02] bg-cyan-600 text-white shadow-sm ring-1 ring-cyan-700 font-semibold"
                              : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-900"
                          }`}
                        >
                          {isSelected && "✓ "}
                          {chip}
                        </button>
                      )
                    })}
                  </div>

                  {/* Input opcional para describir brevemente el problema */}
                  <div className="mt-2.5 sm:mt-3">
                    <input
                      type="text"
                      maxLength={120}
                      placeholder="Modelo o detalle adicional (opcional)..."
                      value={printerCustomProblem}
                      onChange={(e) => setPrinterCustomProblem(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:border-nexo-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-500/10 sm:px-3.5 sm:py-2.5"
                    />
                  </div>
                </div>
              </div>

              {/* Botón CTA */}
              <div className="mt-6 pt-1 sm:mt-8 sm:pt-2">
                <a
                  href={printerLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-nexo-blue to-cyan-600 px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-cyan-500/35 active:scale-[0.98] sm:px-6 sm:py-3.5"
                >
                  <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover/btn:rotate-12" />
                  <span className="truncate">
                    {selectedPrinterChip || printerCustomProblem.trim()
                      ? "Solicitar diagnóstico personalizado"
                      : "Solicitar diagnóstico de impresora"}
                  </span>
                  <ArrowUpRightIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-75 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:opacity-100" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Banner Horizontal: "¿No sabes qué necesita tu equipo?" */}
        <Reveal delay={180} className="mt-6 sm:mt-10 lg:mt-12">
          <div className="group relative overflow-hidden rounded-2xl border border-nexo-border bg-gradient-to-r from-nexo-panel via-nexo-bg2 to-nexo-bg p-5 text-white shadow-2xl transition-all duration-300 hover:border-cyan-500/30 sm:rounded-3xl sm:p-8 lg:p-10">
            {/* Brillo de fondo */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full bg-cyan-400/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 h-60 w-60 rounded-full bg-indigo-500/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex flex-col items-start justify-between gap-5 sm:gap-6 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-white/10 text-cyan-300 ring-1 ring-inset ring-white/15 backdrop-blur transition-transform duration-300 group-hover:scale-105">
                    <WrenchIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                    Orientación Directa
                  </span>
                </div>
                <h3 className="mt-2.5 text-lg font-bold tracking-tight text-white sm:mt-3 sm:text-2xl lg:text-3xl">
                  ¿No estás seguro de qué necesita tu equipo?
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm lg:text-base leading-relaxed text-blue-100/90">
                  Cuéntanos qué comportamiento o falla presenta. Un técnico de NeXo evaluará la situación y te orientará directamente por WhatsApp sin compromiso.
                </p>
              </div>

              <div className="w-full shrink-0 md:w-auto">
                <a
                  href={techHelpWhatsAppLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold text-slate-950 shadow-xl transition-all duration-200 hover:scale-[1.03] hover:bg-slate-100 active:scale-[0.98] sm:w-auto"
                >
                  <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 transition-transform duration-300 group-hover/btn:rotate-12" />
                  <span>Hablar con un técnico</span>
                  <ArrowUpRightIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
