'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { LocaleSwitcher, ThemeSwitcher, MainButtons, Logo } from '@/components';
import styles from './Header.module.scss';
import { useSession } from '@/Store/useSession';

export default function Header() {
  const session = useSession();
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
      <div className={styles.nav_container}>
        <Logo />
      </div>
      {session && (
        <span className={styles.welcome}>
          {t('welcome', {
            username:
              session.user.user_metadata.user_name || session.user.email,
          })}
        </span>
      )}
      <div className={styles.buttons_container}>
        <div className={styles.buttons_switcher}>
          <LocaleSwitcher />
          <ThemeSwitcher />
        </div>
        <MainButtons />
      </div>
    </div>
  );
}
