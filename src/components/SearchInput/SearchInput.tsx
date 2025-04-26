'use client';
import { KeyboardEvent, useEffect, useTransition, useState } from 'react';
import styles from './SearchInput.module.scss';
import { useUrl } from '@/Store/useUrlStore';
import { useRouter } from '@/i18n/navigation';
import { useFetch } from '@/Store/useFetch';
import { useTranslations } from 'next-intl';
import { encodeBase64 } from '@/utils/base64';
import { replaceVariables } from '@/utils/variables/variableInsert';
import { useHeadersBody } from '@/Store/useHeadersBody';

export default function SearchInput() {
  const bodyBase64 = useHeadersBody((store) => store.bodyBase64);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { params, value, setValueBase } = useUrl();
  const fetch = useFetch((state) => state.fetch);
  const t = useTranslations('ButtonGO');

  const [inputValue, setInputValue] = useState(value ?? '');

  useEffect(() => {
    setInputValue(value ?? '');
  }, [value]);

  const normalizeUrl = (input: string): string | null => {
    const trimmed = input.trim();
    if (!trimmed || trimmed === 'http://' || trimmed === 'https://') {
      return null;
    }
    return /^(http|https):\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  const handleInput = (url: string) => {
    const inputUrl = normalizeUrl(url);
    if (!inputUrl) {
      return router.push({
        pathname: `/${params.method || 'get'}/_/${bodyBase64 || ''}`,
      });
    }

    try {
      const { origin, pathname, searchParams } = new URL(inputUrl);
      const base64 = encodeBase64(origin + pathname);
      setValueBase(origin + pathname);
      router.push({
        pathname: `/${params.method || 'get'}/${base64}/${bodyBase64 || ''}`,
        query: Object.fromEntries(searchParams.entries()),
      });
    } catch {
      router.replace({
        pathname: `/${params.method || 'get'}/_/${bodyBase64 || ''}`,
      });
    }
  };

  const submit = () => {
    const processedUrl = replaceVariables(inputValue);
    handleInput(processedUrl);
    startTransition(() => {
      fetch(processedUrl);
    });
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      submit();
    }
  };

  const handleBlur = () => {
    const processedUrl = replaceVariables(inputValue);
    handleInput(processedUrl);
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isPending}
        onBlur={handleBlur}
        onKeyDown={handleEnter}
        className={styles.input}
      />
      <button onClick={submit} className={styles.btn}>
        {t('go')}
      </button>
    </>
  );
}
