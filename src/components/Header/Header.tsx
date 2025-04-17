'use client';

import { useLocale, useTranslations } from 'next-intl';
import { LocaleSwitcher, ThemeSwitcher } from '@/components';
import styles from './Header.module.scss';
import { Link, redirect } from '@/i18n/navigation';
import { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import { signOut } from '@/utils/auth';
import { useSession } from '@/Store/useSession';

export default function Header() {
  const session = useSession();
  const [isSticky, setIsSticky] = useState(false);
  const locale = useLocale();

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

  const handleLogout = async () => {
    await signOut();
    redirect({
      locale: locale,
      href: '/',
    });
  };

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
        <div className={styles.buttons_auth}>
          {session ? (
            <>
              <Link href="/get" className={styles.btn}>
                {t('rest-client')}
              </Link>
              <button onClick={handleLogout} className={styles.btn}>
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className={styles.btn}>
                {t('sign_in')}
              </Link>
              <Link href="/sign-up" className={styles.btn}>
                {t('sign_up')}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
