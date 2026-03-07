import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { fetchActivity } from "../lib/api.js";
import { emptyActivity, normalizeActivity } from "../lib/activityDefaults.js";

const projects = [
  "Rajpoot Associates Website",
  "Coding Practice Platform",
  "Developer Activity Dashboard",
];

const skills = ["React", "Node.js", "Express", "MongoDB", "C++", "JavaScript", "DSA", "System Design"];

export default function RecruiterDashboard() {
  const [data, setData] = useState(emptyActivity);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchActivity()
      .then((response) => {
        setData(normalizeActivity(response));
        setError("");
      })
      .catch(() => {
        setData(emptyActivity);
        setError("Recruiter data is temporarily unavailable. Showing fallback values.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading recruiter view...</div>;
  }

  return (
    <div className="dashboard-shell recruiter-shell">
      <header className="dashboard-topbar">
        <div>
          <Link className="back-link" to="/dashboard">
            Back to Developer Dashboard
          </Link>
          <h1>Recruiter View</h1>
          <p>Projects, coding stats, skills, resume, and contact details in one evaluation-ready screen.</p>
        </div>
        <a className="button button-primary" href="/resume.pdf" target="_blank" rel="noreferrer">
          Download Resume
          <FaDownload />
        </a>
      </header>

      <section className="dashboard-section">
        {error ? <div className="dashboard-alert">{error}</div> : null}
        <div className="recruiter-overview">
          <article className="dashboard-card recruiter-summary-card">
            <div className="recruiter-summary-head">
              <p className="eyebrow">Overview</p>
              <h2>Shortlist-ready engineering profile with live coding signals.</h2>
              <p>
                Full-stack developer building production-style React and Node.js projects with a strong DSA and platform-activity foundation.
              </p>
            </div>

            <div className="recruiter-kpi-grid">
              <div className="recruiter-kpi">
                <strong>{data.leetcode?.solved || 0}</strong>
                <span>LeetCode Solved</span>
              </div>
              <div className="recruiter-kpi">
                <strong>{data.overview?.currentStreak || 0} Days</strong>
                <span>Current Streak</span>
              </div>
              <div className="recruiter-kpi">
                <strong>{data.github?.repos || 0}</strong>
                <span>GitHub Repos</span>
              </div>
              <div className="recruiter-kpi">
                <strong>{data.codechef?.rating || 0}</strong>
                <span>CodeChef Rating</span>
              </div>
            </div>
          </article>

          <article className="dashboard-card recruiter-contact-card">
            <p className="eyebrow">Hiring</p>
            <h3>Fast contact and evaluation links</h3>
            <p>Resume, coding profiles, and direct contact methods without extra navigation.</p>
            <div className="recruiter-actions">
              <a className="button button-primary" href="/resume.pdf" target="_blank" rel="noreferrer">
                Download Resume
                <FaDownload />
              </a>
              <Link className="button button-secondary" to="/dashboard">
                Developer Dashboard
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="recruiter-card-grid">
          <article className="dashboard-card">
            <h3>Projects</h3>
            <ul className="dashboard-list">
              {projects.map((project) => (
                <li key={project}>{project}</li>
              ))}
            </ul>
          </article>

          <article className="dashboard-card">
            <h3>Skills</h3>
            <div className="recruiter-chip-row">
              {skills.map((skill) => (
                <span className="recruiter-chip" key={skill}>{skill}</span>
              ))}
            </div>
          </article>

          <article className="dashboard-card">
            <h3>Signal Summary</h3>
            <ul className="dashboard-list">
              <li>LeetCode contest rating: {data.leetcode?.contestRating || 0}</li>
              <li>GitHub followers: {data.github?.followers || 0}</li>
              <li>Unstop highlights: {data.unstop?.highlights || 0}</li>
              <li>Active platforms: {data.overview?.activePlatforms || 0}</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Direct hiring links with no extra navigation.</h2>
        </div>

        <div className="recruiter-details">
          <a href={`mailto:${data.recruiterProfile?.email || "aakashk7092@gmail.com"}`}>
            <FaEnvelope /> {data.recruiterProfile?.email || "aakashk7092@gmail.com"}
          </a>
          <a href={`tel:${data.recruiterProfile?.phone || "+917310971109"}`}>
            <FaPhoneAlt /> {data.recruiterProfile?.phone || "+91 7310971109"}
          </a>
          <a href="https://leetcode.com/aakashkumar2005/" target="_blank" rel="noreferrer">
            <SiLeetcode /> LeetCode
          </a>
          <a href="https://github.com/aakashk7092" target="_blank" rel="noreferrer">
            <FaGithub /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/aakash-kumar-aa3093315/" target="_blank" rel="noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
