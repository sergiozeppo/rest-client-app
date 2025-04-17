'use client';

import { useTheme } from '@/Store/Theme';
import Image from 'next/image';
import styles from './Logo.module.scss';
import { Link } from '@/i18n/navigation';

export default function Logo() {
  const { theme } = useTheme();

  return (
    <Link href="about">
      <Image
        src={`/logos/NR_${theme}.PNG`}
        alt="NeverREST Logo"
        width="60"
        height="60"
        priority
        className={styles.logo}
      />
    </Link>
  );
}
