import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AchievementsPage from "./pages/AchievementsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/achievements" element={<AchievementsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
