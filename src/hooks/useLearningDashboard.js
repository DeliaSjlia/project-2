import { useEffect, useState } from "react";
import { subscribeToExerciseCompletions } from "../services/exerciseCompletionService.js";
import { getDashboardStats } from "../utils/dashboardStats.js";

export default function useLearningDashboard(userId) {
  const [result, setResult] = useState(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!userId) return;
    let active = true;
    const unsubscribe = subscribeToExerciseCompletions(userId,
      (data) => { if (active) setResult({ userId, ...data, error: null }); },
      (error) => { if (active) setResult({ userId, completions: [], fromCache: false, error }); },
    );
    return () => { active = false; unsubscribe(); };
  }, [userId]);

  useEffect(() => {
    // Recalculate the streak across midnight even without a new completion.
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    const update = () => setNow(new Date());
    window.addEventListener("focus", update);
    return () => { window.clearInterval(timer); window.removeEventListener("focus", update); };
  }, []);

  const current = result?.userId === userId ? result : null;
  return {
    isLoading: Boolean(userId) && current === null,
    error: current?.error,
    fromCache: current?.fromCache ?? false,
    ...getDashboardStats(current?.completions ?? [], now),
  };
}
