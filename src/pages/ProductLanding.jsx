import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getProductBySlug, buyLink, discountPercent } from "../data/store"
import Footer from "../components/Footer"
import Logo from "../components/Logo"
import {
  BagIcon,
  WhatsAppIcon,
  CheckIcon,
  TruckIcon,
  ShieldCheckIcon,
  HeadphonesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
} from "../components/Icons"
import { SiTiktok, SiInstagram } from "react-icons/si"

const trust = [
  { icon: WhatsAppIcon, label: "Atención por WhatsApp" },
  { icon: TruckIcon, label: "Envíos a todo el país" },
  { icon: ShieldCheckIcon, label: "Compras seguras" },
  { icon: HeadphonesIcon, label: "Soporte personalizado" },
]

// Información de envíos y pago (edítala según cómo manejes la logística).
const info = [
  {
    icon: TruckIcon,
    title: "Envíos a todo el país",
    text: "Despachamos a toda Colombia. Coordinamos el envío por WhatsApp.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Pago fácil y seguro",
    text: "Paga por Nequi o transferencia. Te confirmamos cada paso.",
  },
  {
    icon: HeadphonesIcon,
    title: "Garantía y soporte",
    text: "Te acompañamos antes y después de tu compra.",
  },
]

// Galería deslizable tipo catálogo (varias fotos + video opcional + miniaturas).
function MediaGallery({ product }) {
  const L = product.landing || {}
  const slides = useMemo(() => {
    const arr = []
    if (L.video) arr.push({ type: "video", src: L.video })
    ;[product.image, ...(L.gallery || [])]
      .filter(Boolean)
      .forEach((src) => arr.push({ type: "image", src }))
    return arr
  }, [product.image, L.video, L.gallery])

  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const scrollToIndex = (i) => {
    const track = trackRef.current
    if (!track) return
    const clamped = Math.max(0, Math.min(i, slides.length - 1))
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" })
  }

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    setActive(Math.round(track.scrollLeft / track.clientWidth))
  }

  // Sin fotos ni video -> placeholder
  if (slides.length === 0) {
    return (
      <div className="lg:sticky lg:top-24">
        <div className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-nexo-border bg-gradient-to-br ${product.accent}`}>
          <BagIcon className="h-24 w-24 text-nexo-bg/80" />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-nexo-lime px-3 py-1 text-xs font-bold uppercase tracking-wide text-nexo-bg">
              {product.badge}
            </span>
          )}
        </div>
      </div>
    )
  }

  const multiple = slides.length > 1

  return (
    <div className="lg:sticky lg:top-24">
      <div className="relative">
        {/* Pista deslizable */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="no-scrollbar flex aspect-square w-full snap-x snap-mandatory overflow-x-auto rounded-2xl border border-nexo-border bg-nexo-panel"
        >
          {slides.map((s, i) =>
            s.type === "video" ? (
              <video
                key={i}
                src={s.src}
                controls
                playsInline
                className="h-full w-full shrink-0 snap-center object-cover"
              />
            ) : (
              <img
                key={i}
                src={s.src}
                alt={`${product.name} ${i + 1}`}
                className="h-full w-full shrink-0 snap-center object-cover"
              />
            )
          )}
        </div>

        {product.badge && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-nexo-lime px-3 py-1 text-xs font-bold uppercase tracking-wide text-nexo-bg">
            {product.badge}
          </span>
        )}

        {multiple && (
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-nexo-bg/70 px-2.5 py-1 text-xs font-semibold text-nexo-text backdrop-blur">
            {active + 1}/{slides.length}
          </span>
        )}

        {/* Flechas (escritorio) */}
        {multiple && (
          <>
            <button
              onClick={() => scrollToIndex(active - 1)}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-nexo-border bg-nexo-bg/70 text-nexo-text backdrop-blur transition-colors hover:border-nexo-cyan hover:text-nexo-cyan sm:flex"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={() => scrollToIndex(active + 1)}
              aria-label="Foto siguiente"
              className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-nexo-border bg-nexo-bg/70 text-nexo-text backdrop-blur transition-colors hover:border-nexo-cyan hover:text-nexo-cyan sm:flex"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {multiple && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === active ? "border-nexo-lime" : "border-nexo-border"
              }`}
            >
              {s.type === "video" ? (
                <span className="flex h-full w-full items-center justify-center bg-nexo-bg2 text-nexo-lime">
                  <PlayIcon className="h-5 w-5" />
                </span>
              ) : (
                <img src={s.src} alt="" className="h-full w-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProductLanding() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-nexo-bg px-6 text-center text-nexo-text">
        <BagIcon className="h-14 w-14 text-nexo-muted" />
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <a
          href="/#tienda"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-nexo-lime to-nexo-green px-6 py-3 font-semibold text-nexo-bg"
        >
          Volver a la tienda
        </a>
      </div>
    )
  }

  const L = product.landing || {}
  const discount = discountPercent(product)

  return (
    <div className="min-h-screen bg-nexo-bg text-nexo-text">
      {/* Barra superior */}
      <header className="sticky top-0 z-40 border-b border-nexo-border bg-nexo-bg/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5" aria-label="NeXo inicio">
            <Logo size={34} />
            <span className="text-2xl font-bold tracking-tight">
              Ne<span className="text-gradient">X</span>o
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="/#tienda"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-nexo-muted transition-colors hover:text-nexo-cyan sm:text-base"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Volver a la tienda
            </a>
            <a
              href={buyLink(product)}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-nexo-lime to-nexo-green px-5 py-2.5 text-sm font-semibold text-nexo-bg transition-transform hover:scale-105 sm:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Pedir
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-28 pt-8 lg:pb-16">
        {/* Encabezado: galería + info */}
        <div className="grid gap-10 lg:grid-cols-2">
          <MediaGallery product={product} />

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            {L.tagline && (
              <p className="mt-3 text-lg text-nexo-muted">{L.tagline}</p>
            )}

            {/* Precio */}
            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-4xl font-extrabold text-nexo-lime">
                {product.price}
              </span>
              {product.oldPrice && (
                <span className="text-lg text-nexo-muted line-through">
                  {product.oldPrice}
                </span>
              )}
              {discount && (
                <span className="rounded-full bg-nexo-lime/15 px-3 py-1 text-sm font-bold text-nexo-lime">
                  -{discount}% OFF
                </span>
              )}
            </div>

            {/* CTA WhatsApp */}
            <a
              href={buyLink(product)}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-nexo-lime to-nexo-green px-8 py-4 text-lg font-semibold text-nexo-bg shadow-[0_0_40px_-8px_rgba(163,230,53,0.6)] transition-transform hover:scale-[1.02] sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Pedir por WhatsApp
            </a>

            {/* Videos de publicidad (TikTok / Instagram) */}
            {(L.tiktok || L.instagram) && (
              <div className="mt-5">
                <p className="text-sm font-medium text-nexo-muted">
                  Míralo en acción 👀
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {L.tiktok && (
                    <a
                      href={L.tiktok}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-nexo-border bg-nexo-panel px-5 py-2.5 text-sm font-semibold text-nexo-text transition-colors hover:border-nexo-cyan hover:text-nexo-cyan"
                    >
                      <SiTiktok className="h-4 w-4" />
                      Ver en TikTok
                    </a>
                  )}
                  {L.instagram && (
                    <a
                      href={L.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-nexo-border bg-nexo-panel px-5 py-2.5 text-sm font-semibold text-nexo-text transition-colors hover:border-[#e1306c] hover:text-[#e1306c]"
                    >
                      <SiInstagram className="h-4 w-4" />
                      Ver en Instagram
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Sellos de confianza */}
            <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-3">
              {trust.map((t) => {
                const Icon = t.icon
                return (
                  <div key={t.label} className="flex items-center gap-2.5 text-sm text-nexo-muted">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nexo-lime/15 text-nexo-lime">
                      <Icon className="h-4 w-4" />
                    </span>
                    {t.label}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Beneficios (lista limpia, sin cara de botón) */}
        {L.benefits?.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold sm:text-3xl">
              ¿Por qué te va a{" "}
              <span className="text-gradient-lime">encantar</span>?
            </h2>
            <ul className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {L.benefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-nexo-lime to-nexo-green text-nexo-bg">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="text-lg text-nexo-text">{b}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Descripción */}
        {L.description && (
          <section className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-bold sm:text-3xl">Descripción</h2>
            <p className="mt-4 text-lg leading-relaxed text-nexo-muted">
              {L.description}
            </p>
          </section>
        )}

        {/* Envíos y pago */}
        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          {info.map((it) => {
            const Icon = it.icon
            return (
              <div
                key={it.title}
                className="rounded-2xl border border-nexo-border bg-nexo-panel/50 p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-nexo-lime/15 text-nexo-lime">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-semibold text-nexo-text">{it.title}</h3>
                <p className="mt-1 text-sm text-nexo-muted">{it.text}</p>
              </div>
            )
          })}
        </section>

        {/* CTA final */}
        <section className="mt-16 rounded-2xl border border-nexo-lime/30 bg-gradient-to-r from-nexo-green/10 to-nexo-lime/10 p-8 text-center">
          <p className="text-2xl font-bold sm:text-3xl">
            Llévate el tuyo <span className="text-gradient-lime">hoy</span>
          </p>
          <p className="mx-auto mt-2 max-w-xl text-nexo-muted">
            Escríbenos y te atendemos al instante. Compra fácil, rápido y seguro.
          </p>
          <a
            href={buyLink(product)}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-nexo-lime to-nexo-green px-8 py-4 text-lg font-semibold text-nexo-bg shadow-[0_0_40px_-8px_rgba(163,230,53,0.6)] transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Pedir por WhatsApp
          </a>
        </section>
      </main>

      {/* Barra fija de compra (solo móvil) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-nexo-border bg-nexo-bg/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="leading-tight">
          <p className="text-lg font-extrabold text-nexo-lime">{product.price}</p>
          {product.oldPrice && (
            <p className="text-xs text-nexo-muted line-through">{product.oldPrice}</p>
          )}
        </div>
        <a
          href={buyLink(product)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-nexo-lime to-nexo-green px-5 py-3 font-semibold text-nexo-bg"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Pedir por WhatsApp
        </a>
      </div>

      <Footer />
    </div>
  )
}
