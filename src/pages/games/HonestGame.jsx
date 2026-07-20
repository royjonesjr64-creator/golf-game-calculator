import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HonestGame() {
  const navigate = useNavigate();
  const [improveHoleCount, setImproveHoleCount] = useState(5);
const [loaded, setLoaded] = useState(false);
const [honestHistory, setHonestHistory] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem("honestHistory") || "[]"
    );
  } catch {
    return [];
  }
});
const [openHistoryId, setOpenHistoryId] = useState(null);
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
const startNewGame = () => {
  const confirmed = window.confirm(
    "現在の途中データを消して、新しいゲームを始めますか？"
  );

  if (!confirmed) return;

  const initialPlayers = [
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
  ];

  localStorage.removeItem("honestGame");
  setImproveHoleCount(5);
  setPlayers(initialPlayers);
};

const saveHonestResult = () => {
  const historyItem = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    improveHoleCount,
    players,
  };

  const updatedHistory = [historyItem, ...honestHistory];

  setHonestHistory(updatedHistory);

  localStorage.setItem(
    "honestHistory",
    JSON.stringify(updatedHistory)
  );

  alert("オネストの結果を保存しました");
};

const deleteHonestHistory = (id) => {
  const confirmed = window.confirm(
    "この履歴を削除しますか？"
  );

  if (!confirmed) return;

  const updatedHistory = honestHistory.filter(
    (item) => item.id !== id
  );

  setHonestHistory(updatedHistory);

  localStorage.setItem(
    "honestHistory",
    JSON.stringify(updatedHistory)
  );
};
const shareHonestResult = async (item) => {
  const text =
    `🏆 オネスト結果\n\n` +
    `📅 ${item.date}\n` +
    `改善ホール数：${item.improveHoleCount}\n\n` +
    item.players
      .map((player) => {
        const improved =
          Number(player.actualScore || 0) -
          Number(player.improveStrokes || 0);

        const diff =
          improved - Number(player.targetScore || 0);

        return (
          `${player.name}\n` +
          `申告 ${player.targetScore}\n` +
          `実 ${player.actualScore}\n` +
          `改善後 ${improved}\n` +
          `差 ${diff > 0 ? "+" : ""}${diff}`
        );
      })
      .join("\n\n");

  if (navigator.share) {
    await navigator.share({
      title: "オネスト結果",
      text,
    });
  } else {
    await navigator.clipboard.writeText(text);
    alert("結果をコピーしました");
  }
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
<div
  style={{
    display: "flex",
    gap: 8,
    marginBottom: 12,
  }}
>
  <button
    onClick={() => navigate("/")}
    style={{
      flex: 1,
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

  <button
    onClick={startNewGame}
    style={{
      flex: 1,
      padding: "10px 14px",
      border: "none",
      borderRadius: 10,
      background: "#f59e0b",
      color: "#fff",
      fontWeight: 900,
      cursor: "pointer",
    }}
  >
    🔄 新しいゲーム
  </button>
</div> 
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
<button
  onClick={saveHonestResult}
  style={{
    width: "100%",
    marginTop: 16,
    padding: "14px 16px",
    border: "none",
    borderRadius: 12,
    background: "#16a34a",
    color: "#fff",
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
  }}
>
  💾 結果を履歴保存
</button>
<h2 style={{ marginTop: 30 }}>📚 保存履歴</h2>

{honestHistory.length === 0 ? (
  <div
    style={{
      padding: 14,
      borderRadius: 12,
      background: "#f1f5f9",
      color: "#64748b",
      fontWeight: 800,
    }}
  >
    まだ保存された履歴はありません
  </div>
) : (
  honestHistory.map((item) => (
    <div
      key={item.id}
      style={{
        marginTop: 12,
        padding: 14,
        border: "1px solid #cbd5e1",
        borderRadius: 14,
        background: "#fff",
      }}
    >
      <div
        style={{
          fontWeight: 900,
          marginBottom: 8,
        }}
      >
        📅 {item.date}
      </div>

      <div
        style={{
          marginBottom: 10,
          color: "#475569",
          fontWeight: 800,
        }}
      >
        改善ホール数：{item.improveHoleCount}
      </div>
<button
  onClick={() =>
    setOpenHistoryId(
      openHistoryId === item.id ? null : item.id
    )
  }
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: 12,
    border: "none",
    borderRadius: 10,
    background: "#3b82f6",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
  }}
>
  {openHistoryId === item.id
    ? "🔽 詳細を閉じる"
    : "👁 詳細を見る"}
</button>
      {openHistoryId === item.id &&
  (item.players || []).map((player, idx) => {
        const improved =
          Number(player.actualScore || 0) -
          Number(player.improveStrokes || 0);

        const diff =
          improved - Number(player.targetScore || 0);

        return (
          <div
            key={idx}
            style={{
              padding: 10,
              marginTop: 8,
              borderRadius: 10,
              background: "#f8fafc",
              fontWeight: 800,
            }}
          >
            <div style={{ fontWeight: 900 }}>
              {player.name}
            </div>

            <div style={{ marginTop: 4 }}>
              申告 {player.targetScore}　
              実スコア {player.actualScore}
            </div>

            <div style={{ marginTop: 4 }}>
              改善 {player.improveStrokes}打　
              改善後 {improved}　
              差 {diff > 0 ? "+" : ""}
              {diff}
            </div>
          </div>
        );
      })}
<button
  onClick={() => shareHonestResult(item)}
  style={{
    width: "100%",
    marginTop: 12,
    padding: 10,
    border: "none",
    borderRadius: 10,
    background: "#22c55e",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
  }}
>
  📋 共有
</button>
      <button
        onClick={() => deleteHonestHistory(item.id)}
        style={{
          width: "100%",
          marginTop: 12,
          padding: 10,
          border: "none",
          borderRadius: 10,
          background: "#ef4444",
          color: "#fff",
          fontWeight: 900,
          cursor: "pointer",
        }}
      >
        🗑 この履歴を削除
      </button>
    </div>
  ))
)}
    </div>
  );
}