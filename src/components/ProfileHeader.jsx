import "./ProfileHeader.css";
import profilePic from "../assets/profile.jpg";

export default function ProfileHeader() {
  return (
    <div className="profile-header">
      <div className="profile-left">
        <img
          src={profilePic}
          alt="Profile"
          className="profile-img"
        />
      </div>

      <div className="profile-right">
        <h1 className="profile-name">Aakash Kumar</h1>
        <p className="profile-role">
          Aspiring Software Engineer • DSA • Web Development
        </p>

        <div className="resume-buttons">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn view-btn"
          >
            View Resume
          </a>

          <a
            href="/resume.pdf"
            download="Aakash_Kumar_Resume.pdf"
            className="btn download-btn"
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}
