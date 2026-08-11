import type { Screen } from "../App"

type NavItem = { id: Screen; label: string; icon: string }

const NAV: NavItem[] = [
  { id: "dashboard", label: "Visão Geral", icon: "⊞" },
  { id: "products", label: "Produtos em risco", icon: "⚠" },
  { id: "pricing", label: "Preços", icon: "◎" },
  { id: "analytics", label: "Análises", icon: "↗" },
  { id: "copilot", label: "Copiloto IA", icon: "✦" },
  { id: "settings", label: "Configurações", icon: "⚙" },
]

type Props = { active: Screen; onChange: (s: string) => void }

export default function Sidebar({ active, onChange }: Props) {
  return (
    <aside style={{
      width: 240,
      minWidth: 240,
      height: "100vh",
      background: "#ffffff",
      borderRight: "1px solid #e4e7ec",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Inter, sans-serif",
      position: "sticky",
      top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #f0f1f3" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: "#16a34a",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              {/* cart base */}
              <path d="M2 2.5h1.5l1.8 7h6.4l1.5-5H5.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              {/* wheels */}
              <circle cx="7" cy="13.5" r="1" fill="white"/>
              <circle cx="11" cy="13.5" r="1" fill="white"/>
              {/* price tag on cart */}
              <path d="M8.5 5.5v3M7 7h3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", color: "#0f1117" }}>PREÇO VIVO</div>
            <div style={{ fontSize: 10, color: "#9ca3af", letterSpacing: "0.02em", marginTop: 1 }}>Gestão inteligente</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 12px" }}>
        {NAV.map(item => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "9px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                marginBottom: 2,
                background: isActive ? "#f0fdf4" : "transparent",
                color: isActive ? "#15803d" : "#4b5563",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                textAlign: "left",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget.style.background = "#f9fafb") }}
              onMouseLeave={e => { if (!isActive) (e.currentTarget.style.background = "transparent") }}
            >
              <span style={{ fontSize: 15, opacity: isActive ? 1 : 0.6, minWidth: 18, textAlign: "center" }}>{item.icon}</span>
              {item.label}
              {item.id === "products" && (
                <span style={{
                  marginLeft: "auto",
                  background: "#fee2e2",
                  color: "#dc2626",
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 10,
                  padding: "1px 7px",
                }}>17</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* User */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #f0f1f3", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "linear-gradient(135deg, #16a34a, #4ade80)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontSize: 13, fontWeight: 700, flexShrink: 0,
        }}>GP</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0f1117", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Gabriel Possobon</div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>Gerente de Operações</div>
        </div>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 16, padding: 4 }} title="Sair">
          ⎋
        </button>
      </div>
    </aside>
  )
}
