import { create } from 'zustand';
import { useUserStore } from './userStore';
import { logoutRequest } from '@/api/auth';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('access_token'),
  setToken: (token) => {
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
    set({ token });
  },
  logout: async () => {
    await logoutRequest();
    localStorage.removeItem('access_token');
    useUserStore.getState().clearUserData();
    set({ token: null });
  },
}));
