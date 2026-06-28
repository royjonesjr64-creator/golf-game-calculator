import { useEffect, useState } from "react";

export default function GameCalculator() {
  const [players, setPlayers] = useState([
    { name: "プレイヤー1", point: 0 },
    { name: "プレイヤー2", point: 0 },
    { name: "プレイヤー3", point: 0 },
    { name: "プレイヤー4", point: 0 },
  ]);
const addPlayer = () => {
  setPlayers([
    ...players,
    {
      name: `プレイヤー${players.length + 1}`,
      point: 0,
    },
  ]);
};

const removePlayer = () => {
  if (players.length <= 2) return;

  setPlayers(players.slice(0, -1));
};
const [pointValue, setPointValue] = useState(100);
const [currency, setCurrency] = useState("円"); 
const [savedNames, setSavedNames] = useState([]);
const [gameHistory, setGameHistory] = useState([]);
const [holeEvents, setHoleEvents] = useState([
  {
    hole: 1,
    nearest: "",
    longDrive: "",
    birdie: "",
    sandSave: "",
    sandZero: "",
  },
]);
const eventList = [
  {
    name: "バーディ",
    point: 3,
    desc: "パーより1打少ないスコア",
  },
  {
    name: "イーグル",
    point: 30,
    desc: "パーより2打少ないスコア",
  },
  {
    name: "アルバ",
    point: 50,
    desc: "パーより3打少ないスコア",
  },
  {
    name: "HIO",
    point: 100,
    desc: "ホールインワン",
  },
  {
    name: "砂一",
    point: 3,
    desc: "バンカーから出して1パットで上がる",
  },
  {
    name: "砂ゼロ",
    point: 8,
    desc: "バンカーから直接カップイン",
  },
  {
    name: "ダイヤ",
    point: 5,
    desc: "そのホールで単独の一番良いスコア",
  },
];
const deleteSavedName = (nameToDelete) => {
  const updated = savedNames.filter(
    (name) => name !== nameToDelete
  );

  setSavedNames(updated);

  localStorage.setItem(
    "savedPlayers",
    JSON.stringify(updated)
  );
};

useEffect(() => {
  const saved = JSON.parse(
    localStorage.getItem("savedPlayers") || "[]"
  );

  setSavedNames(saved);
}, []);

useEffect(() => {
  const lastPlayers = JSON.parse(
    localStorage.getItem("lastPlayers") || "null"
  );

  if (lastPlayers && lastPlayers.length > 0) {
    setPlayers(lastPlayers);
  }
}, []);

useEffect(() => {
  const savedHistory = JSON.parse(
    localStorage.getItem("gameHistory") || "[]"
  );

  setGameHistory(savedHistory);
}, []);const updatePlayer = (idx, key, value) => {
  const copy = [...players];
  copy[idx][key] = value;

  setPlayers(copy);

  localStorage.setItem(
    "lastPlayers",
    JSON.stringify(copy)
  );
};

const savePlayerName = (name) => {
  const cleanName = name.trim();

  if (cleanName === "") return;

  const updatedNames = Array.from(
    new Set([...savedNames, cleanName])
  );

  setSavedNames(updatedNames);

  localStorage.setItem(
    "savedPlayers",
    JSON.stringify(updatedNames)
  );
};
const buttonStyle = {
  padding: "10px 12px",
  border: "none",
  borderRadius: 12,
  fontWeight: 700,
  cursor: "pointer",
};
const resetGame = () => {
  const resetPlayers = players.map((player) => ({
    ...player,
    point: 0,
  }));

  setPlayers(resetPlayers);

  localStorage.setItem(
    "lastPlayers",
    JSON.stringify(resetPlayers)
  );
};
const buttonBase = {
  width: "100%",
  padding: 14,
  border: "none",
  borderRadius: 12,
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  boxSizing: "border-box",
};
const shareResult = async () => {
  const text = players
    .map((player, idx) => {
      const total =
        player.point * (players.length - 1) -
        players.reduce(
          (sum, p, pIdx) =>
            pIdx === idx ? sum : sum + Number(p.point || 0),
          0
        );

      return `${player.name}：${player.point}pt / ${total > 0 ? "+" : ""}${currency} ${(
        total * pointValue
      ).toLocaleString()}`;
    })
    .join("\n");

  const shareText = `ゴルフゲーム清算\n\n${text}`;

  if (navigator.share) {
    await navigator.share({
      text: shareText,
    });
  } else {
    await navigator.clipboard.writeText(shareText);
    alert("清算結果をコピーしました");
  }
};
const saveHistory = () => {
  const historyItem = {
    date: new Date().toLocaleString(),
    players: [...players],
    pointValue,
    currency,
  };

  const updatedHistory = [historyItem, ...gameHistory];

  setGameHistory(updatedHistory);

  localStorage.setItem(
    "gameHistory",
    JSON.stringify(updatedHistory)
  );

  alert("履歴を保存しました");
};
const [showEventPopup, setShowEventPopup] = useState(false);

const winner = [...players].sort(
  (a, b) => Number(b.point || 0) - Number(a.point || 0)
)[0];
  return (
   <div
  style={{
    maxWidth: 900,
    margin: "0 auto",
    padding: 16,
    minHeight: "100vh",
    background: "#f1f5f9",
  }}
>
      <div
  style={{
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    textAlign: "center",
  }}
>
  <div style={{ fontSize: 14, opacity: 0.9 }}>
    GOLF GAME CALCULATOR
  </div>

  <h1 style={{ margin: "8px 0" }}>
    🏆 ゴルフゲーム清算
  </h1>

  <div style={{ fontSize: 13 }}>
    オリンピック・ニアピン・役の清算用
  </div>
</div>

     <div
  style={{
    background: "#fff",
    borderRadius: 20,
    padding: 16,
    marginTop: 12,
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
  }}
>
        <h3>合計ポイント入力</h3>
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
    {savedNames.map((name) => (
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

        <button
          onClick={() => deleteSavedName(name)}
        >
          🗑️
        </button>
      </div>
    ))}
  </div>
</details>

<div
  style={{
    display: "flex",
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
</div>
        {players.map((player, idx) => (
          <div
  key={idx}
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
      {player.point} pt
    </div>
  </div>

  <select
    value=""
    onChange={(e) =>
      updatePlayer(idx, "name", e.target.value)
    }
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
    onChange={(e) =>
      updatePlayer(idx, "name", e.target.value)
    }
    onBlur={() => savePlayerName(player.name)}
    placeholder="新規で名前入力"
    style={{
      width: "100%",
      padding: 8,
      borderRadius: 8,
      border: "1px solid #cbd5e1",
      fontWeight: 700,
      marginBottom: 8,
    }}
  />

  <input
    type="number"
    value={player.point}
    onChange={(e) =>
      updatePlayer(idx, "point", Number(e.target.value))
    }
    placeholder="点数"
    style={{
      width: "100%",
      padding: 10,
      fontSize: 18,
      fontWeight: 900,
      textAlign: "center",
      borderRadius: 8,
      border: "1px solid #cbd5e1",
    }}
  />
</div>
        ))}
<hr style={{ margin: "20px 0" }} />

<h3>ホール別イベント入力（試作）</h3>

<div
  style={{
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
  }}
>
  <div
    style={{
      fontWeight: 800,
      marginBottom: 10,
    }}
  >
    1H
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
    }}
  >
   <select>
  <option value="">ニアピン</option>
  {savedNames.map((name) => (
    <option key={name} value={name}>
      {name}
    </option>
  ))}
</select>

<select>
  <option value="">ドラコン</option>
  {savedNames.map((name) => (
    <option key={name} value={name}>
      {name}
    </option>
  ))}
</select>

<button
  onClick={() => setShowEventPopup(true)}
  style={{
    gridColumn: "1 / -1",
    padding: 10,
    border: "none",
    borderRadius: 10,
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "#fff",
    fontWeight: 800,
  }}
>
  ⭐ 役を見る
</button>
 </div>
</div>
<h3>1pt単価</h3>

<input
  type="number"
  value={pointValue}
  onChange={(e) => setPointValue(Number(e.target.value))}
  style={{
    width: "100%",
    padding: 10,
    marginBottom: 20,
  }}
/>
<select
  value={currency}
  onChange={(e) => setCurrency(e.target.value)}
  style={{
  width: "100%",
  padding: 8,
  borderRadius: 8,
  border: "1px solid #cbd5e1",
  marginBottom: 6,
}}
>
  <option value="円">円</option>
  <option value="Rp">Rp</option>
  <option value="$">$</option>
</select>
<hr style={{ margin: "20px 0" }} />
{winner && (
  <div
    style={{
      background: "#fef3c7",
      border: "1px solid #fbbf24",
      borderRadius: 18,
      padding: 16,
      textAlign: "center",
      marginBottom: 16,
    }}
  >
    <div style={{ fontSize: 14, fontWeight: 700 }}>
      🏆 本日の勝者
    </div>

    <div style={{ fontSize: 26, fontWeight: 900 }}>
      {winner.name}
    </div>

    <div style={{ fontSize: 18, fontWeight: 800 }}>
      {winner.point} pt
    </div>
  </div>
)}
<h3>ランキング</h3>

{[...players]
  .sort((a, b) => b.point - a.point)
  .map((player, idx, sortedPlayers) => {
    const rank =
      idx === 0
        ? 1
        : player.point === sortedPlayers[idx - 1].point
        ? sortedPlayers
            .slice(0, idx)
            .findIndex((p) => p.point === player.point) + 1
        : idx + 1;

    const medal =
      rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "🏌️";

    return (
      <div
        key={`rank-${idx}`}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: 12,
          marginBottom: 8,
        }}
      >
        <div style={{ fontWeight: 800 }}>
          {medal} {rank}位　{player.name}
        </div>

        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: "#2563eb",
          }}
        >
          {player.point} pt
        </div>
      </div>
    );
  })}
