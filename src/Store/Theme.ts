import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeStore = {
  theme: 'light' | 'dark';
  setTheme: () => void;
};

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    { name: 'theme' }
  )
);
