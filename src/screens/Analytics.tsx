import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line } from "recharts"

const comparisonData = [
  { mes: "Mar", tradicional: 3200, comPlataforma: 5800 },
  { mes: "Abr", tradicional: 2900, comPlataforma: 5400 },
  { mes: "Mai", tradicional: 3500, comPlataforma: 6200 },
  { mes: "Jun", tradicional: 3100, comPlataforma: 5900 },
  { mes: "Jul", tradicional: 2800, comPlataforma: 6500 },
  { mes: "Ago", tradicional: 3000, comPlataforma: 7100 },
]

const lossData = [
  { mes: "Mar", perdas: 1800, recuperado: 940 },
  { mes: "Abr", perdas: 1600, recuperado: 1100 },
  { mes: "Mai", perdas: 1400, recuperado: 1350 },
  { mes: "Jun", perdas: 1200, recuperado: 1420 },
  { mes: "Jul", perdas: 980, recuperado: 1680 },
  { mes: "Ago", perdas: 760, recuperado: 2100 },
]

export default function Analytics() {
  return (
    <div style={{ padding: "32px 36px", maxWidth: 1100, fontFamily: "Inter, sans-serif" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f1117", margin: 0 }}>Impacto financeiro</h1>
        <p style={{ fontSize: 14, color: "#6b7280", margin: "4px 0 0" }}>
          Dados ilustrativos do protótipo — resultado acumulado dos últimos 6 meses.
        </p>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Receita recuperada", value: "R$ 12.840", color: "#16a34a", bg: "#f0fdf4", icon: "↗" },
          { label: "Desperdício evitado", value: "R$ 4.260", color: "#2563eb", bg: "#eff6ff", icon: "↓" },
          { label: "Margem preservada", value: "R$ 7.310", color: "#7c3aed", bg: "#f5f3ff", icon: "▲" },
          { label: "Produtos recuperados", value: "342", color: "#d97706", bg: "#fffbeb", icon: "✓" },
        ].map(k => (
          <div key={k.label} style={{
            background: "#fff",
            border: "1px solid #e4e7ec",
            borderRadius: 12,
            padding: "20px 22px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1.4, maxWidth: 100 }}>{k.label}</div>
              <div style={{ width: 30, height: 30, background: k.bg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: k.color, fontWeight: 700, fontSize: 14 }}>
                {k.icon}
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: k.color, marginTop: 12, fontVariantNumeric: "tabular-nums", fontFamily: "JetBrains Mono, monospace" }}>
              {k.value}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Revenue comparison */}
        <div style={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 12, padding: "20px 24px" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#0f1117", margin: "0 0 4px" }}>Receita: cenário tradicional vs. Preço Vivo</h3>
          <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 20px" }}>Comparativo mensal (R$)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={comparisonData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f3" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, ""]}
                contentStyle={{ fontSize: 12, border: "1px solid #e4e7ec", borderRadius: 8, fontFamily: "Inter, sans-serif" }}
              />
              <Legend wrapperStyle={{ fontSize: 12, fontFamily: "Inter, sans-serif" }} />
              <Bar dataKey="tradicional" name="Cenário tradicional" fill="#e4e7ec" radius={[3, 3, 0, 0]} />
              <Bar dataKey="comPlataforma" name="Com Preço Vivo" fill="#16a34a" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Loss vs recovered */}
        <div style={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 12, padding: "20px 24px" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#0f1117", margin: "0 0 4px" }}>Perdas vs. Receita recuperada</h3>
          <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 20px" }}>Evolução mensal (R$)</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={lossData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f3" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v/1000).toFixed(1)}k`} />
              <Tooltip
                formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, ""]}
                contentStyle={{ fontSize: 12, border: "1px solid #e4e7ec", borderRadius: 8, fontFamily: "Inter, sans-serif" }}
              />
              <Legend wrapperStyle={{ fontSize: 12, fontFamily: "Inter, sans-serif" }} />
              <Line type="monotone" dataKey="perdas" name="Perdas" stroke="#dc2626" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="recuperado" name="Receita recuperada" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 3, fill: "#16a34a" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary note */}
      <div style={{
        marginTop: 20, padding: "14px 18px",
        background: "#f0fdf4", border: "1px solid #bbf7d0",
        borderRadius: 10, display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 18 }}>📈</span>
        <p style={{ fontSize: 13, color: "#15803d", margin: 0, lineHeight: 1.5 }}>
          <strong>Tendência positiva:</strong> as perdas caíram 57% desde março, enquanto a receita recuperada cresceu 123% no mesmo período.
          O sistema aprende continuamente com o comportamento de vendas de cada loja.
        </p>
      </div>
    </div>
  )
}
