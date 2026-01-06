import LeetCodeStats from "./LeetCodeStats";
import GitHubLanguages from "./GitHubLanguages";
import GitHubRepos from "./GitHubRepos";

export default function PlatformDetails({ platform }) {
  if (!platform) {
    return (
      <div className="glass-card glass-empty">
        <h3>📊 Platform Overview</h3>
        <p>Click a platform above to view real stats & insights</p>
      </div>
    );
  }

  return (
    <div className="glass-card">
      {/* HEADER */}
      <div className="glass-header">
        <h2>{platform.name}</h2>
        <p>{platform.about}</p>
      </div>

      {/* ================= LEETCODE ================= */}
      {platform.id === "leetcode" && (
        <div className="platform-section">
          <LeetCodeStats />
        </div>
      )}

      {/* ================= GITHUB ================= */}
      {platform.id === "github" && (
        <div className="platform-section">
          <GitHubLanguages />

          <h3 style={{ marginTop: 28 }}>Repositories</h3>
          <GitHubRepos />
        </div>
      )}

      {/* ================= VISIT PROFILE ================= */}
      {platform.link && (
        <a
          href={platform.link}
          target="_blank"
          rel="noreferrer"
          className="visit-btn"
        >
          Visit Profile →
        </a>
      )}
    </div>
  );
}
