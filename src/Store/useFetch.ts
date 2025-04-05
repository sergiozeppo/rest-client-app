import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useUrl } from './useUrlStore';

type Response = {
  response: object;
  headers: object;
  status: number;
  time: number;
  size: number;
  error: string | null;
  // eslint-disable-next-line no-unused-vars
  fetch: (e?: string) => void;
};

export const useFetch = create<Response>()(
  devtools(
    (set) => ({
      response: [],
      headers: '',
      status: 0,
      time: 0,
      size: 0,
      error: null,

      fetch: async (url) => {
        const method = useUrl.getState().method;
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
          size: 1024,
        });
      },
    }),
    { name: 'useFetch' }
  )
);
