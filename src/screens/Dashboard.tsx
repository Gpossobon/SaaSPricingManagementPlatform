import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts"
import KpiCard from "../components/KpiCard"
import Badge from "../components/Badge"

const lineData = [
  { day: "Seg", valor: 820 },
  { day: "Ter", valor: 1140 },
  { day: "Qua", valor: 940 },
  { day: "Qui", valor: 1380 },
  { day: "Sex", valor: 1720 },
  { day: "Sáb", valor: 2100 },
  { day: "Dom", valor: 1580 },
]

const barData = [
  { nivel: "Baixo", qtd: 48 },
  { nivel: "Médio", qtd: 62 },
  { nivel: "Alto", qtd: 34 },
  { nivel: "Crítico", qtd: 17 },
]

const PRODUCTS = [
  { name: "Sushi Salmão", category: "Prontos para consumo", stock: 18, validity: "4h 32min", risk: 91, current: "R$ 24,90", recommended: "R$ 18,90", variant: "danger" as const },
  { name: "Frango Assado", category: "Prontos para consumo", stock: 23, validity: "6h 10min", risk: 83, current: "R$ 19,90", recommended: "R$ 16,90", variant: "danger" as const },
  { name: "Morango 250g", category: "Frutas e Hortaliças", stock: 32, validity: "8h 20min", risk: 76, current: "R$ 12,90", recommended: "R$ 9,90", variant: "warning" as const },
  { name: "Iogurte Natural", category: "Laticínios", stock: 41, validity: "11h 00min", risk: 61, current: "R$ 7,90", recommended: "R$ 6,50", variant: "warning" as const },
  { name: "Pão de Queijo", category: "Padaria", stock: 15, validity: "14h 30min", risk: 38, current: "R$ 3,90", recommended: "R$ 3,40", variant: "success" as const },
]

type Props = { onViewProduct: (name: string) => void }

export default function Dashboard({ onViewProduct }: Props) {
  return (
    <div style={{ padding: "32px 36px", maxWidth: 1200, fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f1117", margin: 0 }}>
            Bom dia, Gabriel 👋
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", margin: "4px 0 0" }}>
            Aqui está o resumo da operação de hoje.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <select style={{
            fontSize: 13, color: "#374151", border: "1px solid #e4e7ec", borderRadius: 8,
            padding: "7px 12px", background: "#fff", cursor: "pointer", fontFamily: "Inter, sans-serif",
          }}>
            <option>Loja Centro — SP</option>
            <option>Loja Moema — SP</option>
            <option>Loja Pinheiros — SP</option>
          </select>
          <select style={{
            fontSize: 13, color: "#374151", border: "1px solid #e4e7ec", borderRadius: 8,
            padding: "7px 12px", background: "#fff", cursor: "pointer", fontFamily: "Inter, sans-serif",
          }}>
            <option>Hoje</option>
            <option>Últimos 7 dias</option>
            <option>Este mês</option>
          </select>
          <button style={{
            width: 36, height: 36, borderRadius: 8, border: "1px solid #e4e7ec", background: "#fff",
            cursor: "pointer", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
          }}>
            🔔
            <span style={{
              position: "absolute", top: 6, right: 6, width: 8, height: 8,
              background: "#dc2626", borderRadius: "50%", border: "2px solid #fff",
            }} />
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <KpiCard label="Produtos em risco" value="127" sub="17 com risco crítico" subColor="#dc2626" accent="#dc2626" />
        <KpiCard label="Valor em risco" value="R$ 8.420" sub="+12% desde ontem" subColor="#d97706" accent="#d97706" />
        <KpiCard label="Receita recuperável" value="R$ 5.780" sub="estimativa da IA" subColor="#16a34a" accent="#16a34a" />
        <KpiCard label="Desperdício projetado" value="↓ 31%" sub="vs. cenário sem intervenção" subColor="#2563eb" accent="#2563eb" />
      </div>

      {/* Products table */}
      <div style={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 12, marginBottom: 24 }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f1f3", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#0f1117", margin: 0 }}>Atenção necessária</h2>
            <p style={{ fontSize: 13, color: "#6b7280", margin: "2px 0 0" }}>Produtos que precisam da sua atenção agora</p>
          </div>
          <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>Atualizado há 2 minutos</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {["Produto", "Categoria", "Estoque", "Validade", "Risco", "Preço atual", "Recomendado", ""].map(h => (
                  <th key={h} style={{
                    padding: "10px 16px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "#6b7280",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderBottom: "1px solid #f0f1f3",
                    whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p, i) => (
                <tr key={p.name} style={{ borderBottom: i < PRODUCTS.length - 1 ? "1px solid #f8f9fa" : "none" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: "#0f1117" }}>{p.name}</td>
                  <td style={{ padding: "12px 16px", color: "#6b7280" }}>{p.category}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "#374151" }}>{p.stock} un</td>
                  <td style={{ padding: "12px 16px", fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: p.risk >= 80 ? "#dc2626" : "#d97706" }}>{p.validity}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <Badge variant={p.variant} label={`${p.risk}%`} />
                  </td>
                  <td style={{ padding: "12px 16px", fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "#374151", textDecoration: "line-through", opacity: 0.6 }}>{p.current}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "JetBrains Mono, monospace", fontSize: 13, fontWeight: 700, color: "#16a34a" }}>{p.recommended}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      onClick={() => onViewProduct(p.name)}
                      style={{
                        fontSize: 12, fontWeight: 600, color: "#2563eb", background: "#eff6ff",
                        border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      Ver análise
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 16 }}>
        {/* Line chart */}
        <div style={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 12, padding: "20px 24px" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#0f1117", margin: "0 0 4px" }}>Receita recuperada</h3>
          <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 20px" }}>Últimos 7 dias — dados ilustrativos</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={lineData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f3" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v => `R$${v}`} />
              <Tooltip
                formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, "Receita"]}
                contentStyle={{ fontSize: 12, border: "1px solid #e4e7ec", borderRadius: 8, fontFamily: "Inter, sans-serif" }}
              />
              <Line type="monotone" dataKey="valor" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 3, fill: "#16a34a" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div style={{ background: "#fff", border: "1px solid #e4e7ec", borderRadius: 12, padding: "20px 24px" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#0f1117", margin: "0 0 4px" }}>Produtos por nível de risco</h3>
          <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 20px" }}>Distribuição atual</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData} margin={{ top: 5, right: 5, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f3" vertical={false} />
              <XAxis dataKey="nivel" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 12, border: "1px solid #e4e7ec", borderRadius: 8, fontFamily: "Inter, sans-serif" }}
              />
              <Bar dataKey="qtd" radius={[4, 4, 0, 0]}>
                {barData.map((_, idx) => (
                  <Cell key={idx} fill={["#16a34a", "#d97706", "#f97316", "#dc2626"][idx]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
