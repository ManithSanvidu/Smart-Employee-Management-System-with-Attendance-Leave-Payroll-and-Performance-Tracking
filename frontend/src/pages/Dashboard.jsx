import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/Navbar";
import { useSessionTracker } from "../utils/sessionTracker";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sessionTracker = useSessionTracker();

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          startTime={sessionTracker.startTime}
          lastActivityTime={sessionTracker.lastActivityTime}
          sessionDurationMinutes={sessionTracker.sessionDurationMinutes}
          idleSeconds={sessionTracker.idleSeconds}
          isIdle={sessionTracker.isIdle}
          hasEnded={sessionTracker.hasEnded}
          onLogout={sessionTracker.endSession}
        />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
