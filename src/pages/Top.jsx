import { useNavigate } from "react-router-dom";

export default function Top() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8fafc 0%, #eef4ff 100%)",
        padding: 20,
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: 28,
          padding: 24,
          boxShadow: "0 18px 40px rgba(15,23,42,0.10)"
        }}
      >
       <div
  style={{
    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    color: "#ffffff",
    borderRadius: 24,
    padding: "18px 16px",
    textAlign: "center",
    marginBottom: 22
  }}
>
  <div style={{ fontSize: 13, opacity: 0.9 }}>GOLF GAME CALCULATOR</div>

  <h1
    style={{
      margin: "10px 0",
      fontSize: "clamp(24px, 8vw, 34px)",
      fontWeight: 800,
      textAlign: "center",
      lineHeight: 1.2,
      wordBreak: "keep-all",
      overflowWrap: "normal"
    }}
  >
    ゴルフゲーム計算
  </h1>

  <div
    style={{
      fontSize: "clamp(13px, 4vw, 15px)",
      lineHeight: 1.6,
      wordBreak: "keep-all",
      overflowWrap: "normal"
    }}
  >
    オリンピック・ニアピン・役・貫・清算・共有に特化
  </div>
</div>
<div
  style={{
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    fontWeight: 700,
    lineHeight: 1.8,
  }}
>
  🏆 オリンピック / 🎯 ニアピン / 🚀 ドラコン / ⭐ 役 / 🔥 貫
  <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>
    ポイント入力から清算・共有までまとめて管理
  </div>
</div>
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
  }}
>
          <button style={primaryButton} onClick={() => navigate("/game-calculator")}>
            ゲーム開始
          </button>
<button
  style={{
    ...primaryButton,
    background: "#f59e0b",
  }}
  onClick={() => navigate("/olympic-only")}
>
  🏆 オリンピック計算
</button>
          <button style={secondaryButton} onClick={() => navigate("/history")}>
            ゲーム履歴
          </button>

          <button
            style={secondaryButton}
            onClick={() => navigate("/event-settings")}
          >
            役設定
          </button>

          <button
            style={secondaryButton}
            onClick={() => navigate("/club-settings")}
          >
            ポイント設定
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({ title, text }) {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 18,
        padding: 18,
        background: "#f8fafc"
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ color: "#64748b", fontSize: 14 }}>{text}</div>
    </div>
  );
}

const primaryButton = {
  width: "100%",
  padding: "14px 26px",
  borderRadius: 14,
  border: "none",
  background: "#16a34a",
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
  cursor: "pointer"
};

const secondaryButton = {
  width: "100%",
  padding: "14px 26px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  background: "#fff",
  color: "#0f172a",
  fontWeight: "bold",
  fontSize: 16,
  cursor: "pointer"
};