import "./ProfileHeader.css";
import profilePic from "../assets/profile.jpg"; // apni photo ka path check karna

export default function ProfileHeader() {
  return (
    <div className="profile-hero">
      <img src={profilePic} alt="Profile" className="profile-pic" />

      <div className="profile-info">
        <h1>Aakash Kumar</h1>

        <p className="profile-role">
          Aspiring Software Engineer | DSA & Full-Stack Projects
        </p>

        <a
          href="mailto:aakashk7092@gmail.com"
          className="profile-email"
        >
          aakashk7092@gmail.com
        </a>
      </div>
    </div>
  );
}
