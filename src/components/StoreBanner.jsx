import { BagIcon, ArrowUpRightIcon } from "./Icons"

// Banner promocional de la Tienda Virtual. Va justo después del Hero y baja
// a la sección de Productos (#tienda) que viene inmediatamente debajo.
export default function StoreBanner() {
  return (
    <section className="px-6 pt-16 [@media(max-height:780px)]:pt-10">
      <div className="mx-auto w-full max-w-6xl">
        <a
          href="#tienda"
          className="group flex flex-col items-center gap-5 rounded-2xl border border-nexo-lime/30 bg-gradient-to-r from-nexo-green/10 to-nexo-lime/10 p-6 text-center transition-colors hover:border-nexo-lime/60 sm:flex-row sm:justify-between sm:text-left sm:p-7"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-nexo-lime/30 bg-gradient-to-br from-nexo-lime/20 to-nexo-green/20 text-nexo-lime">
              <BagIcon className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-nexo-text sm:text-2xl">
                Estrena nuestra{" "}
                <span className="text-gradient-lime font-extrabold">Tienda Virtual</span>
              </h3>
              <p className="mt-1 text-sm text-nexo-muted sm:text-base">
                Productos seleccionados al mejor precio, con atención directa por
                WhatsApp.
              </p>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-nexo-lime to-nexo-green px-6 py-3 font-semibold text-nexo-bg transition-transform group-hover:scale-105">
            Ver productos
            <ArrowUpRightIcon className="h-4 w-4" />
          </span>
        </a>
      </div>
    </section>
  )
}
