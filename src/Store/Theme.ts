import { Theme } from '@/Context/Provider';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeStore = {
  theme: Theme;
  // eslint-disable-next-line no-unused-vars
  setTheme: (theme: Theme) => void;
};

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'theme' }
  )
);
