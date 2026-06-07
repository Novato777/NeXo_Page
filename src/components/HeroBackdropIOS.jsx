import "./HeroBackdropIOS.css"

// Fondo del Hero para iOS: versión LIVIANA (degradados radiales que laten).
// Sin WebGL, sin filtros blur, sin box-shadow ni will-change -> carga al
// instante y no congela Safari. El fondo "bonito" lo definimos aparte.
export default function HeroBackdropIOS() {
  return (
    <div className="hs-ios" aria-hidden="true">
      <span className="hs-ios__glow hs-ios__glow--cyan" />
      <span className="hs-ios__glow hs-ios__glow--violet" />
    </div>
  )
}
