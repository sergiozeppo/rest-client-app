import { Theme } from '@/Context/Provider';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeStore = {
  theme: Theme;
  setTheme: () => void;
};

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    { name: 'theme' }
  )
);
