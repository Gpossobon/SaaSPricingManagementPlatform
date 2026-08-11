import { useState } from "react"

type Message = { role: "user" | "ai"; text: string; action?: { label: string; key: string } }

const SUGGESTIONS = [
  "Quais produtos estão em maior risco?",
  "Quanto podemos recuperar hoje?",
  "Por que o preço do sushi foi reduzido?",
  "Quais produtos precisam de atenção agora?",
]

const RESPONSES: Record<string, Message> = {
  "Quais produtos estão em maior risco?": {
    role: "ai",
    text: "Identifiquei 17 produtos em situação de risco alto ou crítico. Os três prioritários são Sushi Salmão (91%), Salada Caesar (78%) e Frango Assado (83%). Juntos, representam R$ 820 em valor potencialmente perdido nas próximas 4 horas.",
    action: { label: "Ver produtos", key: "products" },
  },
  "Quanto podemos recuperar hoje?": {
    role: "ai",
    text: "Com base nos ajustes recomendados para os 17 produtos em risco, a estimativa de receita recuperável hoje é de R$ 5.780. Desse total, R$ 3.240 já está em produtos com desconto ativo. Os R$ 2.540 restantes dependem de aprovação.",
  },
  "Por que o preço do sushi foi reduzido?": {
    role: "ai",
    text: "O preço do Sushi Salmão foi reduzido de R$ 24,90 para R$ 18,90 (−24%) com base em três fatores: velocidade de venda atual de 2,1 un/h (abaixo das 5,2 esperadas), validade às 21:00 hoje com 18 unidades em estoque, e margem disponível de 43% que permite o desconto sem prejuízo.",
  },
  "Quais produtos precisam de atenção agora?": {
    role: "ai",
    text: "Identifiquei 17 produtos em situação de alto risco. Os três prioritários são Sushi Salmão, Frango Assado e Morango 250g. Juntos, eles representam aproximadamente R$ 680 em valor potencialmente perdido.",
    action: { label: "Ver produtos", key: "products" },
  },
}

const INITIAL_HISTORY: Message[] = [
  { role: "user", text: "Quais produtos precisam da minha atenção agora?" },
  {
    role: "ai",
    text: "Identifiquei 17 produtos em situação de alto risco. Os três prioritários são Sushi Salmão, Frango Assado e Morango 250g. Juntos, eles representam aproximadamente R$ 680 em valor potencialmente perdido.",
    action: { label: "Ver produtos", key: "products" },
  },
]

type Props = { onViewProducts: () => void }

export default function Copilot({ onViewProducts }: Props) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_HISTORY)
  const [input, setInput] = useState("")

  const send = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { role: "user", text }
    const aiResp: Message = RESPONSES[text] ?? {
      role: "ai",
      text: `Analisei sua pergunta sobre "${text}". No momento, tenho dados limitados para responder com precisão. Recomendo verificar a tela de Análises para informações atualizadas.`,
    }
    setMessages(prev => [...prev, userMsg, aiResp])
    setInput("")
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{ padding: "28px 36px 0", borderBottom: "1px solid #f0f1f3", background: "#fff", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, background: "#eff6ff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#2563eb" }}>✦</div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0f1117", margin: 0 }}>Preço Vivo Copilot</h1>
            <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>Pergunte sobre sua operação.</p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#16a34a", fontWeight: 500 }}>
            <span style={{ width: 7, height: 7, background: "#16a34a", borderRadius: "50%", display: "inline-block" }} />
            Conectado
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 36px", display: "flex", flexDirection: "column", gap: 16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: 560,
              background: m.role === "user" ? "#0f1117" : "#fff",
              color: m.role === "user" ? "#fff" : "#0f1117",
              borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              border: m.role === "ai" ? "1px solid #e4e7ec" : "none",
              padding: "14px 18px",
              fontSize: 14,
              lineHeight: 1.6,
            }}>
              {m.role === "ai" && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "#2563eb", fontWeight: 600 }}>✦ Preço Vivo IA</span>
                </div>
              )}
              <p style={{ margin: 0 }}>{m.text}</p>
              {m.action && (
                <button
                  onClick={onViewProducts}
                  style={{
                    marginTop: 12, fontSize: 13, fontWeight: 600,
                    color: "#fff", background: "#2563eb",
                    border: "none", borderRadius: 8, padding: "8px 16px",
                    cursor: "pointer", fontFamily: "Inter, sans-serif",
                  }}
                >
                  {m.action.label} →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions + Input */}
      <div style={{ padding: "16px 36px 24px", borderTop: "1px solid #f0f1f3", background: "#fff", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => send(s)}
              style={{
                fontSize: 12, fontWeight: 500,
                color: "#374151", background: "#f9fafb",
                border: "1px solid #e4e7ec", borderRadius: 20,
                padding: "6px 14px", cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f0fdf4")}
              onMouseLeave={e => (e.currentTarget.style.background = "#f9fafb")}
            >
              {s}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send(input)}
            placeholder="Pergunte algo sobre seus produtos, preços ou riscos..."
            style={{
              flex: 1, fontSize: 14, color: "#0f1117",
              border: "1px solid #e4e7ec", borderRadius: 10,
              padding: "12px 16px", outline: "none",
              fontFamily: "Inter, sans-serif",
              background: "#fafafa",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "#16a34a")}
            onBlur={e => (e.currentTarget.style.borderColor = "#e4e7ec")}
          />
          <button
            onClick={() => send(input)}
            style={{
              background: "#16a34a", color: "#fff",
              border: "none", borderRadius: 10, padding: "12px 20px",
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