<hr style={{ margin: "20px 0" }} />

<h3>清算結果</h3>

{players.map((player, idx) => {
  const total =
    player.point * (players.length - 1) -
    players.reduce(
      (sum, p, pIdx) =>
        pIdx === idx ? sum : sum + Number(p.point || 0),
      0
    );

  return (
    <div
      key={`settlement-${idx}`}
     style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: 14,
  padding: 12,
  marginBottom: 8,
}}
    >
      <span>{player.name}</span>

     <strong
  style={{
    color:
      total > 0
        ? "#16a34a"
        : total < 0
        ? "#dc2626"
        : "#64748b",
  }}
>
        {total > 0 ? "+" : ""}
        {currency} {(total * pointValue).toLocaleString()}
      </strong>
    </div>
  );
})}
<button
  onClick={shareResult}
  style={{
  ...buttonBase,
  marginTop: 20,
  background: "#2563eb",
}}
>
<button
  onClick={saveHistory}
 style={{
  ...buttonBase,
  marginTop: 12,
  background: "#16a34a",
}}
>
  📋 清算結果をコピー
</button>
  💾 履歴を保存
</button>
 
<hr style={{ margin: "20px 0" }} />

<h3>履歴</h3>

{gameHistory.length === 0 ? (
  <p style={{ color: "#64748b" }}>履歴なし</p>
) : (
  gameHistory.map((item, idx) => (
    <div
      key={idx}
      style={{
        background: "#f8fafc",
        color: "#0f172a",
        border: "1px solid #cbd5e1",
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          fontWeight: 900,
          marginBottom: 8,
          color: "#1e293b",
        }}
      >
        {item.date}
      </div>

      {(item.players || []).map((p, pIdx) => (
        <div
          key={pIdx}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "4px 0",
            borderBottom: "1px solid #e2e8f0",
            color: "#0f172a",
          }}
        >
          <span>{p.name}</span>
          <strong>{p.point} pt</strong>
        </div>
      ))}
    </div>
  ))
)}
{showEventPopup && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "#fff",
        width: "90%",
        maxWidth: 500,
        borderRadius: 20,
        padding: 20,
      }}
    >
      <h2>⭐ 役一覧</h2>

      {eventList.map((event) => (
        <div
          key={event.name}
          style={{
            padding: 12,
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div style={{ fontWeight: 800 }}>
            {event.name}（{event.point}pt）
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#64748b",
            }}
          >
            {event.desc}
          </div>
        </div>
      ))}

      <button
        onClick={() => setShowEventPopup(false)}
        style={{
          width: "100%",
          marginTop: 12,
          padding: 12,
          border: "none",
          borderRadius: 12,
          background: "#64748b",
          color: "#fff",
        }}
      >
        閉じる
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
}