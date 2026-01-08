import Navbar from "../components/Navbar";
import "./ProjectsPage.css";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />

      <div className="projects-page">

        {/* HERO */}
        <section className="projects-hero">
          <h1>Projects</h1>
          <p>
            Real-world systems, data-driven work, and core computer science
            implementations — built with consistency and problem-solving mindset.
          </p>
        </section>

        {/* ================= SYSTEM PROJECTS ================= */}
        <section className="proj-section">
          <h2>System & Application Development</h2>

          <div className="proj-grid">

            <div className="proj-card">
              <h3>Student Management System</h3>
              <p>
                Built a complete system to manage students, records, and workflows.
                Focused on clean structure, scalability and real-use scenarios.
              </p>
              <span className="tag">System Design</span>
            </div>

            <div className="proj-card">
              <h3>IoT RFID Asset Tracking</h3>
              <p>
                Developed an RFID-based solution for tracking assets in real time,
                integrated with cloud dashboards for monitoring and control.
              </p>
              <span className="tag">IoT • Automation</span>
            </div>

            <div className="proj-card">
              <h3>Inventory & Asset Management Platform</h3>
              <p>
                End-to-end inventory system to manage assets, logs and movements,
                focused on reliability and operational efficiency.
              </p>
              <span className="tag">IoT • Automation</span>
            </div>

          </div>
        </section>

        {/* ================= DATA & ANALYTICS ================= */}
        <section className="proj-section">
          <h2>Data Analytics & Insights</h2>

          <div className="proj-grid">

            <div className="proj-card">
              <h3>Netflix & IMDb Trend Analysis</h3>
              <p>
                Analyzed large datasets to understand rating patterns,
                genre trends and audience behavior using data visualization.
              </p>
              <span className="tag">Data Analytics</span>
            </div>

            <div className="proj-card">
              <h3>Performance Dashboard</h3>
              <p>
                Built dashboards to visualize coding activity and progress,
                focusing on metrics, consistency and growth tracking.
              </p>
              <span className="tag">Dashboards</span>
            </div>

          </div>
        </section>

        {/* ================= CORE CS ================= */}
        <section className="proj-section">
          <h2>Core Computer Science</h2>

          <div className="proj-grid">

            <div className="proj-card">
              <h3>LRU Cache Implementation</h3>
              <p>
                Implemented Least Recently Used cache using optimal data structures
                to achieve constant time operations.
              </p>
              <span className="tag">DSA</span>
            </div>

            <div className="proj-card">
              <h3>LFU Cache Implementation</h3>
              <p>
                Designed Least Frequently Used cache system handling
                frequency tracking with efficient performance.
              </p>
              <span className="tag">DSA</span>
            </div>

          </div>
        </section>

        {/* ================= PERSONAL ================= */}
        <section className="proj-section">
          <h2>Personal Engineering</h2>

          <div className="proj-grid">

            <div className="proj-card">
              <h3>Developer Portfolio</h3>
              <p>
                Designed and built a professional portfolio to showcase work,
                achievements and growth as a software engineer.
              </p>
              <span className="tag">Personal Brand</span>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}
