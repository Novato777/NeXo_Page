// Logo NeXo (PNG). `size` controla el alto/ancho en px.
// La imagen debe estar en: public/logo.png
export default function Logo({ size = 48, className = "" }) {
  return (
    <img
      src="/logo.png"
      alt="Logo NeXo"
      width={size}
      height={size}
      style={{ height: size, width: size }}
      className={`object-contain ${className}`}
      draggable={false}
    />
  )
}
