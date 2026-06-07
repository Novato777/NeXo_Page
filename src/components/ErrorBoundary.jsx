import { Component } from "react"

// Captura errores de render/efectos de sus hijos para que un fallo aislado
// (p. ej. WebGL no disponible en iOS / Lockdown Mode) NO tumbe toda la página.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    // Silencioso a propósito: el fallback ya cubre la experiencia.
    if (import.meta.env.DEV) console.warn("ErrorBoundary atrapó:", error)
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}
