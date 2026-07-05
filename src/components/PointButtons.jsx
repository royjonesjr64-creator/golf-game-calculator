export default function PointButtons({
  idx,
  addHolePoint,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 8,
      }}
    >
      {[-5, -1, 1, 5].map((num) => (
        <button
          key={num}
          onClick={() => addHolePoint(idx, num)}
          style={{
            padding: "14px 0",
            border: "none",
            borderRadius: 12,
            fontSize: 18,
            fontWeight: 900,
            color: "#fff",
            cursor: "pointer",
            background:
              num < 0
                ? "#ef4444"
                : num === 1
                ? "#22c55e"
                : "#2563eb",
          }}
        >
          {num > 0 ? `+${num}` : num}
        </button>
      ))}
    </div>
  );
}