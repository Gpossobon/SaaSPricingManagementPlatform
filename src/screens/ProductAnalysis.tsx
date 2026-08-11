import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts"
import Badge from "../components/Badge"

const historyData = [
  { time: "14:00", preco: 24.90, vendas: 1 },
  { time: "15:00", preco: 24.90, vendas: 2 },
  { time: "16:00", preco: 22.90, vendas: 4 },
  { time: "17:00", preco: 21.90, vendas: 5 },
  { time: "18:00", preco: 19.90, vendas: 8 },
  { time: "19:00", preco: 18.90, vendas: 11 },
  { time: "20:00", preco: 18.90, vendas: 14 },
]

const factors = [
  { icon: "⏱", label: "Validade próxima", value: "4h 32min restantes", weight: "alto" },
  { icon: "📉", label: "Venda abaixo do esperado", value: "2,1 un/h vs. 5,2 esperado", weight: "alto" },
  { icon: "📦", label: "Estoque elevado", value: "18 unidades — excesso de 8", weight: "médio" },
  { icon: "📊", label: "Demanda prevista", value: "7 unidades até o fechamento", weight: "médio" },
  { icon: "💰", label: "Margem disponível", value: "43% — redução segura até 24%", weight: "baixo" },
]

type Props = {
  product: string | null
  onShowToast: (msg: string) => void
}

