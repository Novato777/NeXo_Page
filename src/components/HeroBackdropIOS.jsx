import "./HeroBackdropIOS.css"

// Estelas de luz: lado derecho cian/azul, lado izquierdo violeta/índigo
// (mismos colores que el fondo WebGL). Valores derivados del índice para que
// sean variados pero estables (sin parpadeos entre renders).
const COLORS_RIGHT = ["#22d3ee", "#3b82f6", "#67e8f9"]
const COLORS_LEFT = ["#7c3aed", "#6d28d9", "#818cf8"]

const STREAKS = Array.from({ length: 50 }, (_, i) => {
  const right = i % 2 === 0
  const palette = right ? COLORS_RIGHT : COLORS_LEFT
  const base = right ? 50 : 4 // carril derecho / izquierdo
  return {
    left: base + ((i * 17) % 45),
    width: 4 + ((i * 5) % 6), // 4–9px
    color: palette[i % palette.length],
    duration: 1.8 + ((i * 13) % 22) / 10, // 1.8–3.9s
    delay: -(((i * 23) % 42) / 10), // arranque desfasado (negativo)
  }
})

// Fondo "Hyperspeed" hecho en CSS para iOS (sin WebGL → carga rápida y fluida).
export default function HeroBackdropIOS() {
  return (
    <div className="hs-ios">
      <div className="hs-ios__horizon" />
      <div className="hs-ios__road">
        {STREAKS.map((s, i) => (
          <span
            key={i}
            className="hs-ios__streak"
            style={{
              left: `${s.left}%`,
              width: `${s.width}px`,
              "--c": s.color,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
