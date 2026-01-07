import "./ExperienceTimeline.css";

export default function ExperienceTimeline() {
  const experiences = [
    {
      year: "2025 – Present",
      title: "Learning Full-Stack Development",
      desc: "Building real-world projects using React, Node.js and REST APIs. Focused on clean UI and scalable backend."
    },
    {
      year: "2024",
      title: "DSA & Competitive Programming",
      desc: "Strengthened problem-solving skills by practicing Data Structures & Algorithms on LeetCode and HackerRank."
    },
    {
      year: "2023",
      title: "Started Coding Journey",
      desc: "Began with C++ and fundamentals of programming, gradually moving towards software engineering."
    }
  ];

  return (
    <div className="timeline-card">
      <h2>Experience & Journey</h2>

      <div className="timeline">
        {experiences.map((item, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-dot"></div>

            <div className="timeline-content">
              <span className="timeline-year">{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
