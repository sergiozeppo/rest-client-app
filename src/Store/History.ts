import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

type HistoryStore = {
  history: { id: string; method: string; url: string }[];
  // eslint-disable-next-line
  setHistory: (method: string, url: string) => void;
  // eslint-disable-next-line
  delHistory: (id: string) => void;
  delAllHistory: () => void;
};

export const useHistory = create<HistoryStore>()(
  devtools(
    persist(
      (set) => ({
        history: [],
        setHistory: (method, url) =>
          set((state) => {
            if (
              state.history.find(
                (item) => item.url === url && item.method === method
              )
            ) {
              return state;
            }
            return {
              history: [...state.history, { id: nanoid(), method, url }],
            };
          }),
        delHistory: (id) =>
          set((state) => ({
            history: [...state.history.filter((item) => item.id !== id)],
          })),
        delAllHistory: () => set(() => ({ history: [] })),
      }),
      { name: 'history' }
    ),
    { name: 'history' }
  )
);
