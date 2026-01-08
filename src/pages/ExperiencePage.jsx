import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ExperiencePage.css";

export default function ExperiencePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="exp-page">

      {/* TOP BAR */}
      <div className="exp-top">
        <h1>Experience & Journey</h1>
        <Link to="/" className="back-btn">← Back</Link>
      </div>

      {/* INTRO */}
      <p className="exp-intro">
        My journey is built on consistency, real projects, and problem-solving.
        I focus on becoming a solid engineer — not just a coder.
      </p>

      {/* ================= STATS ================= */}
      <div className="impact-stats">
        <div className="stat-box">
          <h2>550+</h2>
          <p>DSA Problems Solved</p>
        </div>
        <div className="stat-box">
          <h2>12+</h2>
          <p>Projects Built</p>
        </div>
        <div className="stat-box">
          <h2>3+</h2>
          <p>Hackathons / Contests</p>
        </div>
        <div className="stat-box">
          <h2>1+</h2>
          <p>Year of Daily Consistency</p>
        </div>
      </div>

      {/* ================= TIMELINE ================= */}
      <div className="exp-timeline">

        <div className="exp-item">
          <span className="exp-dot green"></span>
          <div className="exp-card">
            <span className="exp-year">2023</span>
            <h2>Started Coding Journey</h2>
            <p>
              Began with C++ and core programming fundamentals. 
              Built logical thinking and problem-solving mindset.
            </p>
            <div className="exp-tags">
              <span>C++</span><span>Logic</span><span>Basics</span>
            </div>
          </div>
        </div>

        <div className="exp-item">
          <span className="exp-dot blue"></span>
          <div className="exp-card">
            <span className="exp-year">2024</span>
            <h2>DSA & Competitive Programming</h2>
            <p>
              Strengthened algorithms, data structures, and consistency.
              Solved hundreds of problems on LeetCode & HackerRank.
            </p>
            <div className="exp-tags">
              <span>DSA</span><span>LeetCode</span><span>Discipline</span>
            </div>
          </div>
        </div>

        <div className="exp-item">
          <span className="exp-dot purple"></span>
          <div className="exp-card">
            <span className="exp-year">2025 – Present</span>
            <h2>Full-Stack Development</h2>
            <p>
              Building real-world dashboards using React, Node.js and REST APIs.
              Focused on clean UI and scalable backend systems.
            </p>
            <div className="exp-tags">
              <span>React</span><span>Node.js</span><span>APIs</span>
            </div>
          </div>
        </div>

      </div>

      {/* ================= CLOSING ================= */}
      <div className="exp-close">
        I’m not chasing shortcuts — I’m building foundations.  
        Every project, every bug, every solved problem adds one more layer 
        to becoming a reliable software engineer.
      </div>

      {/* GO TOP */}
      <button className="go-top" onClick={goTop}>↑</button>
    </div>
  );
}
