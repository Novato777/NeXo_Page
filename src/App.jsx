import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ProductLanding from "./pages/ProductLanding"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:slug" element={<ProductLanding />} />
      </Routes>
    </BrowserRouter>
  )
}
