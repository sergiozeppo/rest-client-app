'use client';
import { ChangeEvent, useTransition, KeyboardEvent } from 'react';
import styles from './SearchInput.module.scss';
import { useUrl } from '@/Store/useUrlStore';
import { useRouter } from '@/i18n/navigation';
export default function SearchInput() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { params, value } = useUrl();

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const url = e.target.value.trim();
    if (!url || url === 'http://' || url === 'https://') return;
    const cleanUrl = url.match(/^(http|https):\/\//) ? url : `https://${url}`;
    const { origin, pathname, search } = new URL(cleanUrl);
    const base64 = btoa(encodeURIComponent(origin + pathname));
    router.replace({
      pathname: `/${params.method || 'get'}/${base64}${search}`,
    });
  }

  function handleEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.code === 'Enter') {
      startTransition(async () => {
        try {
          const data = await fetch(value);
          const json = await data?.json();
          console.log(json);
        } catch (error) {
          console.log('error in fetch', error);
        }
      });
    }
  }

  return (
    <input
      disabled={isPending}
      defaultValue={value}
      onChange={handleInput}
      onKeyDown={handleEnter}
      className={styles.input}
      type="text"
      name="search"
    />
  );
}
