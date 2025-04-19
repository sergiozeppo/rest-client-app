import { nanoid } from 'nanoid';
import { toast } from 'sonner';
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
            toast.success('Added to history', { duration: 2000 });
            return {
              history: [...state.history, { id: nanoid(), method, url }],
            };
          }),
        delHistory: (id) => {
          toast.success('Deleted from history');
          set((state) => ({
            history: [...state.history.filter((item) => item.id !== id)],
          }));
        },
        delAllHistory: () => {
          toast.success('Deleted all history');
          set(() => ({ history: [] }));
        },
      }),
      { name: 'history' }
    ),
    { name: 'history' }
  )
);
