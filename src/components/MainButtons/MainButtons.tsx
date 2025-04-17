'use client';
import { useSession } from '@/Store/useSession';
import styles from './MainButtons.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import { signOut } from '@/utils/auth';
import { Link, redirect } from '@/i18n/navigation';

export default function MainButtons() {
  const session = useSession();
  const t = useTranslations('Header');
  const locale = useLocale();

  const handleLogout = async () => {
    await signOut();
    redirect({
      locale: locale,
      href: '/',
    });
  };
  return (
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
  );
}
