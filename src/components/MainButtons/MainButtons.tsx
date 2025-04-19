'use client';
import { useSession } from '@/hooks/useSession';
import styles from './MainButtons.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import { Link, redirect } from '@/i18n/navigation';
import { signOut } from '@/utils/auth';
import { toast } from 'sonner';

export type OriginType = 'header' | 'main';

interface MainButtonsProps {
  origin: OriginType;
}

export default function MainButtons({ origin }: MainButtonsProps) {
  const session = useSession();
  const t = useTranslations('Header');
  const locale = useLocale();

  const handleLogout = async () => {
    await signOut();
    toast.success('Bye!');
    redirect({
      locale: locale,
      href: '/',
    });
  };

  return (
    <div className={styles.buttons_auth}>
      {session ? (
        <>
          {origin === 'header' ? (
            <>
              <Link href="/about" className={styles.btn}>
                {t('main')}
              </Link>
              <button onClick={handleLogout} className={styles.btn}>
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <Link href="/get" className={styles.btn}>
                {t('rest-client')}
              </Link>
              <Link href="/history" className={styles.btn}>
                {t('history')}
              </Link>
              <Link href="/variables" className={styles.btn}>
                {t('variables')}
              </Link>
            </>
          )}
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
