import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";

export default function ContactPage() {
  return (
    <>
      {/* 🔝 Navbar */}
      <Navbar />

      <div style={{ padding: "40px 20px" }}>
        <ContactSection />
      </div>
    </>
  );
}
