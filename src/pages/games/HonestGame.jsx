import { useState } from "react";

export default function HonestGame() {
  const [players, setPlayers] = useState([
    { name: "プレイヤー1", target: 100, score: 100 },
    { name: "プレイヤー2", target: 100, score: 100 },
  ]);

  const updatePlayer = (idx, key, value) => {
    const copy = [...players];
    copy[idx][key] = value;
    setPlayers(copy);
  };

  const results = players
    .map((player) => ({
      ...player,
      diff: Math.abs(Number(player.score || 0) - Number(player.target || 0)),
    }))
    .sort((a, b) => a.diff - b.diff);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 16,
        marginTop: 12,
      }}
    >
      <h2>🎯 オネスト</h2>
      <p style={{ color: "#64748b", fontWeight: 700 }}>
        予想スコアと実スコアの差が少ない人が勝ち
      </p>

      {players.map((player, idx) => (
        <div
          key={idx}
          style={{
            border: "1px solid #dbeafe",
            borderRadius: 16,
            padding: 12,
            marginBottom: 12,
            background: "#f8fafc",
          }}
        >
          <input
            value={player.name}
            onChange={(e) => updatePlayer(idx, "name", e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 8,
              borderRadius: 10,
              border: "1px solid #cbd5e1",
              boxSizing: "border-box",
              fontWeight: 800,
            }}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <label>
              予想
              <input
                type="number"
                value={player.target}
                onChange={(e) => updatePlayer(idx, "target", e.target.value)}
                style={{ width: "100%", padding: 10, boxSizing: "border-box" }}
              />
            </label>

            <label>
              実スコア
              <input
                type="number"
                value={player.score}
                onChange={(e) => updatePlayer(idx, "score", e.target.value)}
                style={{ width: "100%", padding: 10, boxSizing: "border-box" }}
              />
            </label>
          </div>

          <div style={{ marginTop: 10, fontWeight: 900 }}>
            差：{Math.abs(Number(player.score || 0) - Number(player.target || 0))}
          </div>
        </div>
      ))}

      <h3>ランキング</h3>
      {results.map((player, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 12,
            borderRadius: 12,
            background: idx === 0 ? "#fef3c7" : "#f8fafc",
            marginBottom: 8,
            fontWeight: 900,
          }}
        >
          <span>{idx + 1}位　{player.name}</span>
          <span>差 {player.diff}</span>
        </div>
      ))}
    </div>
  );
}