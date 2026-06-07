import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.jsx'

// Prioriza el Hero: iOS/Safari restauran el scroll y el #hash de sesiones
// previas (p. ej. tras tocar el menú). Lo neutralizamos ANTES de renderizar
// para que la home siempre abra arriba, sin saltar a otra sección.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
if (window.location.pathname === '/' && window.location.hash) {
  window.history.replaceState(null, '', '/')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
