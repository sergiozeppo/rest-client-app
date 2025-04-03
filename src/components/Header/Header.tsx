'use client';

import { useTranslations } from 'next-intl';
import { LocaleSwitcher, ThemeSwitcher } from '@/components';
import styles from './Header.module.scss';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleStickyHeader = () => {
      setIsSticky(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleStickyHeader);
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const t = useTranslations('Header');
  return (
    <div
      className={
        isSticky ? `${styles.container} ${styles.sticky}` : styles.container
      }
    >
      <img
        src="https://raw.githubusercontent.com/rolling-scopes-school/tasks/refs/heads/master/react/assets/rss-logo.svg"
        alt="Course Logo"
        className={styles.logo}
      />
      <div className={styles.buttons_container}>
        <div className={styles.buttons_switcher}>
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
        <div className={styles.buttons_auth}>
          <button className={styles.btn}>{t('Sign_In')}</button>
          <button className={styles.btn}>{t('Sign_up')}</button>
        </div>
      </div>
    </div>
  );
}
