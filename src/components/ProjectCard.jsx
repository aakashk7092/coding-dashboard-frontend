export default function ProjectCard({ project }) {
  return (
    <div
      style={{
        background: "#161b22",
        padding: "16px",
        borderRadius: "8px",
        border: "1px solid #30363d"
      }}
    >
      <h3 style={{ color: "white", marginBottom: "6px" }}>
        {project.name}
      </h3>

      <p style={{ color: "#9ca3af", fontSize: "14px" }}>
        {project.description}
      </p>

      <div style={{ marginTop: "8px" }}>
        {project.tech.map(t => (
          <span
            key={t}
            style={{
              display: "inline-block",
              background: "#0d1117",
              color: "#58a6ff",
              padding: "4px 8px",
              marginRight: "6px",
              marginTop: "4px",
              fontSize: "12px",
              borderRadius: "4px"
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div style={{ marginTop: "12px" }}>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#58a6ff", marginRight: "12px" }}
        >
          GitHub →
        </a>

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#22c55e" }}
          >
            Live →
          </a>
        )}
      </div>
    </div>
  );
}
