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
