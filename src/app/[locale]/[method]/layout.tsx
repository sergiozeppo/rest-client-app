'use client';
import { Query, Response } from '@/components';
import { useUrl, Params } from '@/Store/useUrlStore';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

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

  return (
    <>
      <Query />
      <Response />
    </>
  );
}
