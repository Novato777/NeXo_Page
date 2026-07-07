import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import CardNav from "../components/CardNav"
import Hero from "../components/Hero"
import Services from "../components/Services"
import Portfolio from "../components/Portfolio"
// Tienda (NeXo Drop) deshabilitada por ahora. Para reactivarla, descomenta
// este import, su render más abajo, el item "Tienda" del menú y la ruta de
// producto en App.jsx.
// import Store from "../components/Store"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import HeroHyperspeed from "../components/HeroHyperspeed"
import ErrorBoundary from "../components/ErrorBoundary"
import { site, whatsappLink } from "../data/site"

gsap.registerPlugin(ScrollTrigger)

// Opciones del fondo Hyperspeed (paleta cian + violeta para NeXo).
// Definido fuera del componente => referencia estable (no recrea la escena WebGL).
const hyperspeedOptions = {
  distortion: "turbulentDistortion",
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [35, 50],
  movingCloserSpeed: [-70, -100],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0x131318,
    brokenLines: 0x131318,
    leftCars: [0x7c3aed, 0x6d28d9, 0x4f46e5], // violetas / índigo
    rightCars: [0x22d3ee, 0x3b82f6, 0x0e5ea5], // cian / azul
    sticks: 0x22d3ee, // cian
  },
}

const navItems = [
  {
    label: "Portafolio",
    href: "#portafolio",
    bgColor: "#0d1730",
    textColor: "#e8eefc",
    links: [
      { label: "BarberControl", ariaLabel: "Ver BarberControl", href: "#portafolio" },
      { label: "Ver todos", ariaLabel: "Ver portafolio", href: "#portafolio" },
    ],
  },
  {
    label: "Servicios",
    href: "#servicios",
    bgColor: "#0f1a30",
    textColor: "#e8eefc",
    links: [
      { label: "Páginas web", ariaLabel: "Páginas web", href: "#servicios" },
      { label: "Sistemas a medida", ariaLabel: "Sistemas a medida", href: "#servicios" },
      { label: "Automatizaciones", ariaLabel: "Automatizaciones", href: "#servicios" },
    ],
  },
  {
    label: "Contacto",
    href: "#contacto",
    bgColor: "#0b1426",
    textColor: "#e8eefc",
    links: [
      { label: "WhatsApp", ariaLabel: "Escríbenos por WhatsApp", href: whatsappLink },
      { label: "Correo", ariaLabel: "Envíanos un correo", href: `mailto:${site.email}` },
      { label: "Ubicación", ariaLabel: "Nuestra ubicación", href: "#contacto" },
    ],
  },
]

export default function Home() {
  // Smooth scroll (Lenis) integrado con GSAP/ScrollTrigger (para el ScrollReveal).
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      smoothWheel: true, // la rueda funciona de forma normal y fluida
      anchors: true, // los enlaces #seccion siguen funcionando suave
    })

    lenis.on("scroll", ScrollTrigger.update)

    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    // Prioriza el Hero. Solo saltamos a una sección si hubo intención explícita
    // (p. ej. "Volver a la tienda" desde una landing), guardada en sessionStorage.
    const intent = sessionStorage.getItem("nexo-scroll")
    sessionStorage.removeItem("nexo-scroll")
    if (intent) {
      const target = document.getElementById(intent)
      if (target) {
        window.setTimeout(() => target.scrollIntoView(), 60)
      }
    } else {
      window.scrollTo(0, 0)
    }

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <CardNav items={navItems} ctaLabel="WhatsApp" ctaHref={whatsappLink} />
      <main>
        {/* Escenario superior: Hero sobre el fondo Hyperspeed */}
        <div className="top-stage">
          {/* Si WebGL falla en iOS (Lockdown Mode, sin contexto), la página
              sigue cargando sin el fondo animado en vez de quedar en blanco. */}
          <ErrorBoundary fallback={null}>
            <HeroHyperspeed options={hyperspeedOptions} />
          </ErrorBoundary>
          <Hero />
        </div>
        {/* Capa superior opaca: de la tienda en adelante SIEMPRE por encima del fondo */}
        <div className="relative z-10 bg-nexo-bg">
          {/* <Store /> — tienda NeXo Drop deshabilitada por ahora */}
          <Portfolio />
          <Services />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}
