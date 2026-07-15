import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HonestGame() {
  const navigate = useNavigate();
  const [improveHoleCount, setImproveHoleCount] = useState(5);
const [loaded, setLoaded] = useState(false);
  const [players, setPlayers] = useState([
    {
      name: "プレイヤー1",
      targetScore: 100,
      actualScore: 100,
      improveStrokes: 0,
    },
    {
      name: "プレイヤー2",
      targetScore: 100,
      actualScore: 100,
      improveStrokes: 0,
    },
  ]);
useEffect(() => {
  const saved = localStorage.getItem("honestGame");

  if (saved) {
    const data = JSON.parse(saved);

    setPlayers(data.players || []);
    setImproveHoleCount(data.improveHoleCount || 5);
  }
}, []);


useEffect(() => {
  const saved = localStorage.getItem("honestGame");

  if (saved) {
    const data = JSON.parse(saved);

    setPlayers(data.players || []);
    setImproveHoleCount(data.improveHoleCount || 5);
  }

  setLoaded(true);
}, []);

useEffect(() => {
  if (!loaded) return;

  localStorage.setItem(
    "honestGame",
    JSON.stringify({
      players,
      improveHoleCount,
    })
  );
}, [players, improveHoleCount, loaded]);
  const updatePlayer = (idx, key, value) => {
    setPlayers((prev) =>
      prev.map((player, playerIdx) =>
        playerIdx === idx
          ? {
              ...player,
              [key]:
                key === "name"
                  ? value
                  : value === ""
                  ? ""
                  : Number(value),
            }
          : player
      )
    );
  };

  const addPlayer = () => {
    setPlayers((prev) => [
      ...prev,
      {
        name: `プレイヤー${prev.length + 1}`,
        targetScore: 100,
        actualScore: 100,
        improveStrokes: 0,
      },
    ]);
  };

  const removePlayer = () => {
    setPlayers((prev) => {
      if (prev.length <= 2) return prev;
      return prev.slice(0, -1);
    });
  };
const results = players
  .map((player) => {
    const improved =
      Number(player.actualScore || 0) -
      Number(player.improveStrokes || 0);

    const diff = improved - Number(player.targetScore || 0);

    return {
      ...player,
      improved,
      diff,
      isDobon: diff < 0,
    };
  })
  .sort((a, b) => {
    if (a.isDobon && !b.isDobon) return 1;
    if (!a.isDobon && b.isDobon) return -1;

    if (!a.isDobon && !b.isDobon) {
      return a.diff - b.diff;
    }

    return b.diff - a.diff;
  });
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 16,
        marginTop: 12,
      }}
    >
<button
  onClick={() => navigate("/")}
  style={{
    marginBottom: 12,
    padding: "10px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    background: "#fff",
    fontWeight: 800,
    cursor: "pointer",
  }}
>
  ← トップへ戻る
