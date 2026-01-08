import { useState } from "react";
import "./AchievementsPage.css";

import Navbar from "../components/Navbar";   // ✅ ADD NAVBAR

import leetcodeIcon from "../assets/leetcode.png";
import linkedinIcon from "../assets/linkedin.png";
import unstopIcon from "../assets/unstop.png";
import githubIcon from "../assets/github.png";

import LeetCodeBadges from "../components/LeetCodeBadges";

export default function AchievementsPage() {
  const [open, setOpen] = useState(null);

  const toggle = (key) => {
    setOpen(open === key ? null : key);
  };

  return (
    <>
      {/* 🔝 NAVBAR */}
      <Navbar />

      <div className="ach-page">
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

          {/* ========== LEETCODE ========== */}
          <div className={`ach-item ${open === "leetcode" ? "open" : ""}`}>
            <div className="ach-head" onClick={() => toggle("leetcode")}>
              <div className="head-left">
                <img src={leetcodeIcon} alt="LeetCode" />
                <h2>LeetCode</h2>
              </div>
              <span className="toggle">{open === "leetcode" ? "−" : "+"}</span>
            </div>

            <div className="ach-body">
              <ul>
                <li>Solved 550+ DSA problems</li>
                <li>Completed LeetCode 75 Challenge</li>
                <li>Earned multiple skill badges</li>
              </ul>

              {open === "leetcode" && <LeetCodeBadges />}
            </div>
          </div>

          {/* ========== LINKEDIN ========== */}
          <div className={`ach-item ${open === "linkedin" ? "open" : ""}`}>
            <div className="ach-head" onClick={() => toggle("linkedin")}>
              <div className="head-left">
                <img src={linkedinIcon} alt="LinkedIn" />
                <h2>LinkedIn</h2>
              </div>
              <span className="toggle">{open === "linkedin" ? "−" : "+"}</span>
            </div>

            <div className="ach-body">
              <ul>
                <li>Consistent technical posts</li>
                <li>Growing professional network</li>
                <li>Strong personal brand</li>
              </ul>
            </div>
          </div>

          {/* ========== UNSTOP ========== */}
          <div className={`ach-item ${open === "unstop" ? "open" : ""}`}>
            <div className="ach-head" onClick={() => toggle("unstop")}>
              <div className="head-left">
                <img src={unstopIcon} alt="Unstop" />
                <h2>Unstop</h2>
              </div>
              <span className="toggle">{open === "unstop" ? "−" : "+"}</span>
            </div>

            <div className="ach-body">
              <ul>
                <li>Participated in hackathons</li>
                <li>Shortlisted in coding contests</li>
                <li>Active competitive profile</li>
              </ul>
            </div>
          </div>

          {/* ========== CERTIFICATES ========== */}
          <div className={`ach-item ${open === "certs" ? "open" : ""}`}>
            <div className="ach-head" onClick={() => toggle("certs")}>
              <div className="head-left">
                <img src={githubIcon} alt="Certificates" />
                <h2>Certificates</h2>
              </div>
              <span className="toggle">{open === "certs" ? "−" : "+"}</span>
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
    </>
  );
}
