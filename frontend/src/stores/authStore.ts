import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/api';

interface User {
  id: number;
  email: string;
  full_name: string | null;
  is_active: boolean;
  is_superuser: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, fullName?: string) => Promise<boolean>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // OAuth2 form data format
          const formData = new URLSearchParams();
          formData.append('username', email);
          formData.append('password', password);

          const response = await api.post('/auth/login', formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          });

          const { access_token } = response.data;
          localStorage.setItem('access_token', access_token);

          set({ token: access_token, isAuthenticated: true, isLoading: false });

          // Fetch user data
          await get().fetchUser();
          return true;
        } catch (error: any) {
          const message = error.response?.data?.detail || 'Giriş başarısız';
          set({ error: message, isLoading: false });
          return false;
        }
      },

      register: async (email: string, password: string, fullName?: string) => {
        set({ isLoading: true, error: null });
        try {
          await api.post('/auth/register', {
            email,
            password,
            full_name: fullName,
          });

          set({ isLoading: false });
          return true;
        } catch (error: any) {
          const message = error.response?.data?.detail || 'Kayıt başarısız';
          set({ error: message, isLoading: false });
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem('access_token');
        set({ user: null, token: null, isAuthenticated: false, error: null });
      },

      fetchUser: async () => {
        try {
          const response = await api.get('/auth/me');
          set({ user: response.data });
        } catch (error) {
          get().logout();
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
