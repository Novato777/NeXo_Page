// Portafolio de NeXo.
// Para agregar un proyecto nuevo: copia un objeto y cambia los datos.
//
// Campos:
//  - link:   a dónde redirige al hacer clic (puede ser externo). Vacío = sin enlace.
//  - domain: texto que se muestra en la barra del "navegador"
//  - image:  vista previa del proyecto. Opciones:
//      1) Screenshot automático en vivo -> screenshotUrl(url)
//      2) Imagen propia (recomendado): guarda una captura en public/img/ y
//         pon image: "/img/mi-proyecto.png"

// Genera un screenshot en vivo de cualquier URL (servicio gratuito Microlink).
const screenshotUrl = (url) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`

export const projects = [
  {
    id: "barbercontrol",
    title: "BarberControl",
    category: "Sistema de gestión",
    description:
      "Sistema completo para barberías: agenda, cortes, clientes y reportes.",
    tags: ["React", "Node.js", "SaaS"],
    link: "https://barber-control.vercel.app",
    domain: "barber-control.vercel.app",
    image: screenshotUrl("https://barber-control.vercel.app"),
    accent: "from-nexo-blue to-nexo-cyan",
  },
  {
    id: "tu-negocio",
    title: "Tu negocio aquí",
    category: "Tu próximo proyecto",
    description:
      "¿Tienes un negocio? Aquí podría estar tu página o tu sistema a medida.",
    tags: ["Disponible"],
    link: "",
    domain: "tunegocio.com",
    image: "",
    accent: "from-nexo-cyan to-nexo-blue",
  },
  {
    id: "proximo",
    title: "Próximamente",
    category: "En construcción",
    description: "Nuevos proyectos de NeXo en camino. ¡Vuelve pronto!",
    tags: ["Pronto"],
    link: "",
    domain: "nexo.com",
    image: "",
    accent: "from-nexo-blue to-nexo-cyan",
  },
]
