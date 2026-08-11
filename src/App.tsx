import { useState } from "react"
import Sidebar from "./components/Sidebar"
import Dashboard from "./screens/Dashboard"
import ProductAnalysis from "./screens/ProductAnalysis"
import Pricing from "./screens/Pricing"
import Analytics from "./screens/Analytics"
import Copilot from "./screens/Copilot"
import Toast from "./components/Toast"

export type Screen = "dashboard" | "products" | "pricing" | "analytics" | "copilot" | "settings"

export type ToastState = { visible: boolean; message: string }

export default function App() {
  const [screen, setScreen] = useState<Screen>("dashboard")
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [toast, setToast] = useState<ToastState>({ visible: false, message: "" })

  const showToast = (message: string) => {
    setToast({ visible: true, message })
    setTimeout(() => setToast({ visible: false, message: "" }), 3500)
  }

  const goToProduct = (name: string) => {
    setSelectedProduct(name)
    setScreen("products")
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f5f6f8" }}>
      <Sidebar active={screen} onChange={(s) => { setScreen(s as Screen); setSelectedProduct(null) }} />

      <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {screen === "dashboard" && <Dashboard onViewProduct={goToProduct} />}
        {screen === "products" && <ProductAnalysis product={selectedProduct} onShowToast={showToast} />}
        {screen === "pricing" && <Pricing onViewProduct={goToProduct} />}
        {screen === "analytics" && <Analytics />}
        {screen === "copilot" && <Copilot onViewProducts={() => setScreen("products")} />}
        {screen === "settings" && (
          <div style={{ padding: "48px", color: "#6b7280", fontFamily: "Inter, sans-serif" }}>
            <h1 style={{ fontSize: 24, fontWeight: 600, color: "#0f1117", marginBottom: 8 }}>Configurações</h1>
            <p style={{ fontSize: 14 }}>Em breve — esta seção está em desenvolvimento.</p>
          </div>
        )}
      </main>

      {toast.visible && <Toast message={toast.message} />}
    </div>
  )
}
