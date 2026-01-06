import { useEffect, useState } from "react";
import axios from "axios";
import "./GitHubRepos.css";

export default function GitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [showRepos, setShowRepos] = useState(false);

  useEffect(() => {
    axios
      .get("https://coding-dashboard-backend-4sqp.onrender.com/")
      .then((res) => setRepos(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="github-repos">
      {/* Toggle Button */}
      <button
        className="repo-toggle-btn"
        onClick={() => setShowRepos(!showRepos)}
      >
        {showRepos ? "Hide Repositories" : "View Repositories"}
      </button>

      {/* Repo Grid */}
      {showRepos && (
        <div className="repo-grid">
          {repos.map((repo) => (
            <div key={repo.id} className="repo-card">
              <h4>{repo.name}</h4>

              <p>{repo.description || "No description"}</p>

              {repo.language && (
                <span className="repo-lang">{repo.language}</span>
              )}

              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                View Repo →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
