'use client';
import { useTheme } from '@/Store/Theme';
import Image from 'next/image';
import styles from './Logo.module.scss';
import { redirect } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function Logo() {
  const theme = useTheme((store) => store.theme);
  const locale = useLocale();
  return (
    <Image
      onClick={() => redirect({ locale, href: '/about' })}
      src={`/logos/NR_${theme}.PNG`}
      alt="NeverREST Logo"
      width="60"
      height="60"
      priority
      className={styles.logo}
    />
  );
}
