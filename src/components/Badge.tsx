type Variant = "success" | "warning" | "danger" | "info" | "neutral"

const styles: Record<Variant, { bg: string; color: string; dot: string }> = {
  success: { bg: "#f0fdf4", color: "#15803d", dot: "#16a34a" },
  warning: { bg: "#fffbeb", color: "#b45309", dot: "#d97706" },
  danger:  { bg: "#fef2f2", color: "#b91c1c", dot: "#dc2626" },
  info:    { bg: "#eff6ff", color: "#1d4ed8", dot: "#2563eb" },
  neutral: { bg: "#f3f4f6", color: "#374151", dot: "#9ca3af" },
}

type Props = { variant: Variant; label: string; dot?: boolean }

export default function Badge({ variant, label, dot = true }: Props) {
  const s = styles[variant]
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      background: s.bg,
      color: s.color,
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "Inter, sans-serif",
      padding: "3px 8px",
      borderRadius: 20,
      whiteSpace: "nowrap",
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, display: "inline-block" }} />}
      {label}
    </span>
  )
}
