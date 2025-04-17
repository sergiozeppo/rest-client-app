import { decodeBase64 } from '@/utils/base64';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
export type Params = {
  locale: string;
  method: string;
  url: string;
};
type Query = Record<string, string>;
type QueryItem = { checked: boolean; id: string; key: string; value: string };
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
  setValueBase: (value: string) => void;
  QueryItems: QueryItem[];
  // eslint-disable-next-line
  setParams: (params: Params) => void;
  // eslint-disable-next-line
  setQuery: (query: Query, replace?: boolean) => void;
  // eslint-disable-next-line
  setChecked: (id: string) => void;
  // eslint-disable-next-line
  setValue: (value: string, id: string) => void;
  // eslint-disable-next-line
  setKey: (key: string, id: string) => void;
  // eslint-disable-next-line
  delValue: (id: string) => void;
  addItem: () => void;
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
      QueryItems: [],
      setParams: (params) => {
        const valueBase = decodeBase64(params);
        set((state) => ({
          locale: params.locale || 'en',
          params: params || {},

          method: params?.method?.toUpperCase() || 'get',
          urlBase: `/${params?.method || state.method}/${params.url || ''}`,
          valueBase,
          value: valueBase + state.queryBase,
        }));
      },
      setQuery: (query, replace = true) => {
        const queryBase =
          Object.keys(query).length > 0
            ? `?${new URLSearchParams(query).toString()}`
            : '';

        const QueryItems = Object.entries(query).map(([key, value]) => ({
          checked: true,
          id: nanoid(),
          key,
          value,
        }));

        if (replace) {
          set((state) => ({
            query,
            queryBase,
            value: state.valueBase + queryBase,
            QueryItems,
          }));
        } else {
          set((state) => ({
            query,
            queryBase,
            value: state.valueBase + queryBase,
          }));
        }
      },

      setChecked(id) {
        set((store) => ({
          QueryItems: store.QueryItems.map((i) =>
            i.id === id ? { ...i, checked: !i.checked } : i
          ),
        }));
      },

      setValueBase: (valueBase) => {
        set((state) => ({
          valueBase,
          value: valueBase + state.queryBase,
        }));
      },

      setValue(value, id) {
        set((store) => ({
          QueryItems: store.QueryItems.map((i) =>
            i.id === id ? { ...i, value } : i
          ),
        }));
      },

      setKey(key, id) {
        set((store) => ({
          QueryItems: store.QueryItems.map((i) =>
            i.id === id ? { ...i, key } : i
          ),
        }));
      },

      delValue(id) {
        set((store) => ({
          QueryItems: store.QueryItems.filter((i) => i.id !== id),
        }));
      },

      addItem: () => {
        set((store) => ({
          QueryItems: store.QueryItems.concat({
            checked: false,
            id: nanoid(),
            key: '',
            value: '',
          }),
        }));
      },
    }),
    { name: 'useUrl' }
  )
);
