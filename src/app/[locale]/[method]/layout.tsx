'use client';
import { Loader } from '@/components';
import { useUrl, Params } from '@/Store/useUrlStore';
import { useParams, useSearchParams } from 'next/navigation';
import { lazy, ReactNode, Suspense, useEffect } from 'react';

const Query = lazy(() => import('@/components/Query/Query'));
const Response = lazy(() => import('@/components/Response/Response'));

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
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
      <Suspense fallback={<Loader />}>
        <Query />
        <Response />
      </Suspense>
      {children}
    </>
  );
}
