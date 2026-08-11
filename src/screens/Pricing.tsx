import { useState } from "react"
import Badge from "../components/Badge"

const ALL_PRODUCTS = [
  { name: "Sushi Salmão", current: "R$ 24,90", recommended: "R$ 18,90", discount: "−24%", risk: 91, status: "risk", variant: "danger" as const },
  { name: "Frango Assado", current: "R$ 19,90", recommended: "R$ 16,90", discount: "−15%", risk: 83, status: "active", variant: "danger" as const },
  { name: "Morango 250g", current: "R$ 12,90", recommended: "R$ 9,90", discount: "−23%", risk: 76, status: "pending", variant: "warning" as const },
  { name: "Iogurte Natural", current: "R$ 7,90", recommended: "R$ 6,50", discount: "−18%", risk: 61, status: "active", variant: "warning" as const },
  { name: "Pão de Queijo", current: "R$ 3,90", recommended: "R$ 3,40", discount: "−13%", risk: 38, status: "closed", variant: "success" as const },
  { name: "Queijo Minas", current: "R$ 14,90", recommended: "R$ 12,90", discount: "−13%", risk: 54, status: "pending", variant: "warning" as const },
  { name: "Salada Caesar", current: "R$ 18,50", recommended: "R$ 14,90", discount: "−19%", risk: 78, status: "risk", variant: "danger" as const },
  { name: "Maçã Fuji 1kg", current: "R$ 9,90", recommended: "R$ 7,90", discount: "−20%", risk: 42, status: "active", variant: "success" as const },
]

const STATUS_LABELS: Record<string, { label: string; badge: "success" | "warning" | "danger" | "info" | "neutral" }> = {
  all: { label: "Todos", badge: "neutral" },
  active: { label: "Ativo", badge: "success" },
  risk: { label: "Em risco", badge: "danger" },
  pending: { label: "Aguardando", badge: "warning" },
  closed: { label: "Encerrado", badge: "neutral" },
}

type Props = { onViewProduct: (name: string) => void }

export default function Pricing({ onViewProduct }: Props) {
  const [filter, setFilter] = useState("all")

  const filtered = filter === "all" ? ALL_PRODUCTS : ALL_PRODUCTS.filter(p => p.status === filter)

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1100, fontFamily: "Inter, sans-serif" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f1117", margin: 0 }}>Preços inteligentes</h1>
        <p style={{ fontSize: 14, color: "#6b7280", margin: "4px 0 0" }}>Acompanhe os produtos com precificação dinâmica ativa.</p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {Object.entries(STATUS_LABELS).map(([key, s]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              fontSize: 13, fontWeight: 500,
              padding: "7px 16px",
              borderRadius: 20,
              border: filter === key ? "1.5px solid #16a34a" : "1px solid #e4e7ec",
              background: filter === key ? "#f0fdf4" : "#fff",
              color: filter === key ? "#15803d" : "#4b5563",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              transition: "all 0.15s",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#fafafa" }}>
              {["Produto", "Preço atual", "Recomendado", "Desconto", "Risco", "Status", ""].map(h => (
                <th key={h} style={{
                  padding: "11px 18px", textAlign: "left",
                  fontWeight: 600, color: "#6b7280", fontSize: 11,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                  borderBottom: "1px solid #f0f1f3",
                  whiteSpace: "nowrap",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.name}
                style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f8f9fa" : "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "12px 18px", fontWeight: 600, color: "#0f1117" }}>{p.name}</td>
                <td style={{ padding: "12px 18px", fontFamily: "JetBrains Mono, monospace", color: "#9ca3af", textDecoration: "line-through" }}>{p.current}</td>
                <td style={{ padding: "12px 18px", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#16a34a" }}>{p.recommended}</td>
                <td style={{ padding: "12px 18px", fontFamily: "JetBrains Mono, monospace", fontWeight: 600, color: "#dc2626" }}>{p.discount}</td>
                <td style={{ padding: "12px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 5, background: "#f3f4f6", borderRadius: 3, overflow: "hidden", minWidth: 60 }}>
                      <div style={{
                        height: "100%",
                        width: `${p.risk}%`,
                        background: p.risk >= 80 ? "#dc2626" : p.risk >= 60 ? "#d97706" : "#16a34a",
                        borderRadius: 3,
                      }} />
                    </div>
                    <span style={{ fontSize: 12, color: "#6b7280", fontFamily: "JetBrains Mono, monospace", minWidth: 30 }}>{p.risk}%</span>
                  </div>
                </td>
                <td style={{ padding: "12px 18px" }}>
                  <Badge variant={STATUS_LABELS[p.status]?.badge ?? "neutral"} label={STATUS_LABELS[p.status]?.label ?? p.status} />
                </td>
                <td style={{ padding: "12px 18px" }}>
                  <button
                    onClick={() => onViewProduct(p.name)}
                    style={{
                      fontSize: 12, fontWeight: 600, color: "#2563eb", background: "#eff6ff",
                      border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Ver detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
            Nenhum produto nesta categoria.
          </div>
        )}
      </div>
    </div>
  )
}
