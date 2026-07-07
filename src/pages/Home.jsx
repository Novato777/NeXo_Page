import { useEffect } from "react"
import Lenis from "lenis"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Services from "../components/Services"
import Process from "../components/Process"
import Portfolio from "../components/Portfolio"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

export default function Home() {
  // Scroll suave (Lenis). Los anchors #seccion siguen funcionando.
  useEffect(() => {
    window.scrollTo(0, 0)
    const lenis = new Lenis({ duration: 1.0, smoothWheel: true, anchors: true })
    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="bg-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
