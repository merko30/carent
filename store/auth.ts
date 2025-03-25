import { create } from "zustand";

interface User {
  id: number;
  email: string;
  username: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  checkAuth: () => Promise<void>;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  checkAuth: async () => {
    if (get().isAuthenticated) return; // ✅ Prevent unnecessary re-fetching

    try {
      const res = await fetch("/api/auth", { credentials: "include" });

      if (!res.ok) {
        if (res.status === 401) {
          console.warn("User is not authenticated");
        } else {
          console.error("Unexpected error during auth check:", res.status);
        }
        throw new Error("Not authenticated");
      }

      const data = await res.json();
      console.log("User is authenticated:", data);

      set({ user: data?.user, isAuthenticated: true, loading: false });
    } catch (error: any) {
      console.log(error);
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },
  logout: () =>
    fetch("/api/auth/logout", { method: "POST", credentials: "include" })
      .then(() => {
        set({ user: null, isAuthenticated: false });
      })
      .catch((error) => {
        console.error("Failed to logout:", error);
      }),
}));
