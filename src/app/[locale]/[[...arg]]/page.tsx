'use client';
import { Loader } from '@/components';
import { Params, useUrl } from '@/Store/useUrlStore';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { lazy, Suspense, useEffect, useMemo } from 'react';

const Query = lazy(() => import('@/components/Query/Query'));
const Response = lazy(() => import('@/components/Response/Response'));

export default function Page() {
  const params = useParams();
  const { locale } = params;
  const [method, url, ...rest] = params.arg || [];
  if (rest.length > 0) {
    notFound();
  }

  const options = useMemo(
    () => ({ method, locale, url }),
    [method, locale, url]
  );
  const searchParams = Object.fromEntries(useSearchParams().entries());

  const setParams = useUrl((store) => store.setParams);
  const setQuery = useUrl((store) => store.setQuery);

  useEffect(() => {
    setParams(options as Params);
    setQuery(searchParams);
  }, [options, searchParams, setQuery, setParams]);

  return (
    <Suspense fallback={<Loader />}>
      <Query />
      <Response />
    </Suspense>
  );
}
