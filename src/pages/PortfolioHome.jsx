import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaAward,
  FaBolt,
  FaBrain,
  FaBriefcase,
  FaCertificate,
  FaChartLine,
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaGithub,
  FaBars,
  FaGraduationCap,
  FaLinkedin,
  FaRocket,
  FaTimes,
  FaPhoneAlt,
} from "react-icons/fa";
import { SiCodechef, SiLeetcode } from "react-icons/si";
import profileImage from "../assets/profile.jpg";
import { fetchActivity } from "../lib/api.js";
import { emptyActivity, normalizeActivity } from "../lib/activityDefaults.js";

const projects = [
  {
    title: "Tech-FreeLance Platform",
    subtitle: "Full-Stack Freelancing Platform",
    status: "In Progress",
    category: "Production Architecture",
    description:
      "A scalable freelancing platform connecting clients and freelancers with secure auth, role-based access, profiles, project posting, proposals, real-time notifications, and dashboards.",
    stack: ["React", "NestJS", "PostgreSQL", "Prisma", "Redis", "JWT"],
    impact: "Built around production-ready backend structure and responsive user flows.",
  },
  {
    title: "Coding Practice Platform",
    subtitle: "Interview Preparation Product",
    status: "Active Build",
    category: "Full Stack",
    description:
      "A coding interview preparation platform for company-wise DSA practice, solved problem tracking, coding profile integrations, and recruiter-friendly progress visibility.",
    stack: ["React", "Node.js", "Express.js", "MongoDB"],
    impact: "Turns daily problem solving into measurable technical growth.",
    liveLabel: "View Coding Dashboard",
    liveUrl: "/Baiyalogic",
    githubUrl: "https://bhaiyalogic.in/",
  },
  {
    title: "Developer Analytics Dashboard",
    subtitle: "Unified Coding Activity Dashboard",
    status: "Built",
    category: "Analytics",
    description:
      "A dashboard that aggregates GitHub, LeetCode, and CodeChef activity into one interface with commits, solved problems, streaks, ratings, and developer metrics.",
    stack: ["React", "Node.js", "REST APIs"],
    impact: "Gives recruiters a fast view of consistency, coding progress, and platform signals.",
    liveLabel: "Open Dashboard",
    liveUrl: "/dashboard/recruiter",
  },
  {
    title: "VerdictOS",
    subtitle: "AI Startup Validation Platform",
    status: "Built",
    category: "AI Product",
    description:
      "An AI-powered startup validation system that simulates a virtual boardroom of specialized agents for market research, competitor analysis, pricing, risks, MVP planning, growth, and investment verdicts.",
    stack: ["React", "Node.js", "Google Gemini API", "Tavily API", "Express.js"],
    impact: "Combines multiple AI perspectives into one business decision workflow.",
  },
  {
    title: "Rajpoot Associates Website",
    subtitle: "Client Business Website",
    status: "Live",
    category: "Client Work",
    description:
      "A fully responsive business website developed for a real client with service pages, contact functionality, SEO-friendly content, responsive design, and professional user experience.",
    stack: ["React", "Node.js", "MongoDB"],
    impact: "Delivered and deployed for a real business online presence.",
    liveLabel: "Live Website",
    liveUrl: "https://rajpootassociates.in",
  },
  {
    title: "Smart Asset Tracking & Inventory Management System",
    subtitle: "IoT Inventory System",
    status: "Built",
    category: "IoT",
    description:
      "An IoT-based inventory management system using ESP32 and RFID to track assets in real time, sync inventory records with Google Sheets, and monitor data through ThingsBoard.",
    stack: ["ESP32", "MFRC522 RFID", "Arduino", "Google Sheets API", "ThingsBoard"],
    impact: "Bridges embedded hardware, cloud sync, and operational tracking.",
  },
  {
    title: "Plant Disease Detection System",
    subtitle: "Computer Vision Application",
    status: "Built",
    category: "AI/ML",
    description:
      "An AI-powered application that detects plant diseases from leaf images using deep learning, helping identify crop issues early for better agricultural decision-making.",
    stack: ["Python", "TensorFlow", "OpenCV", "CNN"],
    impact: "Applies machine learning to a practical agriculture problem.",
  },
];

const activities = [
  "Selected as a Google Student Ambassador",
  "Maintained 200+ days of DSA consistency",
  "Building Tech-FreeLance with NestJS, PostgreSQL, Prisma, Redis, and JWT",
  "Developing a recruiter-friendly coding practice and analytics platform",
  "Shipped Rajpoot Associates as a live client website",
];

