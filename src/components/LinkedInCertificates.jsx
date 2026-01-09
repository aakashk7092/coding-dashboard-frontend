import "./LinkedInCertificates.css";

import genAI from "../assets/LinkedInGenAi.png";
import htmlCert from "../assets/LinkedInHTML.png";

export default function LinkedInCertificates() {
  return (
    <div className="linkedin-wrap">

      <h4 className="linkedin-title">Learning & Certifications</h4>

      <div className="linkedin-grid">
        <div className="linkedin-card">
          <img src={genAI} alt="Generative AI Certificate" />
          <h5>What is Generative AI?</h5>
          <p>LinkedIn Learning · Apr 2025</p>
        </div>

        <div className="linkedin-card">
          <img src={htmlCert} alt="HTML Certificate" />
          <h5>HTML Essential Training</h5>
          <p>LinkedIn Learning · Jun 2025</p>
        </div>
      </div>

    </div>
  );
}
