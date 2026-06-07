import "./HeroBackdropIOS.css"

// Estelas: lado derecho cian/azul, lado izquierdo violeta/índigo (mismos
// colores que el WebGL). Valores derivados del índice -> variados pero estables.
const COLORS_RIGHT = ["#22d3ee", "#3b82f6", "#67e8f9"]
const COLORS_LEFT = ["#7c3aed", "#6d28d9", "#818cf8"]

const STREAKS = Array.from({ length: 32 }, (_, i) => {
  const right = i % 2 === 0
  const palette = right ? COLORS_RIGHT : COLORS_LEFT
  const base = right ? 50 : 6 // carril derecho / izquierdo
  return {
    left: base + ((i * 17) % 44),
    width: 3 + ((i * 5) % 5), // 3–7px
    color: palette[i % palette.length],
    duration: 1.8 + ((i * 13) % 22) / 10, // 1.8–3.9s
    delay: -(((i * 23) % 42) / 10), // arranque desfasado (negativo)
  }
})

// Hyperspeed en CSS (iOS): fiel al WebGL pero liviano (sin filter/will-change).
export default function HeroBackdropIOS() {
  return (
    <div className="hs-ios" aria-hidden="true">
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
