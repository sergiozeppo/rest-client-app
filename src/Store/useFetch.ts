import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useUrl } from './useUrlStore';
import { useHistory } from './History';
import { useHeadersBody } from './useHeadersBody';

type Response = {
  response: object;
  headers: object;
  status: number;
  statusText: string;
  time: number;
  size: string;
  error: string | null;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  fetch: (e?: string) => void;
};

export const useFetch = create<Response>()(
  devtools(
    (set) => ({
      response: null,
      headers: '',
      status: 0,
      statusText: '',
      time: 0,
      size: 0,
      error: null,
      isLoading: false,

      fetch: async (url) => {
        set({ isLoading: true });
        const method = useUrl.getState().method;
        const { header, body } = useHeadersBody.getState();
        const setHistory = useHistory.getState().setHistory;
        const start = Date.now();

        try {
          const res = await fetch('/api', {
            method: 'POST',
            body: JSON.stringify({ url, method, header, body }),
          });
          const data = await res.json();
          const end = Date.now();

          if (url && data.status < 500) setHistory(method, url);

          set({
            response: data.response,
            headers: data.headers,
            status: data.status,
            statusText: data.statusText,
            time: end - start,
            error: data?.error || null,
            size: (
              new Blob([JSON.stringify(data?.response)]).size / 1024
            ).toFixed(2),
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Произошла ошибка',
          });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    { name: 'useFetch' }
  )
);
