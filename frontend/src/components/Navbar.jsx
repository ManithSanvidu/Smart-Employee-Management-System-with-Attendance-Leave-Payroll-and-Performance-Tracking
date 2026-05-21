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
    <header className="bg-white px-6 py-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start justify-between gap-4 xl:min-w-[250px]">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Smart session tracking starter for Member 6</p>
          </div>

          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? "x" : "="}
          </button>
        </div>

        <div className="flex flex-col gap-4 xl:flex-1 xl:flex-row xl:items-center xl:justify-end">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3 xl:w-full xl:max-w-[540px]">
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock3 size={15} />
                <span>Session Start</span>
              </div>
              <p className="mt-2 text-lg font-semibold leading-none text-slate-800">{formatTime(startTime)}</p>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Activity size={15} />
                <span>Last Activity</span>
              </div>
              <p className="mt-2 text-lg font-semibold leading-none text-slate-800">
                {formatTime(lastActivityTime)}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-slate-500">Status</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClassName}`}>
                  {statusLabel}
                </span>
              </div>
              <p className="mt-2 text-base font-semibold leading-snug text-slate-800">
                {sessionDurationMinutes} min active session
              </p>
              <p className="mt-1 text-xs text-slate-500">Idle timer: {idleSeconds}s</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 xl:justify-end xl:pl-2">
            <div className="text-right leading-tight">
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-gray-500">HR Manager</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
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
      </div>
    </header>
  );
};

export default Navbar;