const skillGroups = [
  { title: "Languages", items: ["C++", "Python", "JavaScript"] },
  { title: "Frontend", items: ["React", "Responsive UI", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Express", "NestJS", "REST APIs"] },
  { title: "Database", items: ["MongoDB", "PostgreSQL", "Prisma", "MySQL", "Redis"] },
  { title: "AI / IoT", items: ["Google Gemini API", "Tavily API", "TensorFlow", "OpenCV", "ESP32", "RFID"] },
  { title: "Tools", items: ["Git", "GitHub", "Docker", "ThingsBoard"] },
];

const impactHighlights = [
  {
    label: "Google Program",
    value: "Ambassador",
    icon: <FaAward />,
    detail: "Selected as a Google Student Ambassador for student developer engagement.",
  },
  {
    label: "Product Builder",
    value: "7 projects",
    icon: <FaBolt />,
    detail: "Full-stack, AI, analytics, IoT, and machine learning systems.",
  },
  {
    label: "DSA Consistency",
    value: "200+ days",
    icon: <FaChartLine />,
    detail: "Sustained daily problem-solving through the #200DaysDSAConsistency challenge.",
  },
  {
    label: "Real Client Work",
    value: "Live website",
    icon: <FaBriefcase />,
    detail: "Delivered and deployed a business website for Rajpoot Associates.",
  },
];

const achievements = [
  {
    title: "Google Student Ambassador",
    summary:
      "Selected to promote Google technologies, engage with the student developer community, and participate in technical events and initiatives.",
    icon: <FaAward />,
  },
  {
    title: "200+ Days of DSA Consistency",
    summary:
      "Maintained a 200+ day Data Structures and Algorithms streak while solving coding problems and sharing progress through #200DaysDSAConsistency.",
    icon: <FaChartLine />,
  },
  {
    title: "Competitive Programming",
    summary:
      "Actively solving problems on LeetCode and CodeChef to strengthen problem-solving skills and prepare for software engineering interviews.",
    icon: <SiLeetcode />,
  },
  {
    title: "HackerRank Certifications",
    summary: "Certified in Python Basic, SQL Basic, and Problem Solving Basic.",
    icon: <FaCertificate />,
  },
  {
    title: "Academic Performance",
    summary:
      "Maintaining an 84.19% aggregate in B.Tech Computer Science Engineering at Invertis University, Bareilly.",
    icon: <FaGraduationCap />,
  },
  {
    title: "Full-Stack Product Development",
    summary:
      "Building Tech-FreeLance, Coding Practice Platform, Developer Analytics Dashboard, and VerdictOS with scalable backend architecture.",
    icon: <FaRocket />,
  },
  {
    title: "Continuous Learning",
    summary:
      "Expanding expertise in backend development, system design, NestJS, PostgreSQL, Redis, Docker, and scalable architecture.",
    icon: <FaBrain />,
  },
];

const homeNavLinks = [
  { label: "Achievements", href: "#achievements", type: "anchor" },
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
              <h2 className="hero-role">Full Stack Developer building recruiter-ready products, AI systems, dashboards, and IoT solutions</h2>
              <p className="hero-text">
                Google Student Ambassador with 200+ days of DSA consistency, building practical software that goes beyond classroom projects: freelancing platforms, coding analytics dashboards, AI validation tools, client websites, IoT inventory systems, and ML applications.
              </p>
              <p className="hero-text">
                Current focus: Tech-FreeLance, a production-minded freelancing platform using React, NestJS, PostgreSQL, Prisma, Redis, and JWT.
              </p>
              <p className="hero-live">
                Real client delivery:{" "}
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
                <a className="button button-secondary" href="#achievements">
                  Achievements
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

        <section className="section impact-section">
          <div className="impact-grid">
            {impactHighlights.map((item) => (
              <article className="impact-card" key={item.label}>
                <span className="impact-icon">{item.icon}</span>
                <div>
                  <p className="project-type">{item.label}</p>
                  <strong>{item.value}</strong>
                  <span>{item.detail}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section home-section-grid" id="achievements">
          <div className="section-heading home-section-heading">
            <div>
              <p className="eyebrow">Achievements</p>
              <h2>Proof of consistency, leadership, and execution</h2>
            </div>
            <a className="section-link" href="/resume.pdf" target="_blank" rel="noreferrer">
              View resume
            </a>
          </div>

          <div className="achievement-grid">
            {achievements.map((achievement) => (
              <article className="achievement-card" key={achievement.title}>
                <span className="achievement-icon">{achievement.icon}</span>
                <div>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.summary}</p>
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
                <div className="project-card-head">
                  <p className="project-type">{project.category}</p>
                  <span className="project-status">{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p>{project.description}</p>
                <p className="project-impact">{project.impact}</p>
                <div className="project-stack">
                  {project.stack.map((item) => (
                    <span className="stack-badge" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {project.liveUrl?.startsWith("/") ? (
                    <Link className="button button-primary" to={project.liveUrl}>
                      {project.liveLabel}
                    </Link>
                  ) : project.liveUrl ? (
                    <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                      {project.liveLabel}
                      <FaExternalLinkAlt />
                    </a>
                  ) : null}
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
