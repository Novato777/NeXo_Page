// Vitrina de NeXo Drop (marca propia). Edita / agrega tus productos aquí.
//
// Campos:
//  - name:    nombre del producto
//  - price:   texto del precio (ej. "$59.900")
//  - oldPrice: precio tachado (opcional, para mostrar descuento) — "" si no aplica
//  - image:   foto del producto. Guarda la imagen en public/img/ y pon
//             image: "/img/mi-producto.png". Vacío "" = muestra un degradado.
//  - badge:   etiqueta de esquina (ej. "Más vendido", "Nuevo") — "" si no aplica
//  - accent:  degradado del placeholder cuando no hay imagen
import { site } from "./site"

export const products = [
  {
    id: "p1",
    slug: "audifonos-xiaomi-redmi-airdots",
    name: "Audífonos Xiaomi Redmi AirDots",
    price: "$59.900",
    oldPrice: "$89.900",
    // Imagen principal (también se ve en la card de la tienda).
    image: "/img/demo-1.png",
    badge: "Más vendido",
    accent: "from-nexo-lime to-nexo-green",
    // Contenido de la landing personalizada -> /producto/<slug>
    landing: {
      tagline: "Sonido potente y sin cables, listos para tu día a día.",
      description:
        "Disfruta tu música, podcasts y videos con un sonido limpio y responde llamadas con manos libres. Inalámbricos, cómodos y compatibles con cualquier celular: solo conéctalos y listo.",
      benefits: [
        "Conexión Bluetooth estable y rápida",
        "Manos libres para tus llamadas",
        "Batería que te acompaña todo el día",
        "Compatibles con cualquier celular",
        "Diseño cómodo y liviano",
      ],
      // Fotos extra del producto (galería deslizable). Guarda en public/img/ y
      // referencia como "/img/airdots-2.png". Estas son de ejemplo.
      gallery: ["/img/demo-2.png", "/img/demo-3.png"],
      // Video del producto (mp4 en public/img/ o externo). Vacío = sin video.
      video: "",
      // Enlaces a los videos de publicidad de ESTE producto en cada red.
      // Reemplaza por el link directo a cada video. Vacío "" = no muestra el botón.
      tiktok: "https://www.tiktok.com/",
      instagram: "https://www.instagram.com/",
    },
  },
  {
    id: "p2",
    name: "Tu producto aquí",
    price: "$39.900",
    oldPrice: "",
    image: "",
    badge: "Nuevo",
    accent: "from-nexo-green to-nexo-lime",
  },
  {
    id: "p3",
    name: "Otro producto",
    price: "$79.900",
    oldPrice: "",
    image: "",
    badge: "",
    accent: "from-nexo-lime to-nexo-green",
  },
  {
    id: "p4",
    name: "Producto en oferta",
    price: "$24.900",
    oldPrice: "$34.900",
    image: "",
    badge: "Oferta",
    accent: "from-nexo-green to-nexo-lime",
  },
  {
    id: "p5",
    name: "Producto premium",
    price: "$129.900",
    oldPrice: "",
    image: "",
    badge: "",
    accent: "from-nexo-lime to-nexo-green",
  },
  {
    id: "p6",
    name: "Próximamente",
    price: "Pronto",
    oldPrice: "",
    image: "",
    badge: "",
    accent: "from-nexo-green to-nexo-lime",
  },
]

// Busca un producto por su slug (para la landing /producto/<slug>).
export const getProductBySlug = (slug) =>
  products.find((p) => p.slug === slug) || null

// Convierte un precio en texto ("$89.900") a número (89900).
const toNumber = (s) => Number(String(s).replace(/[^\d]/g, "")) || 0

// % de descuento calculado desde price vs oldPrice. null si no aplica.
export const discountPercent = (product) => {
  if (!product.oldPrice) return null
  const oldN = toNumber(product.oldPrice)
  const newN = toNumber(product.price)
  if (!oldN || !newN || newN >= oldN) return null
  return Math.round((1 - newN / oldN) * 100)
}

// Abre WhatsApp con el pedido del producto ya escrito.
export const buyLink = (product) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    `Hola NeXo 👋, quiero pedir *${product.name}*${
      product.price && product.price !== "Pronto" ? ` (${product.price})` : ""
    }. ¿Me ayudas?`
  )}`
