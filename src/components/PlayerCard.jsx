import PointButtons from "./PointButtons";
import PlayerHeader from "./PlayerHeader";
import EventButtons from "./EventButtons";
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

       <PointButtons
  idx={idx}
  addHolePoint={addHolePoint}
/>
      </div>

      <div style={{ marginTop: 12 }}>
<EventButtons
  idx={idx}
  openEventPlayer={openEventPlayer}
  setOpenEventPlayer={setOpenEventPlayer}
  openKanPlayer={openKanPlayer}
  setOpenKanPlayer={setOpenKanPlayer}
  activeEvents={activeEvents}
  addHolePoint={addHolePoint}
/>        

             </div>
    </div>
  );
}