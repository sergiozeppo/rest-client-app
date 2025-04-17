'use client';
import { ChangeEvent, useTransition } from 'react';
import styles from './SelectMethod.module.scss';
import { useRouter } from '@/i18n/navigation';
import { useUrl } from '@/Store/useUrlStore';
import { METHODS } from '@/lib/constants';

export default function SelectMethod() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { query, params, method } = useUrl();

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    const method = e.target.value.toLowerCase();
    startTransition(() => {
      router.push({
        pathname: `/${method}/${params.url || ''}`,
        query,
      });
    });
  }

  return (
    <select
      className={styles.select}
      value={method}
      disabled={isPending}
      onChange={handleSelect}
    >
      {METHODS.map((method) => (
        <option key={method} value={method}>
          {method}
        </option>
      ))}
    </select>
  );
}