export default function ProductAnalysis({ product, onShowToast }: Props) {
  const [showModal, setShowModal] = useState(false)
  const [applied, setApplied] = useState(false)

  const name = product ?? "Sushi Salmão"

  const confirm = () => {
    setShowModal(false)
    setApplied(true)
    onShowToast("Preço atualizado com sucesso.")
  }

  return (
    <div style={{ padding: "32px 36px", maxWidth: 1000, fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 6 }}>Prontos para consumo</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0f1117", margin: 0 }}>{name}</h1>
          <div style={{ marginTop: 8 }}>
            <Badge variant={applied ? "success" : "danger"} label={applied ? "Desconto ativo" : "Alto risco"} />
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>Última atualização</div>
          <div style={{ fontSize: 13, color: "#374151" }}>Hoje, 16h 28min</div>
        </div>
      </div>

      {/* Risk + info cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 16, marginBottom: 24 }}>
        {/* Risk card */}
        <div style={{
          background: applied ? "#f0fdf4" : "#fef2f2",
          border: `1px solid ${applied ? "#bbf7d0" : "#fecaca"}`,
          borderRadius: 12,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
            Risco de perda
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, color: applied ? "#15803d" : "#dc2626", lineHeight: 1 }}>
            {applied ? "34%" : "91%"}
          </div>
          <div style={{ fontSize: 13, color: applied ? "#16a34a" : "#b91c1c", marginTop: 8, lineHeight: 1.4 }}>
            {applied ? "Risco reduzido após ajuste de preço." : "Alta probabilidade de excedente antes da validade."}
          </div>
          <div style={{ marginTop: 16, width: "100%", height: 6, background: "#e5e7eb", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: applied ? "34%" : "91%", background: applied ? "#16a34a" : "#dc2626", borderRadius: 3, transition: "width 0.5s" }} />
          </div>
        </div>

        {/* Info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
          {[
            { label: "Estoque atual", value: "18", unit: "unidades" },
            { label: "Venda média", value: "2,1", unit: "unidades/h" },
            { label: "Validade", value: "Hoje", unit: "21:00" },
            { label: "Tempo restante", value: "04h", unit: "32min" },
          ].map(c => (
            <div key={c.label} style={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#0f1117", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{c.value}</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>{c.unit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Forecast + Recommendation */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Forecast */}
        <div style={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 12, padding: "20px 24px" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#0f1117", margin: "0 0 16px" }}>Previsão de venda</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Em estoque", value: "18 unidades", color: "#374151", big: false },
              { label: "Previsão de venda", value: "7 unidades", color: "#d97706", big: false },
              { label: "Unidades em risco", value: "11 unidades", color: "#dc2626", big: true },
            ].map((row, i) => (
              <div key={row.label}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: "#6b7280" }}>{row.label}</span>
                  <span style={{ fontSize: row.big ? 16 : 13, fontWeight: row.big ? 700 : 500, color: row.color, fontFamily: "JetBrains Mono, monospace" }}>{row.value}</span>
                </div>
                {i < 2 && <div style={{ borderBottom: "1px dashed #f0f1f3", margin: "10px 0 0" }} />}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, background: "#fef2f2", borderRadius: 8, padding: "12px 14px", borderLeft: "3px solid #dc2626" }}>
            <div style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>Valor potencialmente perdido</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#dc2626", fontFamily: "JetBrains Mono, monospace" }}>R$ 273,90</div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div style={{
          background: "#fff",
          border: "1px solid #e4e7ec",
          borderRadius: 12,
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, background: "#eff6ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✦</div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#0f1117", margin: 0 }}>Recomendação do Preço Vivo</h3>
          </div>
          <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
            "Com base no ritmo atual de vendas, estoque disponível e tempo restante até a validade, recomendamos uma redução de 24% no preço."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>Preço atual</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: "#9ca3af", textDecoration: "line-through", fontFamily: "JetBrains Mono, monospace" }}>R$ 24,90</div>
            </div>
            <div style={{ fontSize: 20, color: "#d1d5db" }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>Recomendado</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#16a34a", fontFamily: "JetBrains Mono, monospace" }}>R$ 18,90</div>
            </div>
            <div style={{ background: "#fef2f2", color: "#dc2626", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>−24%</div>
          </div>
          {applied ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#16a34a", fontWeight: 600 }}>
              <span>✓</span> Desconto aplicado com sucesso
            </div>
          ) : (
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setShowModal(true)}
                style={{
                  flex: 1,
                  background: "#16a34a", color: "#fff",
                  border: "none", borderRadius: 8,
                  padding: "10px 16px",
                  fontSize: 13, fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Aplicar desconto
              </button>
              <button style={{
                flex: 1,
                background: "#f9fafb", color: "#6b7280",
                border: "1px solid #e4e7ec", borderRadius: 8,
                padding: "10px 16px",
                fontSize: 13, fontWeight: 500,
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
              }}>
                Ignorar recomendação
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Why */}
      <div style={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#0f1117", margin: "0 0 16px" }}>Por que recomendamos isso?</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {factors.map(f => (
            <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#fafafa", borderRadius: 8 }}>
              <span style={{ fontSize: 18 }}>{f.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0f1117" }}>{f.label}</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 1 }}>{f.value}</div>
              </div>
              <Badge
                variant={f.weight === "alto" ? "danger" : f.weight === "médio" ? "warning" : "success"}
                label={f.weight}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Price history chart */}
      <div style={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 12, padding: "20px 24px" }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#0f1117", margin: "0 0 4px" }}>Evolução do preço e vendas</h3>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 20px" }}>Dados ilustrativos — como o sistema aprende com o comportamento das vendas</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={historyData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f3" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v => `R$${v}`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #e4e7ec", borderRadius: 8, fontFamily: "Inter, sans-serif" }} />
            <Legend wrapperStyle={{ fontSize: 12, fontFamily: "Inter, sans-serif" }} />
            <Line yAxisId="left" type="monotone" dataKey="preco" name="Preço (R$)" stroke="#6b7280" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 3" />
            <Line yAxisId="right" type="monotone" dataKey="vendas" name="Unidades vendidas" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 3, fill: "#16a34a" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
        }} onClick={() => setShowModal(false)}>
          <div
            style={{
              background: "#fff", borderRadius: 16, padding: "32px", width: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              fontFamily: "Inter, sans-serif",
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f1117", margin: "0 0 6px" }}>Aplicar novo preço?</h2>
            <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 24px" }}>Esta ação será registrada e pode ser revertida.</p>

            <div style={{ background: "#f9fafb", borderRadius: 10, padding: "16px 18px", marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0f1117", marginBottom: 12 }}>{name}</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>Preço atual</span>
                <span style={{ fontSize: 13, color: "#9ca3af", textDecoration: "line-through", fontFamily: "JetBrains Mono, monospace" }}>R$ 24,90</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>Novo preço</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#16a34a", fontFamily: "JetBrains Mono, monospace" }}>R$ 18,90</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>Desconto</span>
                <span style={{ fontSize: 13, color: "#dc2626", fontWeight: 600 }}>−24%</span>
              </div>
              <div style={{ borderTop: "1px solid #e4e7ec", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>Validade</span>
                <span style={{ fontSize: 13, color: "#374151" }}>Hoje — 21:00</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={confirm}
                style={{
                  flex: 1, background: "#16a34a", color: "#fff",
                  border: "none", borderRadius: 8, padding: "11px",
                  fontSize: 14, fontWeight: 600, cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Confirmar alteração
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1, background: "#f9fafb", color: "#374151",
                  border: "1px solid #e4e7ec", borderRadius: 8, padding: "11px",
                  fontSize: 14, fontWeight: 500, cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
