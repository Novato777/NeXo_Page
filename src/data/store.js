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
    name: "Producto estrella",
    price: "$59.900",
    oldPrice: "$89.900",
    image: "",
    badge: "Más vendido",
    accent: "from-nexo-lime to-nexo-green",
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

// Abre WhatsApp con el pedido del producto ya escrito.
export const buyLink = (product) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    `Hola NeXo 👋, quiero pedir *${product.name}*${
      product.price && product.price !== "Pronto" ? ` (${product.price})` : ""
    }. ¿Me ayudas?`
  )}`
