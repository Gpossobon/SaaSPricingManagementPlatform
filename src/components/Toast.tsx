type Props = { message: string }

export default function Toast({ message }: Props) {
  return (
    <div className="toast-enter" style={{
      position: "fixed",
      bottom: 32,
      left: "50%",
      transform: "translateX(-50%)",
      background: "#0f1117",
      color: "#fff",
      padding: "12px 20px",
      borderRadius: 10,
      fontSize: 14,
      fontFamily: "Inter, sans-serif",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      gap: 8,
      boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      zIndex: 9999,
      whiteSpace: "nowrap",
    }}>
      <span style={{ color: "#4ade80", fontSize: 16 }}>✓</span>
      {message}
    </div>
  )
}
