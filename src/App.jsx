import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AchievementsPage from "./pages/AchievementsPage";
import ExperiencePage from "./pages/ExperiencePage";   // ✅ ADD

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/achievements" element={<AchievementsPage />} />

        {/* ✅ ADD-ON ROUTE */}
        <Route path="/experience" element={<ExperiencePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
