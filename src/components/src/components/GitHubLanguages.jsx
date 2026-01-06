export default function GitHubLanguages() {
  const languages = [
    { name: "C++", percent: 40, color: "#f34b7d" },
    { name: "Java", percent: 20, color: "#b07219" },
    { name: "Python", percent: 15, color: "#3572A5" },
    { name: "JavaScript", percent: 15, color: "#f1e05a" },
    { name: "SQL", percent: 10, color: "#e38c00" },
  ];

  return (
    <div style={{ marginTop: "20px" }}>
      <h3 style={{ color: "white", marginBottom: "12px" }}>
        GitHub Language Usage
      </h3>

      {languages.map((lang) => (
        <div key={lang.name} style={{ marginBottom: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#c9d1d9",
              fontSize: "14px",
            }}
          >
            <span>{lang.name}</span>
            <span>{lang.percent}%</span>
          </div>

          <div
            style={{
              height: "8px",
              background: "#21262d",
              borderRadius: "6px",
              overflow: "hidden",
              marginTop: "4px",
            }}
          >
            <div
              style={{
                width: `${lang.percent}%`,
                height: "100%",
                background: lang.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
