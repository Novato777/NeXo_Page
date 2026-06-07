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
    slug: "audifonos-xiaomi-redmi-airdots-s",
    name: "Audífonos Xiaomi Redmi AirDots S",
    price: "$65.000",
    oldPrice: "", // pon un precio "antes" (ej. "$89.900") si quieres mostrar descuento
    // Imagen principal (también se ve en la card de la tienda).
    image: "/img/airdots-s/1.jpg",
    badge: "Más vendido",
    accent: "from-nexo-lime to-nexo-green",
    // Contenido de la landing personalizada -> /producto/<slug>
    landing: {
      tagline: "Inalámbricos y cómodos: sácalos del estuche y suenan al instante.",
      description:
        "Auriculares inalámbricos Xiaomi Redmi AirDots S con Bluetooth 5.0. Sonido claro, manos libres para tus llamadas y emparejamiento automático al sacarlos del estuche. Incluyen estuche de carga y un par de tapones de repuesto.",
      benefits: [
        "Bluetooth 5.0: conexión rápida y estable",
        "Manos libres para tus llamadas",
        "Estuche de carga para todo el día (300 mAh)",
        "Se emparejan solos al sacarlos del estuche",
        "Livianos y cómodos · alcance de 10 m",
      ],
      // Fotos extra (galería deslizable). Carpeta del producto en public/img/.
      gallery: ["/img/airdots-s/2.jpg"],
      // Video del producto (mp4 en public/img/ o externo). Vacío = sin video.
      video: "",
      // Enlaces a los videos de publicidad en cada red. Vacío "" = sin botón.
      tiktok: "",
      instagram: "",
      // Resumen de garantía (se muestra en la tarjeta "Garantía y soporte").
      warranty:
        "Garantía de 10 días por producto incompleto, defectuoso, roto o diferente. 1 mes por defectos de fábrica.",
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
    `Hola NeXo, quiero pedir *${product.name}*${
      product.price && product.price !== "Pronto" ? ` (${product.price})` : ""
    }. ¿Me ayudas?`
  )}`
