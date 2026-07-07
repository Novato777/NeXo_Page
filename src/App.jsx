import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
// Landings de producto (tienda) deshabilitadas por ahora. Para reactivarlas,
// descomenta este import y la ruta de abajo.
// import ProductLanding from "./pages/ProductLanding"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/producto/:slug" element={<ProductLanding />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
