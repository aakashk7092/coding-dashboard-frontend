import LeetCodeStats from "./LeetCodeStats";

export default function PlatformDetails({ platform }) {
  if (!platform) {
    return (
      <div
        style={{
          padding: "24px",
          borderRadius: "16px",
          background: "#020617",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#94a3b8",
        }}
      >
        Click a platform to view detailed stats
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "26px",
        borderRadius: "18px",
        background: "linear-gradient(135deg, #020617, #0f172a)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h2 style={{ color: "white" }}>{platform.name}</h2>

      <p style={{ color: "#9ca3af", marginBottom: "18px" }}>
        {platform.about}
      </p>

      {/* ONLY LeetCode shows stats */}
      {platform.id === "leetcode" && <LeetCodeStats />}

      {/* Visit Profile works for all */}
      <a
        href={platform.link}
        target="_blank"
        rel="noreferrer"
        style={{
          color: "#38bdf8",
          marginTop: "16px",
          display: "inline-block",
        }}
      >
        Visit Profile →
      </a>
    </div>
  );
}
