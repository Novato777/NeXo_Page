// Datos de contacto / marca NeXo (centralizados para editar en un solo lugar).
export const site = {
  name: "NeXo",
  slogan: "Impulsamos tu negocio al siguiente nivel.",
  whatsappNumber: "573222067870", // +57 322 206 7870 (formato internacional sin signos)
  whatsappDisplay: "322 206 7870",
  email: "cardozobrayan334@gmail.com",
  location: "La Dorada, Caldas",
  developer: "Brayan Cardozo",
}

// Mensaje pre-cargado al abrir WhatsApp
export const whatsappLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  "Hola NeXo, vi su página web y me interesa una cotización."
)}`

// Helper para generar enlaces a WhatsApp con mensajes personalizados
export const getWhatsAppLink = (message) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`

// Enlaces de WhatsApp para Servicio Técnico
export const pcServiceWhatsAppLink = getWhatsAppLink(
  "Hola NeXo 👋, necesito servicio técnico para mi computador. Quisiera solicitar un diagnóstico."
)
export const printerServiceWhatsAppLink = getWhatsAppLink(
  "Hola NeXo 👋, necesito servicio técnico para mi impresora. Quisiera solicitar un diagnóstico."
)
export const techHelpWhatsAppLink = getWhatsAppLink(
  "Hola NeXo 👋, mi equipo está presentando problemas y quisiera orientación técnica para saber qué solución requiere."
)

