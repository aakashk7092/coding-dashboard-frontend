import { Link } from "react-router-dom";
import "./Achievements.css";

import leetcodeIcon from "../assets/leetcode.png";
import linkedinIcon from "../assets/linkedin.png";
import unstopIcon from "../assets/unstop.png";
import githubIcon from "../assets/github.png";

export default function Achievements() {
  return (
    <Link to="/achievements" className="achievements-link">
      <div className="achievements-card">
        <h2>Achievements</h2>

        <p className="achievements-sub">
          View all my achievements, badges & certificates.
        </p>

        <div className="achievements-preview">
          <div className="ach-badge">
            <img src={leetcodeIcon} alt="LeetCode" />
            <span>LeetCode</span>
          </div>

          <div className="ach-badge">
            <img src={linkedinIcon} alt="LinkedIn" />
            <span>LinkedIn</span>
          </div>

          <div className="ach-badge">
            <img src={unstopIcon} alt="Unstop" />
            <span>Unstop</span>
          </div>

          <div className="ach-badge">
            <img src={githubIcon} alt="Certificates" />
            <span>Certificates</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
