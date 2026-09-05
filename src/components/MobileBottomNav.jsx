import { useEffect, useState } from "react"
import {
  HomeIcon,
  CodeIcon,
  WrenchIcon,
  FolderIcon,
  ChatIcon,
} from "./Icons"

const navItems = [
  { id: "inicio", label: "Inicio", icon: HomeIcon, href: "#inicio" },
  { id: "servicios", label: "Software", icon: CodeIcon, href: "#servicios" },
  { id: "servicio-tecnico", label: "Técnico", icon: WrenchIcon, href: "#servicio-tecnico" },
  { id: "portafolio", label: "Portafolio", icon: FolderIcon, href: "#portafolio" },
  { id: "contacto", label: "Contacto", icon: ChatIcon, href: "#contacto" },
]

export default function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState("inicio")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250
      const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean)

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      aria-label="Navegación rápida móvil"
      className="fixed bottom-3 inset-x-3 z-50 mx-auto max-w-md md:hidden transition-all duration-300"
    >
      <div className="flex items-center justify-around rounded-2xl border border-slate-200/90 bg-white/90 p-1.5 shadow-xl shadow-slate-900/10 backdrop-blur-xl ring-1 ring-slate-900/5">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <a
              key={item.id}
              href={item.href}
              className={`relative flex flex-1 flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-200 active:scale-90 ${
                isActive
                  ? "text-nexo-blue font-semibold bg-blue-50/80 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? "scale-110" : ""}`} />
              <span className="mt-1 text-[10px] tracking-tight leading-none">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-0.5 h-1 w-4 rounded-full bg-gradient-to-r from-nexo-indigo to-nexo-cyan" />
              )}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
