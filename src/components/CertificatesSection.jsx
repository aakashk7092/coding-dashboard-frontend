import "./CertificatesSection.css";

import cert1 from "../assets/cert1.png";
import cert2 from "../assets/cert2.png.png";
import cert3 from "../assets/cert3.png.png";
import cert4 from "../assets/cert4.png.png";

export default function CertificatesSection() {
  return (
    <div className="cert-wrap">

      <h4 className="cert-title">Professional Certifications</h4>

      <div className="cert-grid">
        <div className="cert-card">
          <img src={cert1} alt="Accenture Job Simulation" />
          <h5>Accenture – Software Engineering Simulation</h5>
          <p>Forage · July 2025</p>
        </div>

        <div className="cert-card">
          <img src={cert2} alt="Tata GenAI Analytics" />
          <h5>Tata – GenAI Data Analytics Simulation</h5>
          <p>Forage · July 2025</p>
        </div>

        <div className="cert-card">
          <img src={cert3} alt="Deloitte Cyber Security" />
          <h5>Deloitte – Cyber Job Simulation</h5>
          <p>Forage · July 2025</p>
        </div>

        <div className="cert-card">
          <img src={cert4} alt="Intel AI for All" />
          <h5>Intel – AI for All</h5>
          <p>Skill India · July 2025</p>
        </div>
      </div>

    </div>
  );
}
