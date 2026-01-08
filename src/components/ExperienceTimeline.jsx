import "./ExperienceTimeline.css";
import { Link } from "react-router-dom";

export default function ExperienceTimeline() {
  return (
    <Link to="/experience" className="exp-preview-link">
      <div className="exp-preview-card">

        {/* HEADER */}
        <h2>Experience & Journey</h2>
        <p className="exp-preview-sub">
          My learning path, growth & milestones in tech.
        </p>

        {/* TAGS */}
        <div className="exp-preview-items">
          <div className="exp-chip">
            <span className="dot green"></span>
            <span>Full-Stack Learning</span>
          </div>

          <div className="exp-chip">
            <span className="dot blue"></span>
            <span>DSA & Competitive Programming</span>
          </div>

          <div className="exp-chip">
            <span className="dot purple"></span>
            <span>Started Coding Journey</span>
          </div>
        </div>

        {/* 📈 GROWTH GRAPH */}
        <div className="growth-box">
          <span className="growth-title">Growth Over Time</span>

          <div className="growth-chart">
            <div className="bar" style={{ "--h": "35%" }}></div>
            <div className="bar" style={{ "--h": "55%" }}></div>
            <div className="bar" style={{ "--h": "72%" }}></div>
            <div className="bar" style={{ "--h": "90%" }}></div>
          </div>

          <div className="growth-labels">
            <span>2022</span>
            <span>2023</span>
            <span>2024</span>
            <span>2025</span>
          </div>
        </div>

        <span className="exp-explore">Explore →</span>
      </div>
    </Link>
  );
}
