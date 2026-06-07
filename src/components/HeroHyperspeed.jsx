import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react"
import HeroBackdropIOS from "./HeroBackdropIOS"

// Carga diferida: three.js/postprocessing salen del bundle inicial (code-split)
const Hyperspeed = lazy(() => import("./Hyperspeed"))

// Perfil "lite" para móvil NO iOS (Android): menos objetos + menor resolución.
const MOBILE_OVERRIDES = {
  totalSideLightSticks: 10, // antes 20
  lightPairsPerRoadWay: 18, // antes 40
  maxPixelRatio: 1,
}

// Detecta iOS/iPadOS (incluye el iPad que se hace pasar por Mac). En iOS todos
// los navegadores usan WebKit, así que apuntamos al sistema, no al navegador.
function detectIOS() {
  if (typeof navigator === "undefined") return false
  const ua = navigator.userAgent || ""
  const iPadAsMac =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1
  return /iP(hone|od|ad)/.test(ua) || iPadAsMac
}

// Capa de fondo del Hero (sticky). En iOS usa un fondo "Hyperspeed" en CSS
// (sin WebGL, fluido). En Android/PC usa el WebGL real (Three.js).
export default function HeroHyperspeed({ options }) {
  const [enabled, setEnabled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [ios] = useState(detectIOS)
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

  // Difiere el arranque del WebGL para que el contenido pinte primero.
  // (No aplica en iOS, que no carga WebGL.)
  useEffect(() => {
    if (!enabled || ios) return
    const t = window.setTimeout(() => setReady(true), 250)
    return () => window.clearTimeout(t)
  }, [enabled, ios])

  // Difuminado progresivo según el scroll (solo WebGL; en iOS evitamos filtrar
  // una capa animada por rendimiento).
  useEffect(() => {
    if (!enabled || ios) return
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
  }, [enabled, ios])

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
      {ios ? (
        <HeroBackdropIOS />
      ) : ready ? (
        <Suspense fallback={null}>
          <Hyperspeed effectOptions={effectOptions} />
        </Suspense>
      ) : null}
      <div className="hyperspeed-fade" />
    </div>
  )
}
