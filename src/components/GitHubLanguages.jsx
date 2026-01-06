import { useEffect, useState } from "react";

const COLORS = {
  "C++": "#2563eb",
  Java: "#f97316",
  HTML: "#ef4444",
  CSS: "#3b82f6",
};

export default function GitHubLanguages() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://coding-dashboard-backend-4sqp.onrender.com/")
      .then((res) => res.json())
      .then((json) => {
        const total = Object.values(json).reduce((a, b) => a + b, 0);

        const formatted = Object.entries(json)
          .map(([name, value]) => ({
            name,
            value,
            percent: ((value / total) * 100).toFixed(1),
          }))
          .sort((a, b) => b.value - a.value);

        setData(formatted);
      })
      .catch(console.error);
  }, []);

  if (!data.length) {
    return <p style={{ color: "#94a3b8" }}>Loading GitHub data…</p>;
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h4 style={{ color: "white", marginBottom: 14 }}>
        Language Usage (GitHub)
      </h4>

      {data.map((lang) => (
        <div key={lang.name} style={{ marginBottom: 14 }}>
          {/* Label */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              color: "#e5e7eb",
              marginBottom: 6,
            }}
          >
            <span>{lang.name}</span>
            <span>{lang.percent}%</span>
          </div>

          {/* Bar */}
          <div
            style={{
              height: 8,
              background: "#020617",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${lang.percent}%`,
                height: "100%",
                background: COLORS[lang.name],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
