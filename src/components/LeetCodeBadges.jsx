import "./LeetCodeBadges.css";

import dailyImg from "../assets/leetcode/2025DailyChallenge.png";
import mathsImg from "../assets/leetcode/mathsleetcode.png";
import pandaImg from "../assets/leetcode/panda.png";

import video50 from "../assets/leetcode/50Days.mp4";
import video100 from "../assets/leetcode/100Days.mp4";
import mathsVideo from "../assets/leetcode/mathsBedge.mp4";

export default function LeetCodeBadges() {
  return (
    <div className="lc-wrap">
      {/* ================= HERO ================= */}
      <div className="lc-hero">
        <img src={dailyImg} alt="Daily Challenge" loading="lazy" />

        <div className="lc-hero-text">
          <h3>100 Days of Consistency</h3>
          <p>
            Maintained daily problem-solving discipline on LeetCode.
            Shows focus, resilience and long-term engineering mindset.
          </p>

          <div className="lc-tags">
            <span>Discipline</span>
            <span>Consistency</span>
            <span>Problem Solving</span>
          </div>
        </div>
      </div>

      {/* ================= STREAK VIDEOS ================= */}
      <h4 className="lc-section-title">Consistency Milestones</h4>

      <div className="lc-video-grid">
        <div className="lc-video-card">
          <video
            src={video50}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="lc-auto-video"
          />
          <p>50 Days Streak</p>
        </div>

        <div className="lc-video-card">
          <video
            src={video100}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="lc-auto-video"
          />
          <p>100 Days Discipline</p>
        </div>

        <div className="lc-video-card">
          <video
            src={mathsVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="lc-auto-video"
          />
          <p>Mathematical Insight Badge</p>
        </div>
      </div>

      {/* ================= BADGES ================= */}
      <h4 className="lc-section-title">Skill Badges</h4>

      <div className="lc-badge-grid">
        <div className="lc-badge-card">
          <img src={mathsImg} alt="Mathematical Insight" loading="lazy" />
          <h5>Mathematical Insight</h5>
          <span>Logic • Critical Thinking</span>
        </div>

        <div className="lc-badge-card">
          <img src={pandaImg} alt="Introduction to Pandas" loading="lazy" />
          <h5>Introduction to Pandas</h5>
          <span>Data Handling • Python</span>
        </div>
      </div>
    </div>
  );
}
