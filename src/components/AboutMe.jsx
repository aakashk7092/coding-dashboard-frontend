import "./AboutMe.css";

export default function AboutMe() {
  return (
    <section className="about-pro">
      <h2 className="about-title">About Me</h2>

      <p className="about-intro">
        I’m a passionate software engineering student focused on building
        strong foundations in Data Structures, Algorithms, and Full-Stack
        Development. I believe in consistency over shortcuts and real-world
        problem solving over tutorials.
      </p>

      <div className="about-highlights">
        <div className="highlight-card">
          <h3>Mindset</h3>
          <p>
            I don’t chase trends — I build fundamentals. My focus is on
            becoming a reliable engineer who can ship, debug, and scale.
          </p>
        </div>

        <div className="highlight-card">
          <h3>Approach</h3>
          <p>
            I learn by building. Every concept is tested through projects,
            not just notes or videos.
          </p>
        </div>

        <div className="highlight-card">
          <h3>Goal</h3>
          <p>
            To grow into a professional software engineer who delivers
            clean, maintainable, and impactful solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
