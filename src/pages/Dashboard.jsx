import { useState, useRef } from "react";

import "./Dashboard.css";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import ProfileHeader from "../components/ProfileHeader";
import PlatformBar from "../components/PlatformBar";
import PlatformDetails from "../components/PlatformDetails";
import Projects from "../components/Projects";

export default function Dashboard() {
  const [platform, setPlatform] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // 🔽 scroll targets
  const platformRef = useRef(null);
  const projectsRef = useRef(null);

  // ✅ Skill click → scroll to projects
  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);

    setTimeout(() => {
      projectsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // ✅ Platform click → scroll to platform details
  const handlePlatformSelect = (p) => {
    setPlatform(p);

    setTimeout(() => {
      platformRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="dashboard">
      <ProfileHeader />

      {/* 🔹 Skills */}
      <Skills onSelectSkill={handleSkillSelect} />

      <div className="section header-grid">
        <div>
          <PlatformBar onSelect={handlePlatformSelect} />

          {/* 🔽 Platform scroll target */}
          <div ref={platformRef}>
            <PlatformDetails platform={platform} />
          </div>
        </div>

        <AboutMe />
      </div>

      {/* 🔽 Projects scroll target */}
      <div className="section" ref={projectsRef}>
        <Projects selectedSkill={selectedSkill} />
      </div>
    </div>
  );
}
