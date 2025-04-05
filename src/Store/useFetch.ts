import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useUrl } from './useUrlStore';

type Response = {
  response: object;
  headers: object;
  status: number;
  time: number;
  size: number;
  fetch: () => void;
};

export const useFetch = create<Response>()(
  devtools(
    (set) => ({
      response: [],
      headers: '',
      status: 0,
      time: 0,
      size: 0,

      fetch: async () => {
        const { value } = useUrl.getState();
        const start = Date.now();
        const res = await fetch(value);
        const data = await res.json();
        const end = Date.now();

        set({
          response: data,
          headers: res.headers,
          status: res.status,
          time: end - start,
          size: 1024,
        });
      },
    }),
    { name: 'useFetch' }
  )
);
