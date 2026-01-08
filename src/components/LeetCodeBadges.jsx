import "./LeetCodeBadges.css";

import dailyImg from "../assets/leetcode/2025DailyChallenge.png";
import mathsImg from "../assets/leetcode/mathsleetcode.png";
import pandaImg from "../assets/leetcode/panda.png";

export default function LeetCodeBadges() {
  return (
    <div className="lc-showcase">

      {/* HERO BADGE */}
      <div className="lc-hero">
        <img src={dailyImg} alt="100 Days Badge" />
        <div className="lc-hero-text">
          <h3>100 Days of Consistency</h3>
          <p>Proof of discipline, not just talent.</p>
        </div>
      </div>

      {/* GRID */}
      <div className="lc-grid">
        <div className="lc-card">
          <img src={mathsImg} alt="Mathematical Insight" />
          <span>Mathematical Insight</span>
        </div>

        <div className="lc-card">
          <img src={pandaImg} alt="Intro to Pandas" />
          <span>Introduction to Pandas</span>
        </div>
      </div>
    </div>
  );
}
