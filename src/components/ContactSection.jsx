import "./ContactSection.css";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

export default function ContactSection() {
  return (
    <div className="contact-card" id="contact">
      <h2>Contact Me</h2>

      <p className="contact-sub">
        Have an opportunity, collaboration, or just want to say hi?
        Feel free to reach out.
      </p>

      <div className="contact-grid">
        {/* Email */}
        <a
          href="mailto:aakashk7092@gmail.com"
          className="contact-item"
        >
          <div className="contact-icon email">
            <FaEnvelope />
          </div>
          <div>
            <span>Email</span>
            <p>aakashk7092@gmail.com</p>
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/aakash-kumar-aa3093315/"
          target="_blank"
          rel="noreferrer"
          className="contact-item"
        >
          <div className="contact-icon linkedin">
            <FaLinkedin />
          </div>
          <div>
            <span>LinkedIn</span>
            <p>Connect with me</p>
          </div>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/aakashk7092"
          target="_blank"
          rel="noreferrer"
          className="contact-item"
        >
          <div className="contact-icon github">
            <FaGithub />
          </div>
          <div>
            <span>GitHub</span>
            <p>View my projects</p>
          </div>
        </a>
      </div>
    </div>
  );
}
