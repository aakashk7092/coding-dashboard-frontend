import { BrowserRouter, Route, Routes } from "react-router-dom";
import PortfolioHome from "./pages/PortfolioHome.jsx";
import DeveloperDashboard from "./pages/DeveloperDashboard.jsx";
import RecruiterDashboard from "./pages/RecruiterDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/dashboard" element={<DeveloperDashboard />} />
        <Route path="/dashboard/recruiter" element={<RecruiterDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
