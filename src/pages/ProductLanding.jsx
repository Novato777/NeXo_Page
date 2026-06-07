import { useEffect, useState } from "react"
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
} from "../components/Icons"

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

function Media({ product }) {
  const L = product.landing || {}
  const [imgError, setImgError] = useState(false)
  const showImage = product.image && !imgError

  return (
    <div className="lg:sticky lg:top-24">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-nexo-border bg-nexo-panel">
        {L.video ? (
          <video
            src={L.video}
            controls
            playsInline
            poster={showImage ? product.image : undefined}
            className="h-full w-full object-cover"
          />
        ) : showImage ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${product.accent}`}>
            <BagIcon className="h-24 w-24 text-nexo-bg/80" />
          </div>
        )}

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-nexo-lime px-3 py-1 text-xs font-bold uppercase tracking-wide text-nexo-bg">
            {product.badge}
          </span>
        )}
      </div>

      {/* Galería */}
      {L.gallery?.length > 0 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {L.gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${product.name} ${i + 1}`}
              className="aspect-square w-full rounded-xl border border-nexo-border object-cover"
            />
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
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2" aria-label="NeXo inicio">
            <Logo size={28} />
            <span className="text-xl font-bold">
              Ne<span className="text-gradient">X</span>o
            </span>
          </Link>
          <a
            href="/#tienda"
            className="inline-flex items-center gap-1 text-sm text-nexo-muted transition-colors hover:text-nexo-cyan"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Volver a la tienda
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-28 pt-8 lg:pb-16">
        {/* Encabezado: media + info */}
        <div className="grid gap-10 lg:grid-cols-2">
          <Media product={product} />

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

            {/* Sellos de confianza */}
            <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-2">
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

        {/* Beneficios */}
        {L.benefits?.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold sm:text-3xl">
              ¿Por qué te va a{" "}
              <span className="text-gradient-lime">encantar</span>?
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {L.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-xl border border-nexo-border bg-nexo-panel/50 p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-nexo-lime/15 text-nexo-lime">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="text-nexo-text">{b}</span>
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
            Llévate el tuyo{" "}
            <span className="text-gradient-lime">hoy</span>
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
