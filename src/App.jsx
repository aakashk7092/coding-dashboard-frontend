import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PortfolioHome from "./pages/PortfolioHome.jsx";

const DeveloperDashboard = lazy(() => import("./pages/DeveloperDashboard.jsx"));
const RecruiterDashboard = lazy(() => import("./pages/RecruiterDashboard.jsx"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="dashboard-loading">Loading view...</div>}>
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/dashboard" element={<DeveloperDashboard />} />
          <Route path="/dashboard/recruiter" element={<RecruiterDashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
