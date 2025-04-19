'use client';
import { Loader } from '@/components';
import { useRouter } from '@/i18n/navigation';
import { METHODS } from '@/lib/constants';
import { Params, useUrl } from '@/Store/useUrlStore';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { lazy, Suspense, useEffect, useMemo } from 'react';

const Query = lazy(() => import('@/components/Query/Query'));
const Response = lazy(() => import('@/components/Response/Response'));

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const { locale } = params;
  const [method, url, ...rest] = params.arg || [];
  const searchParams = Object.fromEntries(useSearchParams().entries());

  useEffect(() => {
    if (!METHODS.includes(method.toUpperCase())) {
      router.replace({
        pathname: `/get/${url || ''}`,
        query: searchParams,
      });
    }
    // eslint-disable-next-line
  }, [method]);

  if (rest.length > 0) {
    notFound();
  }

  const options = useMemo(
    () => ({ method, locale, url }),
    [method, locale, url]
  );

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
