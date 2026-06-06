import { useState } from "react"
import ScrollReveal from "./ScrollReveal"
import { products, buyLink } from "../data/store"
import { BagIcon, WhatsAppIcon } from "./Icons"

// Tarjeta de producto de la vitrina NeXo Drop.
function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false)
  const showImage = product.image && !imgError
  const soon = product.price === "Pronto"

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-nexo-border bg-nexo-panel transition-all duration-300 hover:-translate-y-1 hover:border-nexo-lime/50 hover:shadow-[0_0_30px_-10px_rgba(163,230,53,0.5)]">
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
            <BagIcon className="h-16 w-16 text-nexo-bg/80" />
          </div>
        )}

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-nexo-lime px-3 py-1 text-xs font-bold text-nexo-bg">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-nexo-text">{product.name}</h3>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-nexo-lime">{product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-nexo-muted line-through">{product.oldPrice}</span>
          )}
        </div>

        {soon ? (
          <span className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-nexo-border px-5 py-3 font-semibold text-nexo-muted">
            Próximamente
          </span>
        ) : (
          <a
            href={buyLink(product)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-nexo-lime to-nexo-green px-5 py-3 font-semibold text-nexo-bg transition-transform hover:scale-[1.02]"
          >
            <WhatsAppIcon className="h-5 w-5" />
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
      className="relative flex min-h-screen flex-col justify-center overflow-hidden border-y border-nexo-border bg-nexo-bg2 py-24"
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
            Productos seleccionados por nosotros.{" "}
            <span className="font-semibold text-nexo-text">
              Pídelos directo por WhatsApp.
            </span>
          </p>
        </div>

        {/* Vitrina */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
