import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "sems-session";
const DEFAULT_IDLE_TIMEOUT = 60 * 1000;
const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];

const getInitialSession = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const savedSession = window.sessionStorage.getItem(STORAGE_KEY);

  if (savedSession) {
    try {
      return JSON.parse(savedSession);
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }

  const now = new Date().toISOString();
  const newSession = {
    startTime: now,
    lastActivityTime: now,
    endedAt: null,
  };

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
  return newSession;
};

export const useSessionTracker = (idleTimeout = DEFAULT_IDLE_TIMEOUT) => {
  const [session, setSession] = useState(() => getInitialSession());
  const [now, setNow] = useState(() => Date.now());
  const hasEndedRef = useRef(false);

  useEffect(() => {
    if (!session || session.endedAt) {
      return undefined;
    }

    const persistSession = (nextSession) => {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
      setSession(nextSession);
    };

    const updateActivity = () => {
      if (hasEndedRef.current) {
        return;
      }

      const nextSession = {
        ...session,
        lastActivityTime: new Date().toISOString(),
      };

      persistSession(nextSession);
    };

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, updateActivity, { passive: true });
    });

    return () => {
      window.clearInterval(intervalId);
      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, updateActivity);
      });
    };
  }, [session]);

  const endSession = () => {
    if (!session || hasEndedRef.current) {
      return;
    }

    hasEndedRef.current = true;

    const nextSession = {
      ...session,
      endedAt: new Date().toISOString(),
    };

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
  };

  const startTime = session?.startTime ? new Date(session.startTime) : null;
  const lastActivityTime = session?.lastActivityTime ? new Date(session.lastActivityTime) : null;
  const endedAt = session?.endedAt ? new Date(session.endedAt) : null;
  const elapsedMs = startTime ? now - startTime.getTime() : 0;
  const idleMs = lastActivityTime ? now - lastActivityTime.getTime() : 0;
  const isIdle = !endedAt && idleMs >= idleTimeout;

  return {
    startTime,
    lastActivityTime,
    endedAt,
    sessionDurationMinutes: Math.max(0, Math.floor(elapsedMs / 60000)),
    idleSeconds: Math.max(0, Math.floor(idleMs / 1000)),
    isIdle,
    hasEnded: Boolean(endedAt),
    endSession,
  };
};
