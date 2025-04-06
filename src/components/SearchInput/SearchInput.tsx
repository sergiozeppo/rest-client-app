'use client';
import { KeyboardEvent, useRef, useTransition } from 'react';
import styles from './SearchInput.module.scss';
import { useUrl } from '@/Store/useUrlStore';
import { useRouter } from '@/i18n/navigation';
import { useFetch } from '@/Store/useFetch';
import { useTranslations } from 'next-intl';
export default function SearchInput() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { params, value } = useUrl();
  const inputRef = useRef<HTMLInputElement>(null);
  const fetch = useFetch((state) => state.fetch);
  const t = useTranslations('ButtonGO');

  const normalizeUrl = (input: string): string | null => {
    const trimmed = input.trim();
    if (!trimmed || trimmed === 'http://' || trimmed === 'https://') {
      return null;
    }
    return /^(http|https):\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  const handleInput = () => {
    const inputValue = inputRef.current?.value || '';
    const inputUrl = normalizeUrl(inputValue);
    if (!inputUrl) {
      return router.replace({
        pathname: `/${params.method || 'get'}`,
      });
    }

    try {
      const { origin, pathname, search } = new URL(inputUrl);
      const base64 = btoa(encodeURIComponent(origin + pathname));
      router.replace({
        pathname: `/${params.method || 'get'}/${base64}${search}`,
      });
    } catch (error) {
      console.error('Invalid URL:', error);
    }
  };

  const submit = () => {
    const inputValue = inputRef.current?.value || '';
    handleInput();
    startTransition(() => {
      fetch(inputValue);
    });
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      submit();
    }
  };

  return (
    <>
      <input
        type="text"
        ref={inputRef}
        defaultValue={value}
        disabled={isPending}
        onBlur={handleInput}
        onKeyDown={handleEnter}
        className={styles.input}
      />
      <button onClick={submit} className={styles.btn}>
        {t('go')}
      </button>
    </>
  );
}
