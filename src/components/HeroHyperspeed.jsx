import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react"
import HeroBackdropIOS from "./HeroBackdropIOS"

// Carga diferida: three.js/postprocessing salen del bundle inicial (code-split)
const Hyperspeed = lazy(() => import("./Hyperspeed"))

// === EXPERIMENTO ===
// true  -> intenta WebGL en iOS (ultra-lite) con paracaídas: si va lento o se
//          pierde el contexto, cae solo al fondo CSS.
// false -> iOS siempre usa el fondo CSS (estado estable anterior).
const IOS_WEBGL_EXPERIMENT = true

// Perfil "lite" para Android (móvil no iOS).
const MOBILE_OVERRIDES = {
  totalSideLightSticks: 10,
  lightPairsPerRoadWay: 18,
  maxPixelRatio: 1,
}

// Perfil ULTRA-lite para iOS (pocos objetos, 1x, 30 FPS).
const IOS_OVERRIDES = {
  totalSideLightSticks: 6,
  lightPairsPerRoadWay: 10,
  lanesPerRoad: 2,
  maxPixelRatio: 1,
  maxFPS: 30,
}

// Detecta iOS/iPadOS (incluye el iPad que se hace pasar por Mac).
function detectIOS() {
  if (typeof navigator === "undefined") return false
  const ua = navigator.userAgent || ""
  const iPadAsMac =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1
  return /iP(hone|od|ad)/.test(ua) || iPadAsMac
}

export default function HeroHyperspeed({ options }) {
  const [enabled, setEnabled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [ios] = useState(detectIOS)
  const [ready, setReady] = useState(false)
  // Paracaídas: si el experimento WebGL-iOS falla, caemos al fondo CSS.
  const [iosFallback, setIosFallback] = useState(false)
  const layerRef = useRef(null)

  // En iOS usamos WebGL solo si el experimento está activo y no cayó el paracaídas.
  const useWebgl = !ios || (IOS_WEBGL_EXPERIMENT && !iosFallback)

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
  useEffect(() => {
    if (!enabled) return
    const t = window.setTimeout(() => setReady(true), 250)
    return () => window.clearTimeout(t)
  }, [enabled])

  // Paracaídas 1: monitor de FPS tras montar WebGL en iOS. Si va lento -> CSS.
  useEffect(() => {
    if (!enabled || !ios || !IOS_WEBGL_EXPERIMENT || iosFallback || !ready) return
    let frames = 0
    let startT = 0
    let raf = 0
    const loop = (t) => {
      if (!startT) startT = t
      frames++
      const elapsed = t - startT
      if (elapsed >= 3000) {
        const fps = (frames / elapsed) * 1000
        if (fps < 35) setIosFallback(true)
        return
      }
      raf = requestAnimationFrame(loop)
    }
    // Espera ~1.5s a que terminen de compilar shaders antes de medir.
    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(loop)
    }, 1500)
    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [enabled, ios, iosFallback, ready])

  // Paracaídas 2: si Safari mata el contexto WebGL -> CSS.
  useEffect(() => {
    if (!enabled || !ios || !IOS_WEBGL_EXPERIMENT || iosFallback || !ready) return
    const layer = layerRef.current
    if (!layer) return
    let canvas = null
    let tries = 0
    let timer = 0
    const onLost = (e) => {
      if (e && e.preventDefault) e.preventDefault()
      setIosFallback(true)
    }
    const find = () => {
      canvas = layer.querySelector("canvas")
      if (canvas) canvas.addEventListener("webglcontextlost", onLost)
      else if (tries++ < 25) timer = window.setTimeout(find, 200)
    }
    find()
    return () => {
      window.clearTimeout(timer)
      if (canvas) canvas.removeEventListener("webglcontextlost", onLost)
    }
  }, [enabled, ios, iosFallback, ready])

  // Difuminado progresivo según el scroll (solo WebGL no-iOS).
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

  // Referencia ESTABLE de opciones (si cambia, Hyperspeed recrea la escena).
  const effectOptions = useMemo(() => {
    if (ios) return { ...options, ...IOS_OVERRIDES }
    return mobile
      ? { ...options, ...MOBILE_OVERRIDES }
      : { ...options, maxPixelRatio: 1.5 }
  }, [ios, mobile, options])

  if (!enabled) return null

  return (
    <div ref={layerRef} className="hyperspeed-layer" aria-hidden="true">
      {useWebgl && ready ? (
        <Suspense fallback={null}>
          <Hyperspeed effectOptions={effectOptions} />
        </Suspense>
      ) : null}
      {!useWebgl ? <HeroBackdropIOS /> : null}
      <div className="hyperspeed-fade" />
    </div>
  )
}
