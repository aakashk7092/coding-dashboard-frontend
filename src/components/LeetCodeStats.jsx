import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "./StatCard";

export default function LeetCodeStats() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://coding-dashboard-backend-4sqp.onrender.com/")
      .then((res) => setData(res.data))
      .catch((err) => console.error("LeetCode API error:", err));
  }, []);

  if (!data) {
    return <p style={{ color: "#94a3b8" }}>Loading LeetCode stats…</p>;
  }

  return (
    <div style={{ marginTop: 20 }}>
      {/* TOP SUMMARY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          marginBottom: 22,
        }}
      >
        <StatCard title="Total Solved" value={data.totalSolved} />
        <StatCard
          title="Acceptance"
          value={
            typeof data.acceptanceRate === "string"
              ? data.acceptanceRate
              : `${data.acceptanceRate}%`
          }
        />
      </div>

      {/* DIFFICULTY WISE (REAL) */}
      <div>
        <DifficultyRow
          label="Easy"
          solved={data.easySolved}
          total={data.totalEasy}
          color="#22c55e"
        />
        <DifficultyRow
          label="Medium"
          solved={data.mediumSolved}
          total={data.totalMedium}
          color="#facc15"
        />
        <DifficultyRow
          label="Hard"
          solved={data.hardSolved}
          total={data.totalHard}
          color="#ef4444"
        />
      </div>
    </div>
  );
}

/* -------- Helper component -------- */
function DifficultyRow({ label, solved, total, color }) {
  const percent = ((solved / total) * 100).toFixed(1);

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
