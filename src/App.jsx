import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ProductLanding from "./pages/ProductLanding"
import Carniceria from "./pages/Carniceria"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:slug" element={<ProductLanding />} />
        <Route path="/carniceria" element={<Carniceria />} />
      </Routes>
    </BrowserRouter>
  )
}
