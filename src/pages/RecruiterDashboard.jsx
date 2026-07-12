import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaAward,
  FaBriefcase,
  FaCertificate,
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGithub,
  FaGraduationCap,
  FaLinkedin,
  FaPhoneAlt,
  FaRocket,
} from "react-icons/fa";
import { SiCodechef, SiLeetcode } from "react-icons/si";
import { fetchActivity } from "../lib/api.js";
import { emptyActivity, normalizeActivity } from "../lib/activityDefaults.js";

const projects = [
  {
    title: "Tech-FreeLance Platform",
    category: "In Progress",
    summary:
      "Full-stack freelancing platform with secure authentication, user profiles, project posting, proposal management, real-time notifications, dashboards, and role-based access.",
    stack: ["React", "NestJS", "PostgreSQL", "Prisma", "Redis", "JWT"],
  },
  {
    title: "Coding Practice Platform",
    category: "Active Build",
    summary:
      "Company-wise DSA practice platform with solved problem tracking, coding profile integration, statistics, and a recruiter-friendly dashboard.",
    stack: ["React", "Node.js", "Express.js", "MongoDB"],
    link: "/dashboard",
    linkLabel: "Open Dashboard",
  },
  {
    title: "Developer Analytics Dashboard",
    category: "Analytics",
    summary:
      "Unified dashboard for GitHub, LeetCode, and CodeChef activity, including commits, solved problems, coding streaks, ratings, and developer metrics.",
    stack: ["React", "Node.js", "REST APIs"],
  },
  {
    title: "VerdictOS",
    category: "AI Product",
    summary:
      "AI startup validation platform that simulates a boardroom of agents for market research, competitor analysis, pricing, risks, MVP planning, growth, and investment verdicts.",
    stack: ["React", "Node.js", "Google Gemini API", "Tavily API", "Express.js"],
  },
  {
    title: "Rajpoot Associates Website",
    category: "Live Client Project",
    summary:
      "Responsive business website delivered for a real client with service pages, contact flow, SEO-friendly content, and professional UX.",
    stack: ["React", "Node.js", "MongoDB"],
    link: "https://rajpootassociates.in",
    linkLabel: "Live Website",
  },
  {
    title: "Smart Asset Tracking & Inventory Management System",
    category: "IoT",
    summary:
      "ESP32 and RFID-based asset tracking system with real-time inventory records, Google Sheets sync, and ThingsBoard monitoring.",
    stack: ["ESP32", "MFRC522 RFID", "Arduino", "Google Sheets API", "ThingsBoard"],
  },
  {
    title: "Plant Disease Detection System",
    category: "AI/ML",
    summary:
      "Computer vision application that detects plant diseases from leaf images using deep learning to support early crop issue identification.",
    stack: ["Python", "TensorFlow", "OpenCV", "CNN"],
  },
];

const achievements = [
  { title: "Google Student Ambassador", detail: "Selected for student developer engagement and Google technology promotion.", icon: <FaAward /> },
  { title: "200+ Days DSA Consistency", detail: "Maintained a long-term DSA streak through #200DaysDSAConsistency.", icon: <SiLeetcode /> },
  { title: "HackerRank Certifications", detail: "Python Basic, SQL Basic, and Problem Solving Basic.", icon: <FaCertificate /> },
  { title: "84.19% Academic Aggregate", detail: "B.Tech CSE at Invertis University, Bareilly.", icon: <FaGraduationCap /> },
  { title: "Live Client Delivery", detail: "Designed, built, and deployed Rajpoot Associates website.", icon: <FaBriefcase /> },
  { title: "Full-Stack Product Builder", detail: "Building scalable products across backend, AI, analytics, and IoT.", icon: <FaRocket /> },
];

const skills = [
  "React",
  "Node.js",
  "Express.js",
  "NestJS",
  "PostgreSQL",
  "Prisma",
  "MongoDB",
  "Redis",
  "JWT",
  "REST APIs",
  "C++",
  "Python",
  "JavaScript",
  "DSA",
  "System Design",
  "Docker",
  "TensorFlow",
  "OpenCV",
  "ESP32",
  "RFID",
];

