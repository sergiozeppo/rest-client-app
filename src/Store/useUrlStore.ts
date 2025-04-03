import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Params = Record<string, string>;

type Url = {
  method: string;
  locale: string;
  urlBase: string;
  params: Params;
  query: Params;
  // eslint-disable-next-line
  setParams: (params: Params) => void;
  // eslint-disable-next-line
  setQuery: (query: Params) => void;
};

export const useUrl = create<Url>()(
  devtools(
    (set) => ({
      method: '',
      locale: '',
      urlBase: '',
      params: {},
      query: {},
      setParams: (params) => {
        set((state) => ({
          locale: params.locale || 'en',
          params: params || {},
          method: params?.method.toUpperCase() || 'GET',
          urlBase: `/${params?.method || state.method}/${params.url || ''}`,
        }));
      },
      setQuery: (query) => set({ query }),
    }),
    { name: 'useUrl' }
  )
);
