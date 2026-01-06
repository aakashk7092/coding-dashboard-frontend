import "./Skills.css";
import {
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiCplusplus, SiJavascript, SiMysql } from "react-icons/si";

export default function Skills({ onSelectSkill }) {
  const skills = [
    { name: "C++", icon: <SiCplusplus />, color: "#22c55e" },
    { name: "Java", icon: <FaJava />, color: "#f97316" },
    { name: "HTML", icon: <FaHtml5 />, color: "#e34c26" },
    { name: "CSS", icon: <FaCss3Alt />, color: "#264de4" },
    { name: "JavaScript", icon: <SiJavascript />, color: "#facc15" },
    { name: "Python", icon: <FaPython />, color: "#38bdf8" },
    { name: "React", icon: <FaReact />, color: "#61dafb" },
    { name: "SQL", icon: <SiMysql />, color: "#0ea5e9" },
  ];

  return (
    <div className="skills-section">
      <h2 className="skills-title">Tech Stack</h2>

      <div className="skills-grid">
        {skills.map((skill) => (
          <button
            key={skill.name}
            className="skill-card"
            style={{ "--glow": skill.color }}
            onClick={() => onSelectSkill(skill.name)}
          >
            <div className="skill-icon">{skill.icon}</div>
            <span className="skill-name">{skill.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
