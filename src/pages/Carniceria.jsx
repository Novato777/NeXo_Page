import { useEffect, useRef, useState } from "react"
import {
  WhatsAppIcon,
  TruckIcon,
  ShieldCheckIcon,
  CheckIcon,
  MapPinIcon,
  ClockIcon,
} from "../components/Icons"

// ============================================================================
//  LANDING DEMO — CARNICERÍA  (proyecto de portafolio NeXo)
//  Edita este bloque para personalizarla al cliente real.
// ============================================================================
const NEGOCIO = {
  name: "El Buen Corte",
  whatsapp: "573000000000", // <-- número del cliente (formato internacional)
  city: "La Dorada, Caldas",
  hours: "Lun a Sáb · 7am – 8pm",
}

const wa = (msg) =>
  `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(msg)}`

// Cortes / categorías (precios de ejemplo, editables)
const CORTES = [
  { name: "Res", desc: "Lomo, churrasco, costilla y molida", price: "desde $14.900/lb", img: "/img/carnes/res.jpg", accent: "from-[#7f1d1d] to-[#c81e1e]" },
  { name: "Cerdo", desc: "Costilla, chuleta y tocino", price: "desde $11.900/lb", img: "/img/carnes/cerdo.jpg", accent: "from-[#9a3412] to-[#ea580c]" },
  { name: "Pollo", desc: "Pechuga, muslos y alas", price: "desde $7.900/lb", img: "/img/carnes/pollo.jpg", accent: "from-[#a16207] to-[#eab308]" },
  { name: "Embutidos", desc: "Chorizo, butifarra y salchicha", price: "desde $9.900/lb", img: "/img/carnes/embutidos.jpg", accent: "from-[#7f1d1d] to-[#b45309]" },
]

// Combos de parrilla (editables)
const COMBOS = [
  {
    name: "Combo Asado Familiar",
    serves: "Para 6–8 personas",
    includes: ["2 lb de res", "2 lb de cerdo", "1 lb de chorizo", "1 lb de pollo"],
    price: "$79.900",
    img: "/img/carnes/combo-asado.jpg",
    featured: true,
  },
  {
    name: "Combo Parrillada",
    serves: "Para 3–4 personas",
    includes: ["1.5 lb de res", "1 lb de costilla", "1 lb de chorizo"],
    price: "$49.900",
    img: "/img/carnes/combo-parrilla.jpg",
  },
  {
    name: "Combo Express",
    serves: "Para 2 personas",
    includes: ["1 lb de churrasco", "½ lb de chorizo"],
    price: "$24.900",
    img: "/img/carnes/combo-express.jpg",
  },
]

const PORQUE = [
  { icon: CheckIcon, title: "Frescura del día", text: "Cortamos a diario. Siempre fresco, nunca recongelado." },
  { icon: ShieldCheckIcon, title: "Calidad seleccionada", text: "Res, cerdo y pollo de primera, escogidos a mano." },
  { icon: TruckIcon, title: "Domicilio rápido", text: "Te lo llevamos a casa, listo para cocinar." },
  { icon: WhatsAppIcon, title: "Pide fácil", text: "Tu pedido por WhatsApp en segundos." },
]

const PASOS = [
  { n: "1", title: "Elige tus cortes", text: "Mira nuestros cortes o un combo de parrilla." },
  { n: "2", title: "Escríbenos por WhatsApp", text: "Mándanos tu pedido, te atendemos al instante." },
  { n: "3", title: "Recíbelo fresco", text: "Te lo llevamos a tu casa, listo para el fuego." },
]

// ----- Helpers -----

