import { useEffect, useState } from "react";
import { subscribeToAuth, logOut } from "../services/authService.js";

export function useAuth() {
  const [user, setUser] = useState(undefined);

  useEffect(() => subscribeToAuth(setUser), []);

  return {
    user,
    isAuthenticated: Boolean(user),
    isLoading: user === undefined,
    logOut,
  };
}
