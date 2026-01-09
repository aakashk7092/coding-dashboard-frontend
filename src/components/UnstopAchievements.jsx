import "./UnstopAchievements.css";

import adobe from "../assets/unstopAdobe.png";
import aiAgent from "../assets/unstopAiAGent.png";
import crack from "../assets/UnstopCrack.png";
import tata from "../assets/unstopTata.png";
import codeRush from "../assets/UndtopPartipation.png";

export default function UnstopAchievements() {
  return (
    <div className="unstop-wrap">

      <h4 className="unstop-title">Competitive Highlights</h4>

      <div className="unstop-grid">
        <div className="unstop-card">
          <img src={crack} alt="Crack the Code" />
          <h5>Crack the Code – C Battle</h5>
          <p>Top Performer · Aug 2025</p>
        </div>

        <div className="unstop-card">
          <img src={adobe} alt="Adobe Hackathon" />
          <h5>Adobe India Hackathon</h5>
          <p>Online MCQ + Coding Round</p>
        </div>

        <div className="unstop-card">
          <img src={aiAgent} alt="AI Agent Hackathon" />
          <h5>AI Agent Hackathon</h5>
          <p>Organized by Product Space</p>
        </div>

        <div className="unstop-card">
          <img src={tata} alt="Tata Crucible" />
          <h5>Tata Crucible Campus Quiz</h5>
          <p>Participant · 2025</p>
        </div>

        <div className="unstop-card">
          <img src={codeRush} alt="CodeRush" />
          <h5>CodeRush Weekly</h5>
          <p>50 & 100 Days Consistency</p>
        </div>
      </div>

    </div>
  );
}