// Imagen con fallback a degradado (mientras no haya foto real).
function Img({ src, alt, className = "", fallback = "from-[#3a1414] to-[#160d0b]", label }) {
  const [err, setErr] = useState(false)
  if (!src || err) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br ${fallback} ${className}`}>
        {label && (
          <span className="px-4 text-center text-lg font-bold uppercase tracking-wider text-white/85">
            {label}
          </span>
        )}
      </div>
    )
  }
  return (
    <img src={src} alt={alt} loading="lazy" onError={() => setErr(true)} className={className} />
  )
}

// Aparición suave al hacer scroll (IntersectionObserver, sin dependencias).
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  )
}

const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-[#f59e0b]">
    <span className="h-px w-8 bg-[#f59e0b]" />
    {children}
  </span>
)

// ----- Secciones -----

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#3d2420]/60 bg-[#160d0b]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#dc2626] to-[#7f1d1d] text-lg">
            🥩
          </span>
          <span className="text-xl font-extrabold tracking-tight text-[#f3e9dc]">
            {NEGOCIO.name}
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-[#c9b8a8] md:flex">
          <a href="#cortes" className="transition-colors hover:text-[#f59e0b]">Cortes</a>
          <a href="#combos" className="transition-colors hover:text-[#f59e0b]">Combos</a>
          <a href="#contacto" className="transition-colors hover:text-[#f59e0b]">Contacto</a>
        </nav>
        <a
          href={wa(`Hola ${NEGOCIO.name}, quiero hacer un pedido.`)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#dc2626] to-[#b91c1c] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Pedir ahora</span>
          <span className="sm:hidden">Pedir</span>
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-dvh items-center overflow-hidden">
      <div className="absolute inset-0">
        <Img
          src="/img/carnes/hero.jpg"
          alt="Cortes de carne premium"
          className="h-full w-full object-cover"
          fallback="from-[#2a0e0c] via-[#3a1412] to-[#160d0b]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#160d0b] via-[#160d0b]/85 to-[#160d0b]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#160d0b] via-transparent to-[#160d0b]/40" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-16">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Carnicería premium · {NEGOCIO.city}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight text-[#f3e9dc] sm:text-7xl">
              Carne fresca,
              <span className="block bg-gradient-to-r from-[#f59e0b] to-[#dc2626] bg-clip-text text-transparent">
                cortes premium
              </span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-lg text-lg text-[#cbb8a7] sm:text-xl">
              Las mejores carnes, seleccionadas y cortadas cada día. Pídelas y te
              las llevamos fresquitas a tu casa.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={wa(`Hola ${NEGOCIO.name}, quiero hacer un pedido.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#dc2626] to-[#b91c1c] px-8 py-4 text-lg font-bold text-white shadow-[0_10px_40px_-10px_rgba(220,38,38,0.7)] transition-transform hover:scale-105"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Pedir por WhatsApp
              </a>
              <a
                href="#cortes"
                className="inline-flex items-center justify-center rounded-full border border-[#f59e0b]/50 px-8 py-4 text-lg font-bold text-[#f3e9dc] transition-colors hover:bg-[#f59e0b]/10"
              >
                Ver cortes
              </a>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-sm font-semibold text-[#cbb8a7]">
              <span className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-[#f59e0b]" /> Fresco del día</span>
              <span className="flex items-center gap-2"><TruckIcon className="h-4 w-4 text-[#f59e0b]" /> Domicilio a tu casa</span>
              <span className="flex items-center gap-2"><ShieldCheckIcon className="h-4 w-4 text-[#f59e0b]" /> Calidad garantizada</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  const items = [
    { icon: CheckIcon, t: "Carne fresca del día" },
    { icon: TruckIcon, t: "Domicilio rápido" },
    { icon: ShieldCheckIcon, t: "Calidad garantizada" },
    { icon: WhatsAppIcon, t: "Pago contra entrega" },
  ]
  return (
    <div className="border-y border-[#3d2420]/60 bg-[#1e1210]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 py-6 sm:grid-cols-4">
        {items.map((it) => {
          const Icon = it.icon
          return (
            <div key={it.t} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dc2626]/15 text-[#f59e0b]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-[#e7d8c8]">{it.t}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Cortes() {
  return (
    <section id="cortes" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Reveal className="text-center">
        <Eyebrow>Nuestros cortes</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-black tracking-tight text-[#f3e9dc] sm:text-5xl">
          Lo mejor de la carne, en un solo lugar
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[#cbb8a7]">
          Res, cerdo, pollo y embutidos frescos. Pide por libra lo que necesites.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CORTES.map((c, i) => (
          <Reveal key={c.name} delay={i * 80}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#3d2420] bg-[#241513] transition-all duration-300 hover:-translate-y-1 hover:border-[#dc2626]/60 hover:shadow-[0_20px_40px_-20px_rgba(220,38,38,0.6)]">
              <div className="relative aspect-square overflow-hidden">
                <Img
                  src={c.img}
                  alt={c.name}
                  label={c.name}
                  fallback={c.accent}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-[#160d0b]/80 px-3 py-1 text-xs font-bold text-[#f59e0b] backdrop-blur">
                  {c.price}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-extrabold text-[#f3e9dc]">{c.name}</h3>
                <p className="mt-1 flex-1 text-sm text-[#cbb8a7]">{c.desc}</p>
                <a
                  href={wa(`Hola ${NEGOCIO.name}, quiero pedir *${c.name}*. ¿Me ayudas?`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#dc2626] to-[#b91c1c] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Pedir
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Combos() {
  return (
    <section id="combos" className="border-y border-[#3d2420]/60 bg-[#1e1210]">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal className="text-center">
          <Eyebrow>Combos de parrilla</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-black tracking-tight text-[#f3e9dc] sm:text-5xl">
            Arma tu asado sin complicarte
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#cbb8a7]">
            Paquetes listos con todo lo que necesitas. Mejor precio, todo incluido.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {COMBOS.map((combo, i) => (
            <Reveal key={combo.name} delay={i * 90}>
              <div
                className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-[#241513] transition-all duration-300 hover:-translate-y-1 ${
                  combo.featured
                    ? "border-[#f59e0b]/70 shadow-[0_20px_50px_-20px_rgba(245,158,11,0.5)]"
                    : "border-[#3d2420] hover:border-[#dc2626]/60"
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Img
                    src={combo.img}
                    alt={combo.name}
                    label="Combo parrilla"
                    fallback="from-[#7f1d1d] to-[#9a3412]"
                    className="h-full w-full object-cover"
                  />
                  {combo.featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#f59e0b] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#160d0b]">
                      Más pedido
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-extrabold text-[#f3e9dc]">{combo.name}</h3>
                  <p className="text-sm font-semibold text-[#f59e0b]">{combo.serves}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {combo.includes.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-sm text-[#e7d8c8]">
                        <CheckIcon className="h-4 w-4 shrink-0 text-[#dc2626]" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-end justify-between">
                    <span className="text-3xl font-black text-[#f3e9dc]">{combo.price}</span>
                  </div>
                  <a
                    href={wa(`Hola ${NEGOCIO.name}, quiero el *${combo.name}* (${combo.price}). ¿Me ayudas?`)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#dc2626] to-[#b91c1c] px-5 py-3 font-bold text-white transition-transform hover:scale-[1.02]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Pedir combo
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Porque() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Reveal className="text-center">
        <Eyebrow>Por qué elegirnos</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-black tracking-tight text-[#f3e9dc] sm:text-5xl">
          Calidad que se nota en cada corte
        </h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PORQUE.map((p, i) => {
          const Icon = p.icon
          return (
            <Reveal key={p.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-[#3d2420] bg-[#241513] p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#dc2626] to-[#7f1d1d] text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-[#f3e9dc]">{p.title}</h3>
                <p className="mt-1 text-sm text-[#cbb8a7]">{p.text}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function Pasos() {
  return (
    <section className="border-t border-[#3d2420]/60 bg-[#1e1210]">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal className="text-center">
          <Eyebrow>Pedir es muy fácil</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-black tracking-tight text-[#f3e9dc] sm:text-5xl">
            En 3 pasos, a tu mesa
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PASOS.map((p, i) => (
            <Reveal key={p.n} delay={i * 100}>
              <div className="relative h-full rounded-2xl border border-[#3d2420] bg-[#241513] p-7">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#f59e0b] to-[#dc2626] text-2xl font-black text-[#160d0b]">
                  {p.n}
                </span>
                <h3 className="mt-4 text-xl font-extrabold text-[#f3e9dc]">{p.title}</h3>
                <p className="mt-1 text-[#cbb8a7]">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTAFinal() {
  return (
    <section id="contacto" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Img
          src="/img/carnes/cta.jpg"
          alt="Parrilla encendida"
          className="h-full w-full object-cover"
          fallback="from-[#3a1412] to-[#160d0b]"
        />
        <div className="absolute inset-0 bg-[#160d0b]/85" />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <Reveal>
          <h2 className="text-4xl font-black tracking-tight text-[#f3e9dc] sm:text-6xl">
            ¿Listo para tu próximo{" "}
            <span className="bg-gradient-to-r from-[#f59e0b] to-[#dc2626] bg-clip-text text-transparent">
              asado
            </span>
            ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-[#cbb8a7]">
            Escríbenos y te atendemos al instante. Carne fresca, a tu puerta.
          </p>
          <a
            href={wa(`Hola ${NEGOCIO.name}, quiero hacer un pedido.`)}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#dc2626] to-[#b91c1c] px-10 py-4 text-lg font-bold text-white shadow-[0_10px_40px_-10px_rgba(220,38,38,0.7)] transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Pedir por WhatsApp
          </a>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 text-sm text-[#cbb8a7] sm:flex-row sm:gap-8">
            <span className="flex items-center gap-2"><MapPinIcon className="h-4 w-4 text-[#f59e0b]" /> {NEGOCIO.city}</span>
            <span className="flex items-center gap-2"><ClockIcon className="h-4 w-4 text-[#f59e0b]" /> {NEGOCIO.hours}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#3d2420]/60 bg-[#160d0b]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-7 text-sm text-[#a18b7a] sm:flex-row">
        <p className="font-bold text-[#f3e9dc]">🥩 {NEGOCIO.name}</p>
        <p>© 2026 {NEGOCIO.name}. Todos los derechos reservados.</p>
        <p>
          Hecho por{" "}
          <a href="/" className="font-semibold text-[#f59e0b] hover:underline">
            NeXo
          </a>
        </p>
      </div>
    </footer>
  )
}

export default function Carniceria() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-dvh bg-[#160d0b] font-sans text-[#f3e9dc]">
      <Nav />
      <Hero />
      <TrustStrip />
      <Cortes />
      <Combos />
      <Porque />
      <Pasos />
      <CTAFinal />
      <Footer />
    </div>
  )
}
