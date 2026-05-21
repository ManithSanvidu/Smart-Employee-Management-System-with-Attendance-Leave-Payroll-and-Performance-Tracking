import React from "react";
import { Activity, Clock3, LogOut } from "lucide-react";

const formatTime = (value) => {
  if (!value) {
    return "--";
  }

  return value.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const Navbar = ({
  sidebarOpen,
  onToggleSidebar,
  startTime,
  lastActivityTime,
  sessionDurationMinutes,
  idleSeconds,
  isIdle,
  hasEnded,
  onLogout,
}) => {
  const statusLabel = hasEnded ? "Ended" : isIdle ? "Idle" : "Active";
  const statusClassName = hasEnded
    ? "bg-gray-100 text-gray-700"
    : isIdle
      ? "bg-amber-100 text-amber-700"
      : "bg-emerald-100 text-emerald-700";

  return (
    <header className="bg-white shadow-sm z-10 px-6 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Smart session tracking starter for Member 6
          </p>
        </div>

        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-2xl bg-slate-50 px-4 py-3 min-w-44">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Clock3 size={16} />
              <span>Session Start</span>
            </div>
            <p className="mt-2 font-semibold text-slate-800">{formatTime(startTime)}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3 min-w-44">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Activity size={16} />
              <span>Last Activity</span>
            </div>
            <p className="mt-2 font-semibold text-slate-800">{formatTime(lastActivityTime)}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3 min-w-44">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-slate-500">Status</span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusClassName}`}>
                {statusLabel}
              </span>
            </div>
            <p className="mt-2 font-semibold text-slate-800">{sessionDurationMinutes} min active session</p>
            <p className="text-xs text-slate-500 mt-1">Idle timer: {idleSeconds}s</p>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-between lg:justify-end">
          <div className="text-right">
            <p className="font-medium">Admin User</p>
            <p className="text-sm text-gray-500">HR Manager</p>
          </div>

          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>

          <button
            onClick={onLogout}
            disabled={hasEnded}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <LogOut size={16} />
            {hasEnded ? "Session Ended" : "Logout"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