</button>
      <h2 style={{ marginTop: 0 }}>🎯 オネスト</h2>

      <p
        style={{
          color: "#64748b",
          fontWeight: 700,
          lineHeight: 1.6,
        }}
      >
        ラウンド前に申告スコアを入力し、ラウンド後に実スコアと改善打数を入力します。
      </p>

      <div
        style={{
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: 16,
          padding: 14,
          marginBottom: 16,
        }}
      >
        <label
          style={{
            display: "block",
            fontWeight: 900,
            marginBottom: 8,
          }}
        >
          改善ホール数
        </label>

        <select
          value={improveHoleCount}
          onChange={(e) => setImproveHoleCount(Number(e.target.value))}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 12,
            border: "1px solid #93c5fd",
            background: "#fff",
            fontWeight: 900,
            boxSizing: "border-box",
          }}
        >
          {Array.from({ length: 18 }, (_, i) => i + 1).map((count) => (
            <option key={count} value={count}>
              {count}ホール
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <button
          onClick={addPlayer}
          style={{
            padding: 12,
            border: "none",
            borderRadius: 12,
            background: "#22c55e",
            color: "#fff",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          ➕ プレイヤー追加
        </button>

        <button
          onClick={removePlayer}
          style={{
            padding: 12,
            border: "none",
            borderRadius: 12,
            background: "#64748b",
            color: "#fff",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          ➖ プレイヤー削除
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 12,
        }}
      >
        {players.map((player, idx) => {
          const improvedScore =
            Number(player.actualScore || 0) -
            Number(player.improveStrokes || 0);

          return (
            <div
              key={idx}
              style={{
                border: "1px solid #dbeafe",
                borderRadius: 16,
                padding: 12,
                background: "#f8fafc",
              }}
            >
              <input
                value={player.name}
                onChange={(e) =>
                  updatePlayer(idx, "name", e.target.value)
                }
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 12,
                  borderRadius: 10,
                  border: "1px solid #cbd5e1",
                  boxSizing: "border-box",
                  fontWeight: 900,
                }}
              />

              <label
                style={{
                  display: "block",
                  fontWeight: 800,
                  marginBottom: 10,
                }}
              >
                申告スコア
                <input
                  type="number"
                  value={player.targetScore}
                  onChange={(e) =>
                    updatePlayer(idx, "targetScore", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: 10,
                    marginTop: 6,
                    borderRadius: 10,
                    border: "1px solid #cbd5e1",
                    boxSizing: "border-box",
                  }}
                />
              </label>

              <label
                style={{
                  display: "block",
                  fontWeight: 800,
                  marginBottom: 10,
                }}
              >
                実スコア
                <input
                  type="number"
                  value={player.actualScore}
                  onChange={(e) =>
                    updatePlayer(idx, "actualScore", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: 10,
                    marginTop: 6,
                    borderRadius: 10,
                    border: "1px solid #cbd5e1",
                    boxSizing: "border-box",
                  }}
                />
              </label>

              <label
                style={{
                  display: "block",
                  fontWeight: 800,
                  marginBottom: 10,
                }}
              >
                改善打数
                <input
                  type="number"
                  min="0"
                  value={player.improveStrokes}
                  onChange={(e) =>
                    updatePlayer(idx, "improveStrokes", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: 10,
                    marginTop: 6,
                    borderRadius: 10,
                    border: "1px solid #cbd5e1",
                    boxSizing: "border-box",
                  }}
                />
              </label>

              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  borderRadius: 12,
                  background: "#dbeafe",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: "#475569",
                    fontWeight: 800,
                  }}
                >
                  改善後スコア
                </div>

                <div
                  style={{
                    fontSize: 28,
                    color: "#1d4ed8",
                    fontWeight: 900,
                  }}
                >
                  {improvedScore}
                </div>
              </div>
            </div>
          );
        })}
      </div>
<h2 style={{ marginTop: 30 }}>🏆 ランキング</h2>

{results.map((player, idx) => {
  const rank = player.isDobon
    ? null
    : results.filter(
        (other) => !other.isDobon && other.diff < player.diff
      ).length + 1;

  let background = "#dbeafe";
  let color = "#1e3a8a";
  let rankLabel =
    rank === 1
      ? "🥇 1位"
      : rank === 2
      ? "🥈 2位"
      : rank === 3
      ? "🥉 3位"
      : `${rank}位`;

  if (player.diff === 0) {
    background = "#dcfce7";
    color = "#166534";
    rankLabel = "🎯 ピタリ";
  }

  if (player.isDobon) {
    background = "#fecaca";
    color = "#991b1b";
    rankLabel = "💥 ドボン";
  }

  return (
    <div
      key={`${player.name}-${idx}`}
      style={{
        marginTop: 10,
        padding: 14,
        borderRadius: 14,
        background,
        color,
        fontWeight: 900,
      }}
    >
      <div style={{ fontSize: 20 }}>
        {rankLabel}　{player.name}
      </div>

      <div style={{ marginTop: 6 }}>
        申告 {player.targetScore}　
        改善後 {player.improved}　
        差 {player.diff > 0 ? "+" : ""}
        {player.diff}
      </div>
    </div>
  );
})}
    </div>
  );
}