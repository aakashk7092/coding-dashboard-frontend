import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaGithub,
  FaBars,
  FaLinkedin,
  FaTimes,
  FaPhoneAlt,
} from "react-icons/fa";
import { SiCodechef, SiLeetcode } from "react-icons/si";
import profileImage from "../assets/profile.jpg";
import { fetchActivity } from "../lib/api.js";
import { emptyActivity, normalizeActivity } from "../lib/activityDefaults.js";

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

const homeNavLinks = [
  { label: "Projects", href: "#projects", type: "anchor" },
  { label: "Dashboard", href: "/dashboard", type: "route" },
  { label: "Activity", href: "#activity", type: "anchor" },
  { label: "Skills", href: "#skills", type: "anchor" },
  { label: "Resume", href: "/resume.pdf", type: "external" },
];

const connectLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aakash-kumar-aa3093315/",
    icon: <FaLinkedin />,
  },
  {
    label: "GitHub",
    href: "https://github.com/aakashk7092",
    icon: <FaGithub />,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/aakashkumar2005/",
    icon: <SiLeetcode />,
  },
  {
    label: "CodeChef",
    href: "https://www.codechef.com/users/aakashk7092",
    icon: <SiCodechef />,
  },
];

function HomeNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 820) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`topbar topbar-home ${menuOpen ? "topbar-menu-open" : ""}`}>
      <div className="topbar-row">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark">AK</span>
          <span className="brand-copy">
            <strong>Aakash Kumar</strong>
          </span>
        </Link>

        <button
          type="button"
          className="topbar-toggle"
          aria-expanded={menuOpen}
          aria-controls="home-mobile-nav"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className="topnav topnav-desktop">
          {homeNavLinks.map((link) => {
            if (link.type === "route") {
              return (
                <Link key={link.label} to={link.href}>
                  {link.label}
                </Link>
              );
            }

            if (link.type === "external") {
              return (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              );
            }

            return (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="topbar-actions topbar-actions-desktop">
          <Link className="nav-cta" to="/dashboard/recruiter">
            Recruiter View
          </Link>
        </div>
      </div>

      <div id="home-mobile-nav" className={`topbar-mobile-panel ${menuOpen ? "is-open" : ""}`}>
        <nav className="topnav topnav-mobile">
          {homeNavLinks.map((link) => {
            if (link.type === "route") {
              return (
                <Link key={link.label} to={link.href} onClick={closeMenu}>
                  {link.label}
                </Link>
              );
            }

            if (link.type === "external") {
              return (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" onClick={closeMenu}>
                  {link.label}
                </a>
              );
            }

            return (
              <a key={link.label} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="topbar-actions topbar-actions-mobile">
          <Link className="nav-cta" to="/dashboard/recruiter" onClick={closeMenu}>
            Recruiter View
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function PortfolioHome() {
  const [activityData, setActivityData] = useState(emptyActivity);

  useEffect(() => {
    let isMounted = true;

    fetchActivity()
      .then((response) => {
        if (!isMounted) {
          return;
        }

        setActivityData(normalizeActivity(response));
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setActivityData(emptyActivity);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const platformStats = [
    { label: "LeetCode", value: `${activityData.leetcode?.solved || 0} solved`, icon: <SiLeetcode /> },
    { label: "GitHub", value: `${activityData.github?.commits || 0} commits`, icon: <FaGithub /> },
    { label: "CodeChef", value: `${activityData.codechef?.rating || 0} rating`, icon: <SiCodechef /> },
    { label: "Streak", value: `${activityData.overview?.currentStreak || 0} days`, icon: "Code" },
  ];

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
              <h1>Aakash Kumar</h1>
              <h2 className="hero-role">Software Engineer | DSA Enthusiast | Full Stack Developer</h2>
              <p className="hero-text">
                Hi, I'm Aakash Kumar, a passionate Software Engineer focused on Data Structures, Algorithms, and Full Stack Web Development using React, Node.js, and MongoDB.
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

        <section className="section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Connect</p>
              <h2>Connect with me</h2>
            </div>
          </div>

          <div className="recruiter-card">
            <p className="hero-text">
              Explore my professional accounts across LinkedIn, GitHub, LeetCode, and CodeChef to review software engineering work, coding progress, and technical achievements.
            </p>
            <div className="recruiter-details">
              {connectLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="me noreferrer">
                  {link.icon} {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section home-section-grid">
          <div className="section-heading home-section-heading">
            <div>
              <p className="eyebrow">Projects</p>
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
              <p className="eyebrow">Activity</p>
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
            <p className="eyebrow">Recruiter</p>
          </div>

          <div className="recruiter-card">
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
