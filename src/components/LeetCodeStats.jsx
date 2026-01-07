import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "./StatCard";

export default function LeetCodeStats() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://coding-dashboard-backend-4sqp.onrender.com/api/leetcode")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("LeetCode API error:", err);
        setError("Failed to load LeetCode stats");
      });
  }, []);

  if (error) {
    return <p style={{ color: "#f87171" }}>{error}</p>;
  }

  if (!data) {
    return <p style={{ color: "#94a3b8" }}>Loading LeetCode stats…</p>;
  }

  const solved = data.solved;

  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          marginBottom: 22,
        }}
      >
        <StatCard title="Total Solved" value={solved.total} />
      </div>

      <div>
        <DifficultyRow
          label="Easy"
          solved={solved.easy}
          total={solved.total}
          color="#22c55e"
        />
        <DifficultyRow
          label="Medium"
          solved={solved.medium}
          total={solved.total}
          color="#facc15"
        />
        <DifficultyRow
          label="Hard"
          solved={solved.hard}
          total={solved.total}
          color="#ef4444"
        />
      </div>
    </div>
  );
}

function DifficultyRow({ label, solved, total, color }) {
  const percent = total > 0 ? ((solved / total) * 100).toFixed(1) : 0;

  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          color: "#e5e7eb",
          marginBottom: 6,
        }}
      >
        <span>{label}</span>
        <span>
          {solved} / {total}
        </span>
      </div>

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
            width: `${percent}%`,
            height: "100%",
            background: color,
          }}
        />
      </div>
    </div>
  );
}
