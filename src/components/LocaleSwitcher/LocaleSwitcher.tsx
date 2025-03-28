'use client';
import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import s from './LocaleSwitcher.module.scss';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSwitcher(locale: string) {
    startTransition(() => {
      router.replace(pathname, { ...params, locale });
    });
  }

  return (
    <div>
      {routing.locales
        .filter((item) => item !== locale)
        .map((locale) => (
          <button
            className={s.btn}
            key={locale}
            disabled={isPending}
            onClick={() => onSwitcher(locale)}
          >
            {locale.toLocaleUpperCase()}
          </button>
        ))}
    </div>
  );
}
