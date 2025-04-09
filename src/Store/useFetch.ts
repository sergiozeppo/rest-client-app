import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useUrl } from './useUrlStore';
import { useHistory } from './History';

type Response = {
  response: object;
  headers: object;
  status: number;
  time: number;
  size: string;
  error: string | null;
  // eslint-disable-next-line no-unused-vars
  fetch: (e?: string) => void;
};

export const useFetch = create<Response>()(
  devtools(
    (set) => ({
      response: 'No response yet. Try to get some data!',
      headers: 'No headers yet. Try to get some data!',
      status: 0,
      time: 0,
      size: 0,
      error: null,

      fetch: async (url) => {
        const method = useUrl.getState().method;
        const setHistory = useHistory.getState().setHistory;
        if (url) setHistory(method, url);
        const start = Date.now();
        const res = await fetch('/api', {
          method: 'POST',
          body: JSON.stringify({ url, method }),
        });
        const data = await res.json();
        const end = Date.now();

        set({
          response: data.response,
          headers: data.headers,
          status: data.status,
          time: end - start,
          error: data?.error || null,
          size: (
            new Blob([JSON.stringify(data?.response)]).size / 1024
          ).toFixed(2),
        });
      },
    }),
    { name: 'useFetch' }
  )
);
