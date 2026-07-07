export default function PlayerName({
  player,
  idx,
  savedNames,
  updatePlayer,
  savePlayerName,
}) {
  return (
    <>
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
    </>
  );
}