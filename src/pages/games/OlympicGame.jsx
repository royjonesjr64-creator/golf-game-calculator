import { useState } from "react";
import PlayerCard from "../../components/PlayerCard";
export default function OlympicGame({
    savedNames,
  deleteSavedName,
  players,
  setPlayers,
  resetGame,
  addPlayer,
  removePlayer,
  buttonStyle,
  updatePlayer,
  savePlayerName,
  getPlayerTotalPoint,
  holeScores,
 
  addHolePoint,
  openEventPlayer,
  setOpenEventPlayer,
  openKanPlayer,
  setOpenKanPlayer,
  activeEvents,
}) {

  const [currentHole, setCurrentHole] = useState(1);
 return (
    <>
     <h3 style={{ marginTop: 0 }}>
  合計ポイント入力
</h3>

      <div
        style={{
          background: "#2563eb",
          color: "#fff",
          borderRadius: 14,
          padding: "12px",
          textAlign: "center",
          fontWeight: 900,
          fontSize: 20,
          margin: "12px 0",
        }}
      >
        ⛳ 現在 {currentHole} H
      </div>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "56px 1fr 56px",
    gap: 10,
    marginBottom: 16,
  }}
>
  <button
    onClick={() => setCurrentHole((h) => Math.max(1, h - 1))}
    style={{
      padding: 12,
      border: "none",
      borderRadius: 12,
      background: "#64748b",
      color: "#fff",
      fontWeight: 900,
    }}
  >
    ◀
  </button>

 <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 6,
    marginBottom: 16,
  }}
>
  {Array.from({ length: 18 }, (_, i) => i + 1).map((hole) => (
    <button
      key={hole}
      onClick={() => setCurrentHole(hole)}
      style={{
        padding: "10px 0",
        border: "none",
        borderRadius: 10,
        background: currentHole === hole ? "#2563eb" : "#e5e7eb",
        color: currentHole === hole ? "#fff" : "#111827",
        fontWeight: 900,
        cursor: "pointer",
      }}
    >
      {hole}
    </button>
  ))}
</div>

  <button
    onClick={() => setCurrentHole((h) => Math.min(18, h + 1))}
    style={{
      padding: 12,
      border: "none",
      borderRadius: 12,
      background: "#16a34a",
      color: "#fff",
      fontWeight: 900,
    }}
  >
    ▶
  </button>
</div>
<details style={{ marginBottom: 12 }}>
  <summary
    style={{
      cursor: "pointer",
      fontWeight: 700,
    }}
  >
    保存済みメンバー管理
  </summary>

  <div style={{ marginTop: 8 }}>
   (savedNames || []).map((name) => (
      <div
        key={name}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px 0",
        }}
      >
        <span>{name}</span>

        <button onClick={() => deleteSavedName(name)}>
          🗑️
        </button>
      </div>

    ))}
  </div>
</details>
<div
  style={{
    display: "grid",
    gap: 10,
    marginBottom: 12,
  }}
>
  <button
    onClick={addPlayer}
    style={{ ...buttonStyle, background: "#22c55e", color: "#fff" }}
  >
    ➕ プレイヤー追加
  </button>

  <button
    onClick={removePlayer}
    style={{ ...buttonStyle, background: "#64748b", color: "#fff" }}
  >
    ➖ プレイヤー削除
  </button>
 <button
    onClick={resetGame}
    style={{ ...buttonStyle, background: "#f59e0b", color: "#fff" }}
  >
    🔄 新規ゲーム
  </button>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
    marginTop: 12,
  }}
>
{players.map((player, idx) => (
  <PlayerCard
    key={idx}
    player={player}
    idx={idx}
    savedNames={savedNames}
    updatePlayer={updatePlayer}
    savePlayerName={savePlayerName}
    getPlayerTotalPoint={getPlayerTotalPoint}
    holeScores={holeScores}
    currentHole={currentHole}
    addHolePoint={addHolePoint}
    openEventPlayer={openEventPlayer}
    setOpenEventPlayer={setOpenEventPlayer}
    openKanPlayer={openKanPlayer}
    setOpenKanPlayer={setOpenKanPlayer}
    activeEvents={activeEvents}
  />
))}
 </div>
</div>   
 </>
  );
}
