export default function PlayerHeader({
  idx,
  totalPoint,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 20 }}>
        👤 プレイヤー{idx + 1}
      </div>

      <div
        style={{
          background: "#2563eb",
          color: "#fff",
          padding: "6px 12px",
          borderRadius: 999,
          fontWeight: 900,
        }}
      >
        {totalPoint} pt
      </div>
    </div>
  );
}