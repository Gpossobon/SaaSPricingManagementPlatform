type Props = {
  label: string
  value: string
  sub: string
  subColor?: string
  accent?: string
}

export default function KpiCard({ label, value, sub, subColor = "#6b7280", accent = "#16a34a" }: Props) {
  return (
    <div style={{
      background: "#ffffff",
      border: "1px solid #e4e7ec",
      borderRadius: 12,
      padding: "20px 24px",
      flex: 1,
      minWidth: 0,
      fontFamily: "Inter, sans-serif",
    }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, color: "#0f1117", lineHeight: 1, marginBottom: 8, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: subColor, fontWeight: 500 }}>{sub}</div>
      <div style={{ marginTop: 14, height: 3, background: "#f3f4f6", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: "60%", background: accent, borderRadius: 2 }} />
      </div>
    </div>
  )
}
