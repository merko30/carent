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
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  checkAuth: async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        throw new Error("Not authenticated");
      }
      const user = await res.json();
      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },
}));
