import { useState } from "react";
import LandingPage from "./components/landingPage";
import Dashboard from "./components/dashboard";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <>
      {showDashboard ? (
        <Dashboard onLogout={() => setShowDashboard(false)} />
      ) : (
        <LandingPage onGetStarted={() => setShowDashboard(true)} />
      )}
    </>
  );
}

export default App;
