import { useState } from "react";
import { Link } from "react-router-dom";
import "./AchievementsPage.css";

import leetcodeIcon from "../assets/leetcode.png";
import linkedinIcon from "../assets/linkedin.png";
import unstopIcon from "../assets/unstop.png";
import githubIcon from "../assets/github.png";

export default function AchievementsPage() {
  const [open, setOpen] = useState(null);

  const toggle = (key) => {
    setOpen(open === key ? null : key);
  };

  return (
    <div className="ach-page">
      {/* BACK BUTTON */}
      <div className="back-wrap">
        <Link to="/" className="back-btn">← Back to Dashboard</Link>
      </div>

      {/* HERO */}
      <section className="ach-hero">
        <h1>Achievements</h1>
        <p>
          My growth across coding platforms, competitions,
          professional networks and certifications.
        </p>
      </section>

      {/* LIST */}
      <section className="ach-list">

        {/* LeetCode */}
        <div className={`ach-item ${open === "leetcode" ? "open" : ""}`}>
          <div className="ach-head" onClick={() => toggle("leetcode")}>
            <img src={leetcodeIcon} alt="LeetCode" />
            <h2>LeetCode</h2>
            <span>{open === "leetcode" ? "−" : "+"}</span>
          </div>
          <div className="ach-body">
            <ul>
              <li>Solved 550+ DSA problems</li>
              <li>Completed LeetCode 75 Challenge</li>
              <li>Earned multiple skill badges</li>
            </ul>
          </div>
        </div>

        {/* LinkedIn */}
        <div className={`ach-item ${open === "linkedin" ? "open" : ""}`}>
          <div className="ach-head" onClick={() => toggle("linkedin")}>
            <img src={linkedinIcon} alt="LinkedIn" />
            <h2>LinkedIn</h2>
            <span>{open === "linkedin" ? "−" : "+"}</span>
          </div>
          <div className="ach-body">
            <ul>
              <li>Consistent technical posts</li>
              <li>Growing professional network</li>
              <li>Strong personal brand</li>
            </ul>
          </div>
        </div>

        {/* Unstop */}
        <div className={`ach-item ${open === "unstop" ? "open" : ""}`}>
          <div className="ach-head" onClick={() => toggle("unstop")}>
            <img src={unstopIcon} alt="Unstop" />
            <h2>Unstop</h2>
            <span>{open === "unstop" ? "−" : "+"}</span>
          </div>
          <div className="ach-body">
            <ul>
              <li>Participated in hackathons</li>
              <li>Shortlisted in coding contests</li>
              <li>Active competitive profile</li>
            </ul>
          </div>
        </div>

        {/* Certificates */}
        <div className={`ach-item ${open === "certs" ? "open" : ""}`}>
          <div className="ach-head" onClick={() => toggle("certs")}>
            <img src={githubIcon} alt="Certificates" />
            <h2>Certificates</h2>
            <span>{open === "certs" ? "−" : "+"}</span>
          </div>
          <div className="ach-body">
            <ul>
              <li>DSA & Algorithms Certification</li>
              <li>Full-Stack Web Development</li>
              <li>Git & GitHub Mastery</li>
            </ul>
          </div>
        </div>

      </section>
    </div>
  );
}
