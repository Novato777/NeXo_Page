import { useState } from "react"
import { Link } from "react-router-dom"
import ScrollReveal from "./ScrollReveal"
import { products, buyLink, discountPercent } from "../data/store"
import { whatsappLink } from "../data/site"
import { BagIcon, WhatsAppIcon, TruckIcon, HeadphonesIcon, ShieldCheckIcon } from "./Icons"

// Sellos de confianza que se muestran debajo de las cards.
const trust = [
  {
    icon: WhatsAppIcon,
    title: "Atención por WhatsApp",
    sub: "Te respondemos en minutos",
  },
  {
    icon: TruckIcon,
    title: "Envíos a todo el país",
    sub: "Recíbelo donde estés",
  },
  {
    icon: ShieldCheckIcon,
    title: "Compras seguras",
    sub: "Tu compra siempre protegida",
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte personalizado",
    sub: "Te acompañamos en tu compra",
  },
]

// Tarjeta de producto estilo Mercado Libre (tema oscuro):
// imagen · precio grande · precio tachado + % descuento · nombre · botón pedir.
function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false)
  const showImage = product.image && !imgError
  const soon = product.price === "Pronto"
  const discount = discountPercent(product)

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-nexo-border bg-nexo-panel transition-all duration-300 hover:border-nexo-lime/50 hover:shadow-[0_0_24px_-10px_rgba(163,230,53,0.5)]">
      {/* Imagen / placeholder */}
      <div className="relative aspect-square overflow-hidden bg-nexo-bg2">
        {showImage ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${product.accent} opacity-90`}>
            <BagIcon className="h-12 w-12 text-nexo-bg/80" />
          </div>
        )}

        {product.badge && (
          <span className="absolute left-2 top-2 rounded bg-nexo-lime px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-nexo-bg">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info (orden tipo ML: precio → tachado+% → nombre) */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <span className="text-xl font-extrabold text-nexo-text sm:text-2xl">
          {product.price}
        </span>

        {product.oldPrice && (
          <div className="mt-0.5 flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-nexo-muted line-through">{product.oldPrice}</span>
            {discount && (
              <span className="font-semibold text-nexo-lime">-{discount}%</span>
            )}
          </div>
        )}

        <h3 className="mt-1.5 line-clamp-2 text-sm text-nexo-muted">
          {product.name}
        </h3>

        {soon ? (
          <span className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-nexo-border px-3 py-2 text-sm font-semibold text-nexo-muted">
            Próximamente
          </span>
        ) : product.slug ? (
          <Link
            to={`/producto/${product.slug}`}
            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-nexo-lime to-nexo-green px-3 py-2 text-sm font-semibold text-nexo-bg transition-transform hover:scale-[1.02]"
          >
            Ver producto
          </Link>
        ) : (
          <a
            href={buyLink(product)}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-nexo-lime to-nexo-green px-3 py-2 text-sm font-semibold text-nexo-bg transition-transform hover:scale-[1.02]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pedir
          </a>
        )}
      </div>
    </div>
  )
}

export default function Store() {
  return (
    <section
      id="tienda"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden border-y border-nexo-border bg-nexo-bg2 py-24"
    >
      {/* Resplandor de fondo (verde/lima) */}
      <div className="pointer-events-none absolute right-1/4 top-0 h-[420px] w-[600px] translate-x-1/2 rounded-full bg-nexo-green/10 blur-[130px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        {/* Encabezado */}
        <div className="mb-10 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-nexo-lime sm:w-14" />
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-nexo-lime">
              <BagIcon className="h-4 w-4" />
              NeXo Drop
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-nexo-lime sm:w-14" />
          </div>

          <ScrollReveal
            containerClassName="flex justify-center"
            textClassName="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
            wordClassName="bg-gradient-to-r from-nexo-lime to-nexo-green bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(163,230,53,0.35)]"
            baseRotation={2}
            blurStrength={5}
          >
            Nuestra Tienda
          </ScrollReveal>

          <p className="mx-auto mt-5 max-w-xl text-lg text-nexo-muted sm:text-xl">
            Productos de calidad, a precios que te van a encantar.{" "}
            <span className="font-semibold text-nexo-text">
              Pídelos directo por WhatsApp.
            </span>
          </p>
        </div>

        {/* Vitrina — 2 columnas en celular (estilo ML), 3 en escritorio */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Sellos de confianza */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => {
            const Icon = t.icon
            return (
              <div key={t.title} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-nexo-lime/15 text-nexo-lime">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-nexo-text">{t.title}</p>
                  <p className="text-sm text-nexo-muted">{t.sub}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mensaje que incita a comprar + CTA */}
        <div className="mt-12 text-center">
          <p className="mx-auto max-w-2xl text-xl font-semibold text-nexo-text sm:text-2xl">
            Tu próxima compra está a un{" "}
            <span className="text-gradient-lime">mensaje</span> de distancia.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-base text-nexo-muted">
            Cuéntanos qué buscas y te ayudamos a elegir. Compra fácil, rápido y
            seguro.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-nexo-lime to-nexo-green px-8 py-4 font-semibold text-nexo-bg shadow-[0_0_40px_-8px_rgba(163,230,53,0.6)] transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
