import { useState, useRef } from "react";
import "./Dashboard.css";

import Navbar from "../components/Navbar";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import ProfileHeader from "../components/ProfileHeader";
import PlatformBar from "../components/PlatformBar";
import PlatformDetails from "../components/PlatformDetails";
import Projects from "../components/Projects";
import ExperienceTimeline from "../components/ExperienceTimeline"; // ✅ SAME FILE
import Achievements from "../components/Achievements";
import ContactSection from "../components/ContactSection";

export default function Dashboard() {
  const [platform, setPlatform] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const platformRef = useRef(null);
  const projectsRef = useRef(null);

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    setTimeout(() => {
      projectsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handlePlatformSelect = (p) => {
    setPlatform(p);
    setTimeout(() => {
      platformRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="dashboard" id="home">
      <Navbar />

      {/* HERO */}
      <ProfileHeader />

      {/* SKILLS */}
      <div id="skills">
        <Skills onSelectSkill={handleSkillSelect} />
      </div>

      {/* MAIN GRID */}
      <div className="section header-grid">
        {/* LEFT */}
        <div>
          <PlatformBar onSelect={handlePlatformSelect} />

          <div ref={platformRef} id="platform">
            <PlatformDetails platform={platform} />
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <AboutMe />

          {/* 🔥 EXPERIENCE PREVIEW */}
          <div id="experience">
            <ExperienceTimeline />
          </div>

          {/* 🔥 ACHIEVEMENTS PREVIEW */}
          <div id="achievements">
            <Achievements />
          </div>

          <div id="contact">
            <ContactSection />
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      <div className="section" ref={projectsRef} id="projects">
        <Projects selectedSkill={selectedSkill} />
      </div>
    </div>
  );
}
