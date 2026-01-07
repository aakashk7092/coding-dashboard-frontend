import { useState, useEffect } from "react";
import "./Navbar.css";

import leetcodeIcon from "../assets/leetcode.png";
import githubIcon from "../assets/github.png";
import linkedinIcon from "../assets/linkedin.png";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const closeMenu = () => setOpen(false);

  // shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section highlight
  useEffect(() => {
    const sections = [
      "home",
      "skills",
      "platform",
      "experience",
      "achievements",
      "projects",
      "contact"
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">

        {/* BRAND */}
        <div className="nav-brand">
          <img src={logo} alt="Logo" className="nav-logo-img" />

          {/* mini icons */}
          <div className="nav-mini-icons">
            <a
              href="https://leetcode.com/aakashkumar2005/"
              target="_blank"
              rel="noreferrer"
              title="LeetCode"
            >
              <img src={leetcodeIcon} alt="LeetCode" />
            </a>

            <a
              href="https://github.com/aakashk7092"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
            >
              <img src={githubIcon} alt="GitHub" />
            </a>

            <a
              href="https://www.linkedin.com/in/aakash-kumar-aa3093315/"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
            >
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="nav-links">
          <a href="#home" className={`nav-btn ${active==="home"?"active":""}`}>Home</a>
          <a href="#skills" className={`nav-btn ${active==="skills"?"active":""}`}>Skills</a>
          <a href="#platform" className={`nav-btn ${active==="platform"?"active":""}`}>Platforms</a>
          <a href="#experience" className={`nav-btn ${active==="experience"?"active":""}`}>Experience</a>
          <a href="#achievements" className={`nav-btn ${active==="achievements"?"active":""}`}>Achievements</a>
          <a href="#projects" className={`nav-btn ${active==="projects"?"active":""}`}>Projects</a>
          <a href="#contact" className={`nav-btn ${active==="contact"?"active":""}`}>Contact</a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="nav-resume"
          >
            Resume
          </a>
        </nav>

        {/* MOBILE HAMBURGER */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="mobile-menu">
          <a onClick={closeMenu} href="#home">Home</a>
          <a onClick={closeMenu} href="#skills">Skills</a>
          <a onClick={closeMenu} href="#platform">Platforms</a>
          <a onClick={closeMenu} href="#experience">Experience</a>
          <a onClick={closeMenu} href="#achievements">Achievements</a>
          <a onClick={closeMenu} href="#projects">Projects</a>
          <a onClick={closeMenu} href="#contact">Contact</a>

          <a
            onClick={closeMenu}
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="mobile-resume"
          >
            View Resume
          </a>
        </div>
      )}
    </header>
  );
}
