import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react"

// Carga diferida: three.js/postprocessing salen del bundle inicial (code-split)
const Hyperspeed = lazy(() => import("./Hyperspeed"))

// Perfil "lite" para móvil: menos objetos en escena + menor resolución de
// render, para que sea fluido también en iOS sin cambiar el look.
const MOBILE_OVERRIDES = {
  totalSideLightSticks: 10, // antes 20
  lightPairsPerRoadWay: 18, // antes 40
  maxPixelRatio: 1, // antes hasta 1.5 -> ~2x menos trabajo de GPU
}

// Capa de fondo Hyperspeed: fija (sticky) sobre el Hero. Activa también en
// móvil con perfil optimizado, salvo "reducir movimiento" (accesibilidad).
export default function HeroHyperspeed({ options }) {
  const [enabled, setEnabled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [ready, setReady] = useState(false)
  const layerRef = useRef(null)

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mqMobile = window.matchMedia("(max-width: 768px)")
    const apply = () => {
      setMobile(mqMobile.matches)
      setEnabled(!mqReduce.matches)
    }
    apply()
    mqReduce.addEventListener("change", apply)
    mqMobile.addEventListener("change", apply)
    return () => {
      mqReduce.removeEventListener("change", apply)
      mqMobile.removeEventListener("change", apply)
    }
  }, [])

  // Difiere el arranque del WebGL para que el contenido pinte primero
  // (carga percibida más rápida, sobre todo en iOS).
  useEffect(() => {
    if (!enabled) return
    const t = window.setTimeout(() => setReady(true), 250)
    return () => window.clearTimeout(t)
  }, [enabled])

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

  // Referencia ESTABLE de opciones (si cambia, Hyperspeed recrea toda la escena).
  const effectOptions = useMemo(
    () =>
      mobile
        ? { ...options, ...MOBILE_OVERRIDES }
        : { ...options, maxPixelRatio: 1.5 },
    [mobile, options]
  )

  if (!enabled) return null

  return (
    <div ref={layerRef} className="hyperspeed-layer" aria-hidden="true">
      {ready && (
        <Suspense fallback={null}>
          <Hyperspeed effectOptions={effectOptions} />
        </Suspense>
      )}
      <div className="hyperspeed-fade" />
    </div>
  )
}
