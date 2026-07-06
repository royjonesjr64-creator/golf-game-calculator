export default function EventButtons({
  idx,
  openEventPlayer,
  setOpenEventPlayer,
  openKanPlayer,
  setOpenKanPlayer,
  activeEvents,
  addHolePoint,
}) {
  return (
    <>
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
        </div>
      )}
    </>
  );
}