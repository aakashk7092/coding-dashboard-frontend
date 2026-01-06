export default function RepoCard({ repo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className="repo-card"
    >
      <h4>{repo.name}</h4>

      <p>{repo.description || "No description available"}</p>

      <div className="repo-footer">
        <span>{repo.language || "Unknown"}</span>
        <span>⭐ {repo.stars}</span>
      </div>
    </a>
  );
}
