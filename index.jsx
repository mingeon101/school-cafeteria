import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const FOODS = ["밥", "국", "김치", "반찬", "우유", "디저트"];
const FOOD_EMOJIS = ["🍚", "🍲", "🥬", "🥘", "🥛", "🍮"];

const theme = {
  primary: "#FF6B35",
  secondary: "#F7C59F",
  accent: "#1A1A2E",
  bg: "#FFF8F3",
  card: "#FFFFFF",
  muted: "#8B7355",
  success: "#4CAF50",
  danger: "#E53935",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Space+Grotesk:wght@400;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${theme.bg};
    font-family: 'Noto Sans KR', sans-serif;
    min-height: 100vh;
  }

  .app {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
  }

  .header {
    background: ${theme.accent};
    color: white;
    padding: 20px 24px 16px;
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 20px rgba(26,26,46,0.3);
  }

  .header-logo {
    font-size: 28px;
    line-height: 1;
  }

  .header-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.3px;
  }

  .header-sub {
    font-size: 11px;
    opacity: 0.5;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 1px;
  }

  .user-bar {
    background: ${theme.accent};
    padding: 0 24px 16px;
    color: white;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .user-avatar {
    width: 36px;
    height: 36px;
    background: ${theme.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .user-name {
    font-size: 14px;
    font-weight: 500;
  }

  .user-sub {
    font-size: 12px;
    opacity: 0.55;
    margin-top: 1px;
  }

  .content {
    padding: 20px 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .card {
    background: ${theme.card};
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.04);
  }

  .card-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${theme.muted};
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .page-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: 14px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    outline: none;
    letter-spacing: -0.2px;
  }

  .btn-primary {
    background: ${theme.primary};
    color: white;
    box-shadow: 0 4px 16px rgba(255,107,53,0.35);
  }

  .btn-primary:hover {
    background: #e85a26;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(255,107,53,0.45);
  }

  .btn-primary:active { transform: translateY(0); }

  .btn-secondary {
    background: #f0ebe5;
    color: ${theme.accent};
  }

  .btn-secondary:hover { background: #e8e0d8; }

  .btn-danger {
    background: #ffeaea;
    color: ${theme.danger};
  }

  .btn-danger:hover { background: #ffd6d6; }

  .btn-sm {
    padding: 10px 16px;
    font-size: 14px;
    border-radius: 10px;
  }

  .btn-count {
    width: 48px;
    height: 48px;
    padding: 0;
    border-radius: 12px;
    background: #f5f0eb;
    color: ${theme.accent};
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
    border: none;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-count:hover { background: ${theme.secondary}; }
  .btn-count.active { background: ${theme.primary}; color: white; }

  /* Video */
  .video-wrap {
    width: 100%;
    aspect-ratio: 4/3;
    background: ${theme.accent};
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
  }

  .video-wrap video {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }

  .scan-line {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: ${theme.primary};
    opacity: 0.85;
    animation: scanDown 2s ease-in-out infinite;
  }

  .scan-corners {
    position: absolute;
    top: 12px; left: 12px; right: 12px; bottom: 12px;
    pointer-events: none;
  }

  .scan-corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: ${theme.primary};
    border-style: solid;
    opacity: 0.9;
  }

  .sc-tl { top: 0; left: 0; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
  .sc-tr { top: 0; right: 0; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
  .sc-bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
  .sc-br { bottom: 0; right: 0; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }

  @keyframes scanDown {
    0% { top: 0; }
    50% { top: calc(100% - 3px); }
    100% { top: 0; }
  }

  /* Big text */
  .hero-text {
    font-size: 32px;
    font-weight: 900;
    color: ${theme.accent};
    letter-spacing: -1px;
    line-height: 1.1;
  }

  .hero-sub {
    font-size: 15px;
    color: ${theme.muted};
    margin-top: 8px;
    line-height: 1.6;
  }

  /* Food step indicator */
  .food-steps {
    display: flex;
    gap: 6px;
    justify-content: center;
    margin-bottom: 20px;
  }

  .food-step {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #f0ebe5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    transition: all 0.3s;
  }

  .food-step.done { background: #d4edda; }
  .food-step.current { background: ${theme.primary}; transform: scale(1.2); box-shadow: 0 3px 12px rgba(255,107,53,0.4); }

  /* Count display */
  .count-display {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 72px;
    font-weight: 700;
    color: ${theme.accent};
    line-height: 1;
    letter-spacing: -3px;
    margin: 16px 0;
  }

  .count-label {
    font-size: 13px;
    color: ${theme.muted};
    margin-bottom: 24px;
  }

  /* Count grid */
  .count-grid {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  /* Progress */
  .progress-bar-wrap {
    background: #f0ebe5;
    border-radius: 100px;
    height: 10px;
    overflow: hidden;
    margin: 16px 0 8px;
  }

  .progress-bar-fill {
    height: 100%;
    background: ${theme.primary};
    border-radius: 100px;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Summary list */
  .summary-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #f5f0eb;
  }

  .summary-item:last-child { border-bottom: none; }

  .summary-emoji {
    width: 40px;
    height: 40px;
    background: #fff8f3;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }

  .summary-name {
    flex: 1;
    font-weight: 500;
    font-size: 15px;
  }

  .summary-count {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: ${theme.primary};
  }

  /* Chart legend */
  .legend {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: ${theme.muted};
  }

  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* Confirm user card */
  .confirm-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #fff8f3;
    border: 2px solid ${theme.secondary};
    border-radius: 16px;
    padding: 16px 24px;
    margin: 20px 0;
  }

  .confirm-avatar-lg {
    width: 52px;
    height: 52px;
    background: ${theme.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  /* Menu chips */
  .menu-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 4px;
  }

  .menu-chip {
    background: #fff8f3;
    border: 1.5px solid ${theme.secondary};
    color: ${theme.accent};
    border-radius: 100px;
    padding: 6px 14px;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  /* Comment box */
  .comment-box {
    background: linear-gradient(135deg, #fff8f3, #fff0e8);
    border-left: 4px solid ${theme.primary};
    border-radius: 0 12px 12px 0;
    padding: 14px 16px;
    font-size: 14px;
    color: ${theme.accent};
    line-height: 1.7;
  }

  /* Complete */
  .complete-icon {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, ${theme.primary}, #ff9a62);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    margin: 0 auto 24px;
    box-shadow: 0 12px 40px rgba(255,107,53,0.4);
    animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes pop {
    from { transform: scale(0); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  /* Input */
  .styled-input {
    border: 2px solid #e8e0d8;
    border-radius: 12px;
    padding: 12px 16px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: ${theme.accent};
    text-align: center;
    width: 120px;
    outline: none;
    transition: border-color 0.2s;
  }

  .styled-input:focus { border-color: ${theme.primary}; }

  /* Fade in */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-up { animation: fadeUp 0.4s ease forwards; }
`;

export default function App() {
  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <Header />
        <Main />
      </div>
    </>
  );
}

function Header() {
  return (
    <div className="header">
      <div className="header-logo">🍱</div>
      <div>
        <div className="header-title">스마트 급식 시스템</div>
        <div className="header-sub">Smart Cafeteria</div>
      </div>
    </div>
  );
}

function Main() {
  const [page, setPage] = React.useState("recognition");
  const [counts, setCounts] = React.useState(Array(6).fill(0));
  const [user, setUser] = React.useState(null);

  return (
    <>
      <UserBar user={user} />
      <div className="content">
        {page === "recognition" && (
          <RecognitionPage onRecognized={(u) => { setUser(u); setPage("confirm"); }} />
        )}
        {page === "confirm" && (
          <ConfirmPage user={user} onYes={() => setPage("dashboard")} onNo={() => setPage("recognition")} />
        )}
        {page === "dashboard" && (
          <Dashboard onStart={() => setPage("serve")} user={user} />
        )}
        {page === "serve" && (
          <ServePage setCounts={setCounts} onDone={() => setPage("progress")} />
        )}
        {page === "progress" && (
          <ProgressPage counts={counts} onDone={() => setPage("complete")} />
        )}
        {page === "complete" && (
          <CompletePage onReset={() => { setPage("recognition"); setUser(null); setCounts(Array(6).fill(0)); }} />
        )}
      </div>
    </>
  );
}

function UserBar({ user }) {
  return (
    <div className="user-bar">
      <div className="user-avatar">👤</div>
      {user ? (
        <div>
          <div className="user-name">{user.name}</div>
          <div className="user-sub">{user.grade}학년 {user.classNum}반 {user.number}번</div>
        </div>
      ) : (
        <div>
          <div className="user-name">사용자 인식 중</div>
          <div className="user-sub">카메라를 바라봐 주세요</div>
        </div>
      )}
    </div>
  );
}

function RecognitionPage({ onRecognized }) {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => { if (videoRef.current) videoRef.current.srcObject = stream; })
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onRecognized({ grade: 1, classNum: 2, number: 10, name: "홍길동" });
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="card fade-up page-center">
      <div className="card-title">🔍 안면 인식</div>
      <div className="video-wrap">
        <video ref={videoRef} autoPlay muted />
        <div className="scan-line" />
        <div className="scan-corners">
          <div className="scan-corner sc-tl" />
          <div className="scan-corner sc-tr" />
          <div className="scan-corner sc-bl" />
          <div className="scan-corner sc-br" />
        </div>
      </div>
      <div className="hero-text">인식 중...</div>
      <div className="hero-sub">카메라를 정면으로 바라봐 주세요.<br />잠시 기다리면 자동으로 인식됩니다.</div>
    </div>
  );
}

function ConfirmPage({ user, onYes, onNo }) {
  if (!user) return null;
  return (
    <div className="card fade-up page-center">
      <div className="card-title">✅ 사용자 확인</div>
      <div className="hero-text" style={{ fontSize: 24 }}>이 학생이 맞나요?</div>
      <div className="confirm-badge">
        <div className="confirm-avatar-lg">😊</div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#1A1A2E" }}>{user.name}</div>
          <div style={{ fontSize: 14, color: "#8B7355", marginTop: 2 }}>{user.grade}학년 {user.classNum}반 {user.number}번</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn btn-primary" onClick={onYes}>맞아요 👍</button>
        <button className="btn btn-danger" onClick={onNo}>아니에요</button>
      </div>
    </div>
  );
}

function Dashboard({ onStart, user }) {
  const data = [
    { name: "밥류", value: 4 },
    { name: "국류", value: 2 },
    { name: "반찬류", value: 3 },
  ];
  const COLORS = ["#FF6B35", "#F7C59F", "#1A1A2E"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="fade-up">
      <div className="card">
        <div className="card-title">🍽️ 오늘의 메뉴</div>
        <div className="menu-chips">
          {[["🍚","밥"],["🍲","국"],["🥬","김치"],["🥛","우유"]].map(([e,n]) => (
            <div className="menu-chip" key={n}>{e} {n}</div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">📊 식습관 현황</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <PieChart width={220} height={220}>
            <Pie data={data} dataKey="value" outerRadius={88} innerRadius={44}
              labelLine={false}
              label={(props) => {
                const RADIAN = Math.PI / 180;
                const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
                const r = innerRadius + (outerRadius - innerRadius) * 0.55;
                return (
                  <text x={cx + r * Math.cos(-midAngle * RADIAN)}
                    y={cy + r * Math.sin(-midAngle * RADIAN)}
                    fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
                    {(percent * 100).toFixed(0)}%
                  </text>
                );
              }}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
          </PieChart>
          <div className="legend">
            {data.map((d, i) => (
              <div className="legend-item" key={i}>
                <div className="legend-dot" style={{ backgroundColor: COLORS[i] }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">💬 오늘의 코멘트</div>
        <div className="comment-box">오늘은 국을 조금 더 먹어보는 건 어때요? 국에는 영양소가 가득해요!</div>
      </div>

      <button className="btn btn-primary" style={{ width: "100%" }} onClick={onStart}>
        배식 시작하기 →
      </button>
    </div>
  );
}

function ServePage({ onDone, setCounts }) {
  const videoRef = React.useRef(null);
  const [step, setStep] = React.useState(0);
  const [countsLocal, setLocalCounts] = React.useState(Array(6).fill(0));
  const [customMode, setCustomMode] = React.useState(false);
  const [customValue, setCustomValue] = React.useState("");

  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => { if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); } })
      .catch(() => {});
  }, []);

  const update = (val) => {
    const copy = [...countsLocal];
    copy[step] = val;
    setLocalCounts(copy);
    setCounts(copy);
  };

  const nextStep = () => {
    if (step < FOODS.length - 1) {
      setStep(step + 1);
      setCustomMode(false);
      setCustomValue("");
    } else {
      onDone();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="fade-up">
      <div className="card">
        <div className="food-steps">
          {FOODS.map((_, i) => (
            <div key={i} className={`food-step ${i < step ? "done" : i === step ? "current" : ""}`}>
              {i < step ? "✓" : FOOD_EMOJIS[i]}
            </div>
          ))}
        </div>
        <div className="video-wrap">
          <video ref={videoRef} autoPlay playsInline muted />
        </div>
      </div>

      <div className="card page-center">
        <div className="card-title">🥢 배식 횟수 선택</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#1A1A2E", marginBottom: 4 }}>
          {FOOD_EMOJIS[step]} {FOODS[step]}
        </div>

        {!customMode ? (
          <>
            <div className="count-display">{countsLocal[step]}</div>
            <div className="count-label">회 배식</div>
            <div className="count-grid">
              {[0, 1, 2, 3].map((n) => (
                <button key={n} className={`btn-count ${countsLocal[step] === n ? "active" : ""}`} onClick={() => update(n)}>{n}</button>
              ))}
              <button className="btn-count" style={{ background: "#e8f5e9", color: "#388e3c", fontSize: 20 }}
                onClick={() => update(countsLocal[step] + 1)}>+</button>
              <button className="btn-count" style={{ background: "#fff3e0", color: "#f57c00", fontSize: 12, fontWeight: 700 }}
                onClick={() => setCustomMode(true)}>직접</button>
            </div>
          </>
        ) : (
          <div style={{ margin: "16px 0" }}>
            <div style={{ fontSize: 13, color: "#8B7355", marginBottom: 10 }}>직접 입력</div>
            <input
              type="number"
              className="styled-input"
              value={customValue}
              onChange={(e) => { setCustomValue(e.target.value); update(Number(e.target.value)); }}
              placeholder="0"
              autoFocus
            />
          </div>
        )}

        <button className="btn btn-primary" style={{ width: "100%", marginTop: 8 }} onClick={nextStep}>
          {step === FOODS.length - 1 ? "배식 완료 ✓" : "다음 →"}
        </button>
      </div>
    </div>
  );
}

function ProgressPage({ onDone, counts }) {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    if (step < 6) {
      const t = setTimeout(() => setStep(s => s + 1), 900);
      return () => clearTimeout(t);
    } else {
      setTimeout(onDone, 500);
    }
  }, [step]);

  return (
    <div className="card fade-up page-center">
      <div className="card-title">🍚 배식 진행 중</div>
      <div className="progress-bar-wrap" style={{ width: "100%", marginBottom: 24 }}>
        <div className="progress-bar-fill" style={{ width: `${(step / 6) * 100}%` }} />
      </div>

      <div style={{ width: "100%" }}>
        {FOODS.map((food, i) => (
          <div className="summary-item" key={i} style={{ opacity: i < step ? 1 : 0.3, transition: "opacity 0.4s" }}>
            <div className="summary-emoji">{FOOD_EMOJIS[i]}</div>
            <div className="summary-name">{food}</div>
            {i < step && <div className="summary-count">{counts[i]}회</div>}
            {i === step && <div style={{ fontSize: 18, animation: "spin 1s linear infinite" }}>⏳</div>}
          </div>
        ))}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function CompletePage({ onReset }) {
  return (
    <div className="card fade-up page-center">
      <div className="complete-icon">✅</div>
      <div className="hero-text">배식 완료!</div>
      <div className="hero-sub" style={{ marginBottom: 32 }}>오늘도 맛있게 드세요. 😊<br />건강한 급식 생활을 응원합니다!</div>
      <button className="btn btn-secondary" onClick={onReset}>처음으로 돌아가기</button>
    </div>
  );
}
