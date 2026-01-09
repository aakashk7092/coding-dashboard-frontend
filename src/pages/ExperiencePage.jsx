import Navbar from "../components/Navbar";
import { useEffect } from "react";
import "./ExperiencePage.css";

export default function ExperiencePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <Navbar />

      <div className="exp-page">

        {/* TOP BAR */}
        <div className="exp-top">
          <h1>Experience & Journey</h1>
        </div>

        {/* INTRO – honest */}
        <p className="exp-intro">
          My journey is still in progress. I’m learning by building projects,
          solving real problems, and improving step by step — not by shortcuts,
          but by consistency.
        </p>

        {/* ================= STATS ================= */}
        <div className="impact-stats">
          <div className="stat-box">
            <h2>550+</h2>
            <p>DSA Problems Solved (LeetCode focused)</p>
          </div>
          <div className="stat-box">
            <h2>10+</h2>
            <p>Mini & Major Projects Built</p>
          </div>
          <div className="stat-box">
            <h2>3+</h2>
            <p>Hackathons / Coding Contests</p>
          </div>
          <div className="stat-box">
            <h2>1+</h2>
            <p>Year of Daily Learning Habit</p>
          </div>
        </div>

        {/* ================= TIMELINE ================= */}
        <div className="exp-timeline">

          {/* 2023 */}
          <div className="exp-item">
            <span className="exp-dot green"></span>
            <div className="exp-card">
              <span className="exp-year">2023</span>
              <h2>Started Coding Journey</h2>
              <p>
                I started with C++ and basic programming concepts.
                At this stage, I was learning how to think logically,
                how to debug, and how to stay patient with problems.
              </p>
              <div className="exp-tags">
                <span>C++</span><span>Logic</span><span>Basics</span>
              </div>
            </div>
          </div>

          {/* 2024 */}
          <div className="exp-item">
            <span className="exp-dot blue"></span>
            <div className="exp-card">
              <span className="exp-year">2024</span>
              <h2>DSA & Competitive Programming</h2>
              <p>
                I seriously focused on Data Structures and Algorithms.
                Solved hundreds of problems on LeetCode and practiced regularly.
                This phase taught me discipline more than anything else.
              </p>
              <div className="exp-tags">
                <span>DSA</span><span>LeetCode</span><span>Consistency</span>
              </div>
            </div>
          </div>

          {/* 2025 */}
          <div className="exp-item">
            <span className="exp-dot purple"></span>
            <div className="exp-card">
              <span className="exp-year">2025 – Present</span>
              <h2>Full-Stack Development</h2>
              <p>
                I started building real projects using React and Node.js.
                Learned how frontend and backend actually work together.
                Still learning deployment, APIs, and clean system design
                through real mistakes and fixes.
              </p>
              <div className="exp-tags">
                <span>React</span><span>Node.js</span><span>APIs</span>
              </div>
            </div>
          </div>

        </div>

        {/* ================= CLOSING ================= */}
        <div className="exp-close">
          I’m not trying to look perfect — I’m trying to become better.
          Every bug I fix, every project I finish, and every problem I solve
          adds real experience to my journey as a software engineer.
        </div>

        <button className="go-top" onClick={goTop}>↑</button>
      </div>
    </>
  );
}
