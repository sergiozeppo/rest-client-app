'use client';

import { useTheme } from '@/Store/Theme';
import Image from 'next/image';
import styles from './Logo.module.scss';
import Link from 'next/link';

export default function Logo() {
  const { theme } = useTheme();

  return (
    <Link href="/">
      <Image
        src={theme === 'light' ? '/logos/NR_light.PNG' : '/logos/NR_dark.PNG'}
        alt="NeverREST Logo"
        width="60"
        height="60"
        priority
        className={styles.logo}
      />
    </Link>
  );
}