const profileSignals = [
  "Google Student Ambassador",
  "200+ days DSA consistency",
  "7 practical engineering projects",
  "Live client website delivered",
  "Backend and system design focused",
];

export default function RecruiterDashboard() {
  const [data, setData] = useState(emptyActivity);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetchActivity()
      .then((response) => {
        if (!isMounted) {
          return;
        }

        setData(normalizeActivity(response));
        setError("");
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setData(emptyActivity);
        setError("Recruiter data is temporarily unavailable. Showing fallback values.");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="dashboard-shell recruiter-shell">
      <header className="dashboard-topbar">
        <div>
          <Link className="back-link" to="/">
            Back to Portfolio
          </Link>
          <h1>Recruiter View</h1>
          <p>Evaluation-ready summary of projects, achievements, coding signals, skills, resume, and contact details.</p>
        </div>
        <div className="recruiter-actions">
          <a className="button button-primary" href="/resume.pdf" target="_blank" rel="noreferrer">
            Download Resume
            <FaDownload />
          </a>
          <Link className="button button-secondary" to="/dashboard">
            Developer Dashboard
          </Link>
        </div>
      </header>

      <section className="dashboard-section">
        {error ? <div className="dashboard-alert">{error}</div> : null}
        <div className="recruiter-overview">
          <article className="dashboard-card recruiter-hero-card">
            <div>
              <p className="eyebrow">Candidate Snapshot</p>
              <h2>Aakash Kumar</h2>
              <p>
                Full Stack Developer and Google Student Ambassador building recruiter-ready products across backend systems, AI tools, dashboards, IoT automation, and machine learning.
              </p>
            </div>
            <div className="recruiter-chip-row">
              {profileSignals.map((signal) => (
                <span className="recruiter-chip" key={signal}>{signal}</span>
              ))}
            </div>
          </article>

          <article className="dashboard-card recruiter-summary-card">
            <div className="recruiter-kpi-grid">
              <div className="recruiter-kpi">
                <strong>7</strong>
                <span>Projects</span>
              </div>
              <div className="recruiter-kpi">
                <strong>200+</strong>
                <span>DSA Days</span>
              </div>
              <div className="recruiter-kpi">
                <strong>{data.leetcode?.solved || 0}</strong>
                <span>LeetCode Solved</span>
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
            <div className="recruiter-contact-copy">
              <p className="eyebrow">Quick Actions</p>
              <h3>Resume and dashboard links</h3>
            </div>
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
        <div className="section-heading home-section-heading">
          <div>
            <p className="eyebrow">Achievements</p>
            <h2>Strong hiring signals</h2>
          </div>
        </div>

        <div className="recruiter-achievement-grid">
          {achievements.map((achievement) => (
            <article className="dashboard-card recruiter-achievement-card" key={achievement.title}>
              <span className="recruiter-achievement-icon">{achievement.icon}</span>
              <div>
                <h3>{achievement.title}</h3>
                <p>{achievement.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading home-section-heading">
          <div>
            <p className="eyebrow">Project Evidence</p>
            <h2>Practical systems and products</h2>
          </div>
        </div>

        <div className="recruiter-project-grid">
          {projects.map((project) => (
            <article className="dashboard-card recruiter-project-card" key={project.title}>
              <div className="project-card-head">
                <p className="project-type">{project.category}</p>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="project-stack">
                {project.stack.map((item) => (
                  <span className="stack-badge" key={item}>{item}</span>
                ))}
              </div>
              {project.link ? (
                project.link.startsWith("/") ? (
                  <Link className="section-link recruiter-project-link" to={project.link}>
                    {project.linkLabel}
                  </Link>
                ) : (
                  <a className="section-link recruiter-project-link" href={project.link} target="_blank" rel="noreferrer">
                    {project.linkLabel}
                    <FaExternalLinkAlt />
                  </a>
                )
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="recruiter-card-grid">
          <article className="dashboard-card recruiter-wide-card">
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
              <li>CodeChef rating: {data.codechef?.rating || 0}</li>
              <li>Active platforms: {data.overview?.activePlatforms || 0}</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
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
          <a href="https://www.codechef.com/users/aakashk7092" target="_blank" rel="noreferrer">
            <SiCodechef /> CodeChef
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
