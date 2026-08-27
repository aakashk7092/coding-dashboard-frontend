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
import logoImage from "../assets/logo.png";
import { fetchActivity } from "../lib/api.js";
import { emptyActivity, normalizeActivity } from "../lib/activityDefaults.js";

const projects = [
  {
    title: "Tech-FreeLance Platform",
    subtitle: "Full-Stack Freelancing Platform",
    status: "In Progress",
    category: "Production Architecture",
    description:
      "A scalable freelancing platform connecting clients and freelancers with secure authentication, role-based access, project posting, proposals, real-time notifications, and user dashboards.",
    stack: ["React", "NestJS", "PostgreSQL", "Prisma", "Redis", "JWT"],
    impact: "Engineered with modular backend architecture, role-based access, and real-time notification workflows.",
  },
  {
    title: "BhaiyaLogic",
    subtitle: "DSA Learning & Coding Practice Platform",
    status: "Active Development",
    category: "Full Stack",
    description:
      "A comprehensive DSA practice platform featuring structured learning roadmaps, company-wise interview preparation, progress tracking, handwritten notes, and personalized practice dashboards.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    impact: "Provides systematic DSA roadmaps and progress analytics for technical software engineering interviews.",
    liveLabel: "Visit BhaiyaLogic",
    liveUrl: "https://bhaiyalogic.in",
    githubUrl: "https://bhaiyalogic.in",
  },
  {
    title: "Developer Analytics Dashboard",
    subtitle: "Unified Coding Activity Dashboard",
    status: "Built",
    category: "Analytics",
    description:
      "A developer platform that aggregates GitHub commit activity, LeetCode problem streaks, and CodeChef contest ratings into unified analytics dashboards.",
    stack: ["React", "Node.js", "REST APIs"],
    impact: "Aggregates problem-solving streaks, commit metrics, and competitive ratings into clear technical signals.",
    liveLabel: "Open Dashboard",
    liveUrl: "/dashboard/recruiter",
  },
  {
    title: "VerdictOS",
    subtitle: "Startup Validation Platform",
    status: "Built",
    category: "AI Product",
    description:
      "An automated startup validation platform providing structured market research, competitor analysis, risk evaluation, pricing strategies, and MVP growth planning.",
    stack: ["React", "Node.js", "Google Gemini API", "Tavily API", "Express.js"],
    impact: "Combines market intelligence data into automated business validation reports.",
  },
  {
    title: "Rajpoot Associates Website",
    subtitle: "Client Business Website",
    status: "Live",
    category: "Client Work",
    description:
      "A fully responsive production website built for a commercial client featuring service catalogs, inquiry workflows, SEO optimization, and mobile-first design.",
    stack: ["React", "Node.js", "MongoDB"],
    impact: "Delivered and deployed a live commercial website for client business operations.",
    liveLabel: "Live Website",
    liveUrl: "https://rajpootassociates.in",
  },
  {
    title: "Smart Asset Tracking & Inventory Management System",
    subtitle: "IoT Inventory System",
    status: "Built",
    category: "IoT",
    description:
      "An IoT-based inventory tracking system using ESP32 microcontrollers and RFID technology to monitor real-time asset movements, sync records with Google Sheets, and stream telemetry to ThingsBoard.",
    stack: ["ESP32", "MFRC522 RFID", "Arduino", "Google Sheets API", "ThingsBoard"],
    impact: "Bridges embedded hardware sensors, cloud sync workflows, and operational tracking.",
  },
  {
    title: "Plant Disease Detection System",
    subtitle: "Computer Vision Application",
    status: "Built",
    category: "AI/ML",
    description:
      "A computer vision application using deep Convolutional Neural Networks (CNNs) to detect plant diseases from leaf imagery, aiding early agricultural diagnosis.",
    stack: ["Python", "TensorFlow", "OpenCV", "CNN"],
    impact: "Applies deep learning models to automated agricultural health diagnostics.",
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
  { label: "Achievements", href: "#achievements", type: "anchor", icon: <FaAward /> },
  { label: "Projects", href: "#projects", type: "anchor", icon: <FaRocket /> },
  { label: "Dashboard", href: "/dashboard", type: "route", icon: <FaChartLine /> },
  { label: "Activity", href: "#activity", type: "anchor", icon: <FaBolt /> },
  { label: "Skills", href: "#skills", type: "anchor", icon: <FaBrain /> },
  { label: "Resume", href: "/resume.pdf", type: "external", icon: <FaFileAlt /> },
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
          <img src={logoImage} alt="Aakash Kumar Logo" className="brand-logo-img" />
          <span className="brand-copy">
            <strong>Aakash Kumar</strong>
          </span>
        </Link>

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
            <FaBriefcase /> Recruiter View
          </Link>
        </div>

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
      </div>

      <div id="home-mobile-nav" className={`topbar-mobile-panel ${menuOpen ? "is-open" : ""}`}>
        <nav className="topnav topnav-mobile">
          {homeNavLinks.map((link) => {
            const itemContent = (
              <>
                <span className="nav-item-icon">{link.icon}</span>
                <span className="nav-item-label">{link.label}</span>
              </>
            );

            if (link.type === "route") {
              return (
                <Link key={link.label} to={link.href} onClick={closeMenu} className="nav-mobile-link">
                  {itemContent}
                </Link>
              );
            }

            if (link.type === "external") {
              return (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" onClick={closeMenu} className="nav-mobile-link">
                  {itemContent}
                </a>
              );
            }

            return (
              <a key={link.label} href={link.href} onClick={closeMenu} className="nav-mobile-link">
                {itemContent}
              </a>
            );
          })}
        </nav>

        <div className="topbar-actions topbar-actions-mobile">
          <Link className="nav-cta" to="/dashboard/recruiter" onClick={closeMenu}>
            <FaBriefcase /> Recruiter View
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
              <h2>Achievements & Recognition</h2>
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
              <h2>Connect with Me</h2>
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
              <h2>Featured Projects</h2>
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
              <h2>Recent Activity</h2>
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
              <h2>Technical Skills</h2>
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
            <h2>Contact & Resume</h2>
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
