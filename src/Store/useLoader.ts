import { useEffect, useState } from 'react';
import { useFetch } from '@/Store/useFetch';

export function useLoader() {
  const isLoading = useFetch((state) => state.isLoading);
  const [loadingState, setLoadingState] = useState(isLoading);

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  return loadingState;
}
