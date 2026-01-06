import { useState } from "react";
import "./Projects.css";

const projectsData = [
  {
    id: 1,
    title: "Coding Dashboard – Developer Analytics",
    short: "Full-stack dashboard with real LeetCode & GitHub stats.",
    details: [
      "Built a full-stack analytics dashboard to track coding performance",
      "Integrated LeetCode & GitHub APIs for real-time stats",
      "Displayed Easy / Medium / Hard problems, streaks, and language usage",
      "Implemented smooth scrolling & modular React components",
    ],
    tech: "React, JavaScript, Node.js, Express, REST APIs",
    link: "https://github.com/aakashk7092",
  },
  {
    id: 2,
    title: "LeetCode DSA Solutions",
    short: "550+ optimized DSA problems in C++ & Java.",
    details: [
      "Solved 600+ LeetCode problems across all difficulty levels",
      "Focused on time & space optimized solutions",
      "Covered Arrays, DP, Trees, Graphs, Greedy, Bitmasking",
    ],
    tech: "C++, Java, Data Structures, Algorithms",
    link: "https://leetcode.com/u/aakashkumar2005/",
  },
];

export default function Projects({ selectedSkill }) {
  const [openId, setOpenId] = useState(null);

  const toggleProject = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="projects-section">
      <h2 className="projects-title">Projects</h2>

      <div className="projects-grid">
        {projectsData.map((p) => (
          <div key={p.id} className="project-card">
            <h3>{p.title}</h3>
            <p className="project-short">{p.short}</p>

            {openId === p.id && (
              <div className="project-details">
                <ul>
                  {p.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>

                <p className="project-tech">
                  <strong>Tech:</strong> {p.tech}
                </p>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  View Project →
                </a>
              </div>
            )}

            <button
              className="toggle-btn"
              onClick={() => toggleProject(p.id)}
            >
              {openId === p.id ? "Hide Details ▲" : "View Details ▼"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
