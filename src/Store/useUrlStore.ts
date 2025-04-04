import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type Params = {
  locale?: string;
  method: string;
  url: string;
};
type Query = Record<string, string>;

type Url = {
  method: string;
  locale: string;
  urlBase: string;
  queryBase: string;
  valueBase: string;
  value: string;
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
      queryBase: '',
      valueBase: '',
      params: {},
      query: {},
      setParams: (params) => {
        const url = params?.url?.split('%')[0] || '';
        const valueBase = decodeURIComponent(atob(url));
        set((state) => ({
          locale: params.locale || 'en',
          params: params || {},
          method: params?.method.toUpperCase() || 'get',
          urlBase: `/${params?.method || state.method}${params.url || ''}`,
          valueBase,
          value: valueBase + state.queryBase,
        }));
      },
      setQuery: (query) => {
        const queryBase =
          Object.keys(query).length > 0
            ? `?${new URLSearchParams(query).toString()}`
            : '';

        set((state) => ({
          query,
          queryBase: queryBase,
          value: state.valueBase + queryBase,
        }));
      },
    }),
    { name: 'useUrl' }
  )
);
