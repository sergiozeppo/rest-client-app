import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type Params = {
  locale?: string;
  method?: string;
  url?: string;
};
type Query = Record<string, string>;

type Url = {
  method: string;
  locale: string;
  urlBase: string;
  params: Params;
  query: Query;
  // eslint-disable-next-line
  setParams: (params: Params) => void;
  // eslint-disable-next-line
  setQuery: (query: Query) => void;
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
