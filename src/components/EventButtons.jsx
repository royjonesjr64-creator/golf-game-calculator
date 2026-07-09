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
           {true && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 8,
          }}
        >
          {[
  { name: "砂一", point: 3 },
  { name: "砂ゼロ", point: 8 },
  { name: "バーディ", point: 3 },
  { name: "ダイヤ", point: 5 },
  { name: "ニアピン", point: 3 },
  { name: "ドラコン", point: 3 },
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
      { name: "鉄", point: 1 },
      { name: "銅", point: 2 },
      { name: "銀", point: 3 },
      { name: "金", point: 4 },
      { name: "一通", point: 10 },
    ].map((event) => (
      <button
        key={event.name}
        onClick={() => {
          addHolePoint(idx, Number(event.point));
          setOpenKanPlayer(null);
          setOpenEventPlayer(null);
        }}
        style={{
          padding: "12px 8px",
          border: "1px solid #d1d5db",
          borderRadius: 12,
          background: "#f8fafc",
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
    </>
  );
}