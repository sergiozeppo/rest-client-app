'use client';
import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import styles from './LocaleSwitcher.module.scss';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onSwitcher(newLocale: string) {
    const URLParams = new URLSearchParams(searchParams.toString());
    const query = Object.fromEntries(URLParams.entries());
    startTransition(() => {
      router.replace({ pathname, query }, { locale: newLocale });
    });
  }

  return (
    <select
      disabled={isPending}
      defaultValue={locale}
      className={styles.local}
      onChange={(e) => onSwitcher(e.target.value)}
    >
      {routing.locales.map((loc) => (
        <option className={styles.btn} key={loc} value={loc}>
          {loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
