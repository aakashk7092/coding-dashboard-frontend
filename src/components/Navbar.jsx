import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

import leetcodeIcon from "../assets/leetcode.png";
import githubIcon from "../assets/github.png";
import linkedinIcon from "../assets/linkedin.png";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setOpen(false);

  // 🔥 scroll animation
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">

        {/* BRAND */}
        <div className="nav-brand">
          <img src={logo} alt="Logo" className="nav-logo-img floating" />

          <div className="nav-mini-icons">
            <a href="https://leetcode.com/aakashkumar2005/" target="_blank" rel="noreferrer">
              <img src={leetcodeIcon} alt="LeetCode" />
            </a>
            <a href="https://github.com/aakashk7092" target="_blank" rel="noreferrer">
              <img src={githubIcon} alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/aakash-kumar-aa3093315/" target="_blank" rel="noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="nav-links">
          <NavLink to="/" className="nav-btn">Home</NavLink>
          <NavLink to="/skills" className="nav-btn">Skills</NavLink>
          <NavLink to="/projects" className="nav-btn">Projects</NavLink>
          <NavLink to="/achievements" className="nav-btn">Achievements</NavLink>
          <NavLink to="/experience" className="nav-btn">Experience</NavLink>
          <NavLink to="/contact" className="nav-btn">Contact</NavLink>

          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="nav-resume">
            Resume
          </a>
        </nav>

        {/* HAMBURGER */}
        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* MOBILE */}
      {open && (
        <div className="mobile-menu slide-in">
          <NavLink onClick={closeMenu} to="/">Home</NavLink>
          <NavLink onClick={closeMenu} to="/skills">Skills</NavLink>
          <NavLink onClick={closeMenu} to="/projects">Projects</NavLink>
          <NavLink onClick={closeMenu} to="/achievements">Achievements</NavLink>
          <NavLink onClick={closeMenu} to="/experience">Experience</NavLink>
          <NavLink onClick={closeMenu} to="/contact">Contact</NavLink>

          <a onClick={closeMenu} href="/resume.pdf" target="_blank" rel="noreferrer" className="mobile-resume">
            View Resume
          </a>
        </div>
      )}
    </header>
  );
}
