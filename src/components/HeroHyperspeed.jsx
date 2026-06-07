import { lazy, Suspense, useEffect, useRef, useState } from "react"

// Carga diferida: three.js/postprocessing salen del bundle inicial (code-split)
const Hyperspeed = lazy(() => import("./Hyperspeed"))

// Capa de fondo Hyperspeed: fija (sticky) sobre Hero + Servicios,
// nítida arriba y con blur fuerte al hacer scroll. Activa también en móvil,
// salvo que el usuario prefiera menos movimiento (accesibilidad).
export default function HeroHyperspeed({ options }) {
  const [enabled, setEnabled] = useState(false)
  const layerRef = useRef(null)

  useEffect(() => {
    // Desactivado en móvil (rendimiento: Three.js ahoga Safari iOS y tarda en
    // cargar) y si el usuario prefiere menos movimiento (accesibilidad).
    // Al quedar deshabilitado, el chunk de Three.js ni siquiera se descarga.
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mqMobile = window.matchMedia("(max-width: 768px)")
    const apply = () => setEnabled(!mqReduce.matches && !mqMobile.matches)
    apply()
    mqReduce.addEventListener("change", apply)
    mqMobile.addEventListener("change", apply)
    return () => {
      mqReduce.removeEventListener("change", apply)
      mqMobile.removeEventListener("change", apply)
    }
  }, [])

  // Difuminado progresivo según el scroll (0 → 14px en ~1 viewport)
  useEffect(() => {
    if (!enabled) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const vh = window.innerHeight || 1
        const blur = Math.min(14, (window.scrollY / vh) * 16)
        if (layerRef.current) {
          layerRef.current.style.filter = blur > 0.2 ? `blur(${blur}px)` : "none"
        }
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={layerRef} className="hyperspeed-layer" aria-hidden="true">
      <Suspense fallback={null}>
        <Hyperspeed effectOptions={options} />
      </Suspense>
      <div className="hyperspeed-fade" />
    </div>
  )
}
