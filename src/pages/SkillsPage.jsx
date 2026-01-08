import Navbar from "../components/Navbar";
import "./SkillsPage.css";

export default function SkillsPage() {
  return (
    <>
      <Navbar />

      <div className="skills-page">

        {/* HERO */}
        <section className="skills-hero">
          <h1>Skills</h1>
          <p>
            Not just tools — my real strength is how I think, solve and grow.
          </p>
        </section>

        {/* CORE STRENGTHS */}
        <section className="skills-core">
          <div className="core-card">
            <h2>Problem Solving</h2>
            <p>
              I approach problems analytically — breaking them into smaller parts,
              identifying patterns and building solutions step by step.
              My journey with DSA has shaped how I think, not just how I code.
            </p>
          </div>

          <div className="core-card">
            <h2>Critical Thinking</h2>
            <p>
              I don’t jump to solutions. I first understand constraints, edge cases
              and trade-offs. This helps me write code that is not only correct,
              but also reliable.
            </p>
          </div>

          <div className="core-card">
            <h2>Consistency & Discipline</h2>
            <p>
              Solving problems daily taught me that growth comes from consistency.
              This mindset reflects in everything I build — steady progress,
              not shortcuts.
            </p>
          </div>
        </section>

        {/* TECH IN CONTEXT */}
        <section className="skills-tech">
          <h2>Technical Foundation</h2>

          <div className="tech-grid">
            <div className="tech-card">
              <h3>Programming</h3>
              <p>
                Comfortable working with core programming concepts —
                loops, conditions, data structures and algorithms.
                I focus more on logic than syntax.
              </p>
            </div>

            <div className="tech-card">
              <h3>Web Development</h3>
              <p>
                I build clean and functional interfaces using React,
                and connect them with backend services to create
                meaningful real-world applications.
              </p>
            </div>

            <div className="tech-card">
              <h3>Version Control</h3>
              <p>
                I use Git & GitHub to track progress, collaborate and
                maintain clean project history — treating every project
                like production work.
              </p>
            </div>

            <div className="tech-card">
              <h3>Learning Ability</h3>
              <p>
                My strongest skill is learning new things quickly —
                understanding concepts deeply instead of memorizing syntax.
              </p>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="skills-note">
          <p>
            I don’t define myself by the number of technologies I know,
            but by how well I can understand a problem and build a solution.
            My goal is to grow into a dependable software engineer who brings
            clarity, consistency and quality to every team.
          </p>
        </section>

      </div>
    </>
  );
}
