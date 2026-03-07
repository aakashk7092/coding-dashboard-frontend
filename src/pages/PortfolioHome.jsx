import { Link } from "react-router-dom";
import {
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { SiCodechef, SiLeetcode } from "react-icons/si";
import profileImage from "../assets/profile.jpg";

const projects = [
  {
    title: "Rajpoot Associates Website",
    subtitle: "Full Website Development | Client Project",
    description:
      "Live client website built with a responsive layout, business-oriented service pages, contact flow, and SEO-conscious content structure.",
    stack: ["React", "Node", "MongoDB"],
    liveLabel: "Live Website",
    liveUrl: "https://rajpootassociates.in",
  },
  {
    title: "Coding Practice Platform",
    subtitle: "Current Product Build",
    description:
      "A coding preparation platform where users can practice company-wise DSA questions, connect accounts, and track solved problems in one recruiter-friendly dashboard.",
    stack: ["React", "Node", "Express", "MongoDB"],
    liveLabel: "View Coding Dashboard",
    liveUrl: "/dashboard",
    githubUrl: "https://github.com/aakashk7092",
  },
];

const activities = [
  "Day 66 - Completed LeetCode 75 Challenge problem",
  "Building Coding Platform Dashboard",
  "Developed Rajpoot Associates Website",
  "Working on DSA and System Design",
];

const skillGroups = [
  { title: "Languages", items: ["C++", "Python", "JavaScript"] },
  { title: "Frontend", items: ["React", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Express"] },
  { title: "Database", items: ["MongoDB", "MySQL"] },
  { title: "Tools", items: ["Git", "GitHub", "Docker"] },
];

const platformStats = [
  { label: "LeetCode", value: "690 solved", icon: <SiLeetcode /> },
  { label: "GitHub", value: "432 commits", icon: <FaGithub /> },
  { label: "CodeChef", value: "1452 rating", icon: <SiCodechef /> },
  { label: "Streak", value: "160 days", icon: "Code" },
];

function HomeNav() {
  return (
    <header className="topbar">
      <Link className="brand" to="/">
        <span className="brand-mark">AK</span>
        <span className="brand-copy">
          <strong>Aakash Kumar</strong>
          <span>Software Engineer Portfolio</span>
        </span>
      </Link>

      <nav className="topnav">
        <a href="#projects">Projects</a>
        <Link to="/dashboard">Dashboard</Link>
        <a href="#activity">Activity</a>
        <a href="#skills">Skills</a>
        <a href="/resume.pdf" target="_blank" rel="noreferrer">
          Resume
        </a>
      </nav>

      <div className="topbar-actions">
        <Link className="nav-cta" to="/dashboard/recruiter">
          Recruiter View
        </Link>
      </div>
    </header>
  );
}

export default function PortfolioHome() {
  return (
    <div className="site-shell">
      <div className="site-background" aria-hidden="true" />
      <HomeNav />

      <main className="home-main">
        <section className="hero section" id="home">
          <div className="hero-intro-card">
            <div className="hero-photo-wrap">
              <div className="portrait-card">
                <img src={profileImage} alt="Portrait of Aakash Kumar" className="portrait-image" />
              </div>
            </div>

            <div className="hero-copy">
              <p className="eyebrow">Software Engineer Portfolio</p>
              <h1>Aakash Kumar</h1>
              <p className="hero-role">Software Engineer | Full Stack Developer | DSA Enthusiast</p>
              <p className="hero-text">
                Full-stack developer building recruiter-friendly products and coding analytics tools with React, Node.js, and MongoDB.
              </p>
              <p className="hero-text">
                Current focus: a coding preparation platform that combines DSA practice, account integrations, and live developer signals in one place.
              </p>
              <p className="hero-live">
                Previously built a live client website:{" "}
                <a href="https://rajpootassociates.in" target="_blank" rel="noreferrer">
                  rajpootassociates.in
                </a>
              </p>

              <div className="hero-actions">
                <Link className="button button-primary" to="/dashboard">
                  View Coding Dashboard
                </Link>
                <a className="button button-secondary" href="#projects">
                  View Projects
                </a>
                <a className="button button-ghost" href="https://github.com/aakashk7092" target="_blank" rel="noreferrer">
                  GitHub
                  <FaGithub />
                </a>
                <a className="button button-secondary" href="/resume.pdf" target="_blank" rel="noreferrer">
                  Resume
                  <FaFileAlt />
                </a>
              </div>

              <ul className="social-list">
                <li>
                  <a href="https://leetcode.com/aakashkumar2005/" target="_blank" rel="noreferrer" aria-label="LeetCode">
                    <SiLeetcode />
                  </a>
                </li>
                <li>
                  <a href="https://www.codechef.com" target="_blank" rel="noreferrer" aria-label="CodeChef">
                    <SiCodechef />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/aakashk7092" target="_blank" rel="noreferrer" aria-label="GitHub">
                    <FaGithub />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/aakash-kumar-aa3093315/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section hero-stats-section">
          <div className="hero-stats-grid">
            {platformStats.map((item) => (
              <article className="hero-side-stat" key={item.label}>
                <span className="hero-side-stat-icon">{item.icon}</span>
                <div>
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section home-section-grid">
          <div className="section-heading home-section-heading">
            <div>
              <p className="eyebrow">Projects</p>
              <h2>Selected projects with live output and recruiter-readable structure.</h2>
            </div>
            <a className="section-link" href="#recruiter">
              Open for opportunities
            </a>
          </div>

          <div className="project-grid" id="projects">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <p className="project-type">{project.subtitle}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-stack">
                  {project.stack.map((item) => (
                    <span className="stack-badge" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {project.liveUrl.startsWith("/") ? (
                    <Link className="button button-primary" to={project.liveUrl}>
                      {project.liveLabel}
                    </Link>
                  ) : (
                    <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                      {project.liveLabel}
                      <FaExternalLinkAlt />
                    </a>
                  )}
                  {project.githubUrl ? (
                    <a className="button button-secondary" href={project.githubUrl} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section home-two-column">
          <div className="home-rail-card" id="activity">
            <div className="section-heading">
              <p className="eyebrow">Recent Activity</p>
              <h2>Execution log</h2>
            </div>

            <div className="activity-list">
              {activities.map((activity) => (
                <article className="activity-item" key={activity}>
                  <span className="activity-dot" />
                  <p>{activity}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="home-rail-card" id="skills">
            <div className="section-heading">
              <p className="eyebrow">Skills</p>
              <h2>Core stack</h2>
            </div>

            <div className="skills-groups">
              {skillGroups.map((group) => (
                <article className="skills-row-card" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul className="skills-inline-list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section recruiter-section" id="recruiter">
          <div className="section-heading">
            <p className="eyebrow">Recruiter Section</p>
            <h2>Open for software engineering internships and entry-level roles.</h2>
          </div>

          <div className="recruiter-card">
            <p>
              This portfolio is paired with a coding dashboard so recruiters can evaluate projects, coding stats, growth signals, and contact details in one place.
            </p>

            <div className="recruiter-details">
              <a href="mailto:aakashk7092@gmail.com">
                <FaEnvelope /> aakashk7092@gmail.com
              </a>
              <a href="tel:+917310971109">
                <FaPhoneAlt /> +91 7310971109
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

            <div className="recruiter-actions">
              <a className="button button-primary" href="/resume.pdf" target="_blank" rel="noreferrer">
                Download Resume
                <FaDownload />
              </a>
              <Link className="button button-secondary" to="/dashboard/recruiter">
                Recruiter View
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
