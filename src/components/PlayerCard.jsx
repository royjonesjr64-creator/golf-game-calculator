import PlayerHeader from "./PlayerHeader";
export default function PlayerCard({
  player,
  idx,
  savedNames,
  updatePlayer,
  savePlayerName,
  getPlayerTotalPoint,
  holeScores,
  currentHole,
  addHolePoint,
  openEventPlayer,
  setOpenEventPlayer,
  openKanPlayer,
  setOpenKanPlayer,
  activeEvents,
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
      <PlayerHeader
  idx={idx}
  totalPoint={getPlayerTotalPoint(idx)}
/>

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

      <div style={{ textAlign: "center", marginTop: 10 }}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: "#2563eb",
            marginBottom: 12,
          }}
        >
          {Number(holeScores[String(currentHole)]?.[idx] || 0)} pt
        </div>

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
                  num < 0 ? "#ef4444" : num === 1 ? "#22c55e" : "#2563eb",
              }}
            >
              {num > 0 ? `+${num}` : num}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <button
          onClick={() =>
            setOpenEventPlayer(openEventPlayer === idx ? null : idx)
          }
          style={{
            width: "100%",
            padding: "12px 14px",
            border: "1px solid #bbf7d0",
            borderRadius: 12,
            background: "#f0fdf4",
            color: "#166534",
            fontWeight: 900,
            cursor: "pointer",
            textAlign: "left",
            marginBottom: 8,
          }}
        >
          🏅 役を追加 {openEventPlayer === idx ? "▲" : "▼"}
        </button>

        {openEventPlayer === idx && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 8,
            }}
          >
            {(activeEvents.length > 0
              ? activeEvents.filter((event) => event.enabled !== false)
              : [
                  { name: "ニアピン", point: 3 },
                  { name: "ドラコン", point: 3 },
                  { name: "バーディ", point: 3 },
                  { name: "砂一", point: 3 },
                  { name: "砂ゼロ", point: 8 },
                  { name: "ダイヤ", point: 5 },
                ]
            ).map((event) => (
              <button
                key={event.name}
                onClick={() => {
                  addHolePoint(idx, Number(event.point || 0));
                  setOpenEventPlayer(null);
                  setOpenKanPlayer(null);
                }}
                style={{
                  padding: "12px 8px",
                  border: "1px solid #bbf7d0",
                  borderRadius: 12,
                  background:
                    event.name === "ニアピン"
                      ? "#dbeafe"
                      : event.name === "ドラコン"
                      ? "#fef3c7"
                      : event.name === "バーディ"
                      ? "#dcfce7"
                      : event.name === "砂一"
                      ? "#fde68a"
                      : event.name === "砂ゼロ"
                      ? "#fca5a5"
                      : event.name === "ダイヤ"
                      ? "#ddd6fe"
                      : "#e5e7eb",
                  color: "#111827",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                {event.name || event.title || event.eventName || event.label || "役"} +{event.point}
              </button>
            ))}

            <button
              onClick={() =>
                setOpenKanPlayer(openKanPlayer === idx ? null : idx)
              }
              style={{
                gridColumn: "1 / -1",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: 12,
                background: "#f8fafc",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              ⭐ 貫 {openKanPlayer === idx ? "▲" : "▼"}
            </button>

            {openKanPlayer === idx && (
              <>
                {[
                  { name: "鉄貫", point: 4 },
                  { name: "銅貫", point: 8 },
                  { name: "銀貫", point: 12 },
                  { name: "金貫", point: 16 },
                ].map((event) => (
                  <button
                    key={event.name}
                    onClick={() => {
                      addHolePoint(idx, Number(event.point || 0));
                      setOpenEventPlayer(null);
                      setOpenKanPlayer(null);
                    }}
                    style={{
                      padding: "12px 8px",
                      border: "1px solid #d1d5db",
                      borderRadius: 12,
                      background:
                        event.name === "鉄貫"
                          ? "#e5e7eb"
                          : event.name === "銅貫"
                          ? "#d6a77a"
                          : event.name === "銀貫"
                          ? "#e5e7eb"
                          : "#fde68a",
                      color: "#111827",
                      fontWeight: 900,
                      cursor: "pointer",
                    }}
                  >
                    {event.name} +{event.point}
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}