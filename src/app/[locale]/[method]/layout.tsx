'use client';
import { useUrl } from '@/Store/useUrlStore';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type Params = Record<string, string>;
export default function Layout() {
  const params: Params = useParams();
  const searchParams = Object.fromEntries(useSearchParams().entries());

  const setParams = useUrl((store) => store.setParams);
  const setQuery = useUrl((store) => store.setQuery);

  useEffect(() => {
    setParams(params);
  }, [params, setParams]);

  useEffect(() => {
    setQuery(searchParams);
  }, [searchParams, setQuery]);

  return null;
}
