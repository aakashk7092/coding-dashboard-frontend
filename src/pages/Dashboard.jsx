import { useState } from "react";
import "./Dashboard.css";

import Navbar from "../components/Navbar";
import ProfileHeader from "../components/ProfileHeader";
import PlatformBar from "../components/PlatformBar";
import PlatformDetails from "../components/PlatformDetails";
import Skills from "../components/Skills";
import AboutMe from "../components/AboutMe";

export default function Dashboard() {
  const [platform, setPlatform] = useState(null);

  return (
    <div className="dashboard" id="home">
      <Navbar />

      {/* HERO */}
      <section className="dash-hero">
        <ProfileHeader />
      </section>

      {/* PLATFORM SECTION */}
      <section className="dash-platform">
        <PlatformBar onSelect={setPlatform} />
        <PlatformDetails platform={platform} />
      </section>

      {/* TECH STACK */}
      <section className="dash-tech">
        <Skills />
      </section>

      {/* ABOUT ME */}
      <section className="dash-about">
        <AboutMe />
      </section>
    </div>
  );
}
