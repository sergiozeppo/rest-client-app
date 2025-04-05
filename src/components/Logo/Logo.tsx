'use client';

import { useTheme } from '@/Store/Theme';
import Image from 'next/image';
import styles from './Logo.module.scss';

export default function Logo() {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === 'light' ? '/logos/NR_light.PNG' : '/logos/NR_dark.PNG'}
      alt="NeverREST Logo"
      width="60"
      height="60"
      className={styles.logo}
    />
  );
}
