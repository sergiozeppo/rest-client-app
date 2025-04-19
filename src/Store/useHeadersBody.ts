import { decodeBase64 } from '@/utils/base64';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type HeaderType = 'application/json' | 'text/plain';

interface HeadersBodyStore {
  header: HeaderType;
  body: string;
  bodyBase64: string;
  // eslint-disable-next-line
  setHeaders: (header: HeaderType) => void;
  // eslint-disable-next-line
  setBody: (bodyBase64: string) => void;
}

export const useHeadersBody = create<HeadersBodyStore>()(
  devtools(
    (set) => ({
      header: 'application/json',
      body: '',
      bodyBase64: '',
      setHeaders: (header) => set({ header }),
      setBody: (bodyBase64) => {
        const body = decodeBase64({ url: bodyBase64 });
        set({ body });
        set({ bodyBase64 });
      },
    }),
    { name: 'useHeadersBody' }
  )
);
