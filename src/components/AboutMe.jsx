import "./AboutMe.css";

export default function AboutMe() {
  return (
    <div className="about-card">
      <h2>About Me</h2>

      <p>
        I am an aspiring Software Engineer with strong interest in
        Data Structures & Algorithms and full-stack development.
        I enjoy building real-world projects, solving complex
        problems, and continuously improving my coding skills.
      </p>

      <p>
        I actively practice DSA on platforms like LeetCode and
        HackerRank, and I love working on projects that combine
        clean UI with solid backend logic.
      </p>

      <a
        href="/Aakash_Kumar_Resume.pdf"
        download
        className="resume-btn"
      >
        ⬇ Download Resume
      </a>
    </div>
  );
}
