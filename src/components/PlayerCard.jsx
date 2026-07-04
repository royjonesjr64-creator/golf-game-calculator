export default function PlayerCard({
  player,
  idx,
  savedNames,
  updatePlayer,
  savePlayerName,
  getPlayerTotalPoint,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #dbeafe",
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
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
          0 pt
        </div>
      </div>

      <select
        value=""
        onChange={(e) => updatePlayer(idx, "name", e.target.value)}
        style={{
          width: "100%",
          padding: 8,
          borderRadius: 8,
          border: "1px solid #cbd5e1",
          marginBottom: 6,
        }}
      >
        <option value="">保存済みから選択</option>
        {savedNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <input
        value={player.name}
        onChange={(e) => updatePlayer(idx, "name", e.target.value)}
        onBlur={() => savePlayerName(player.name)}
        placeholder="新規で名前入力"
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 12,
          border: "1px solid #cbd5e1",
          fontWeight: 700,
          marginBottom: 12,
          fontSize: 15,
          boxSizing: "border-box",
          outline: "none",
          background: "#f8fafc",
        }}
      />
    </div>
  );
}