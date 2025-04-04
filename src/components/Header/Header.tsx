'use client';

import { useTranslations } from 'next-intl';
import { LocaleSwitcher, ThemeSwitcher } from '@/components';
import styles from './Header.module.scss';
import { Link } from '@/i18n/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isSwitchToSticky = window.scrollY > 20;
      if (isSwitchToSticky !== isSticky) {
        setIsSticky(isSwitchToSticky);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

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
          <Link href="/sign-in" className={styles.btn}>
            {t('Sign_In')}
          </Link>
          <Link href="/sign-up" className={styles.btn}>
            {t('Sign_up')}
          </Link>
        </div>
      </div>
    </div>
  );
}
