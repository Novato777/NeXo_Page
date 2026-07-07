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
          ? "border-b border-slate-200 bg-white/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a href="#inicio" className="flex items-center gap-2.5" aria-label="NeXo inicio">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 shadow-sm ring-1 ring-slate-800">
            <Logo size={26} />
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Ne<span className="text-gradient">X</span>o
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-slate-900">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md"
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Hablemos</span>
          <span className="sm:hidden">Contacto</span>
        </a>
      </div>
    </header>
  )
}
