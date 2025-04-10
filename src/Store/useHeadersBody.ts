import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type HeaderType = 'application/json' | 'text/plain';

interface HeadersBodyStore {
  header: HeaderType;
  body: string;
  // eslint-disable-next-line
  setHeaders: (header: HeaderType) => void;
  // eslint-disable-next-line
  setBody: (body: string) => void;
}

export const useHeadersBody = create<HeadersBodyStore>()(
  devtools(
    (set) => ({
      header: 'application/json',
      body: '',
      setHeaders: (header) => set({ header }),
      setBody: (body) => set({ body }),
    }),
    { name: 'useHeadersBody' }
  )
);
