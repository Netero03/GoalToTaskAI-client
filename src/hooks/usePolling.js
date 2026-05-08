import { useEffect } from "react";
import api from "../services/api";

/**
 * Basic polling hook for serverless-friendly near real-time sync.
 */
export default function usePolling({ enabled = true, intervalMs = 5000, onData }) {
  useEffect(() => {
    if (!enabled || typeof onData !== "function") return undefined;

    let active = true;

    async function pollOnce() {
      try {
        const res = await api.get("/analytics/updates");
        if (active) onData(res.data);
      } catch {
        // Keep polling even if one request fails.
      }
    }

    pollOnce();
    const id = window.setInterval(pollOnce, intervalMs);

    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, [enabled, intervalMs, onData]);
}
