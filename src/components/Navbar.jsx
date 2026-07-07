import { useEffect, useState } from "react"
import Logo from "./Logo"
import { whatsappLink } from "../data/site"
import { WhatsAppIcon } from "./Icons"

const links = [
  { label: "Servicios", href: "#servicios" },
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#inicio" className="flex items-center gap-1" aria-label="NeXo inicio">
          <Logo size={60} className="-my-2 drop-shadow-[0_2px_8px_rgba(37,99,235,0.3)]" />
          <span className="text-[26px] font-extrabold tracking-tight text-slate-900">
            Ne<span className="text-gradient">X</span>o
          </span>
        </a>

        {/* Enlaces en píldora esmerilada */}
        <nav className="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-white/60 px-2 py-1 shadow-sm backdrop-blur md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
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
