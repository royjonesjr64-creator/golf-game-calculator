import PlayerName from "./PlayerName";
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

   <PlayerName
  player={player}
  idx={idx}
  savedNames={savedNames}
  updatePlayer={updatePlayer}
  savePlayerName={savePlayerName}
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