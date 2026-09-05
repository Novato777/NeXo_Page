import { useEffect, useState } from "react"
import Logo from "./Logo"
import { whatsappLink } from "../data/site"
import { WhatsAppIcon } from "./Icons"

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Servicio Técnico", href: "#servicio-tecnico" },
  { label: "Proceso", href: "#proceso" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Contacto", href: "#contacto" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.60) 100%)"
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.45) 100%)",
        backdropFilter: "blur(28px) saturate(200%)",
        WebkitBackdropFilter: "blur(28px) saturate(200%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.85)",
        boxShadow: scrolled
          ? "0 10px 35px -5px rgba(0, 0, 0, 0.08), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 0 0 rgba(255, 255, 255, 0.4)"
          : "0 4px 25px -2px rgba(0, 0, 0, 0.05), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#inicio" className="flex items-center gap-1" aria-label="NeXo inicio">
          <Logo size={60} className="-my-2 drop-shadow-[0_2px_8px_rgba(37,99,235,0.3)]" />
          <span className="text-[26px] font-extrabold tracking-tight text-slate-900">
            Ne<span className="text-gradient">X</span>o
          </span>
        </a>

        {/* Enlaces en píldora de cristal esmerilado */}
        <nav
          className="hidden items-center gap-0.5 rounded-full px-2 py-1 shadow-sm md:flex lg:gap-1"
          style={{
            background: "rgba(255, 255, 255, 0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.85)",
            boxShadow:
              "inset 0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 10px rgba(0, 0, 0, 0.03)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-white/80 hover:text-slate-950 lg:px-4 lg:text-sm"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-nexo-indigo to-nexo-blue px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:brightness-110"
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Hablemos</span>
          <span className="sm:hidden">Contacto</span>
        </a>
      </div>
    </header>
  )
}
