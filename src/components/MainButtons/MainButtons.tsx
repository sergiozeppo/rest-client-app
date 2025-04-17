'use client';

import { useSession } from '@/Store/useSession';
import styles from './MainButtons.module.scss';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function MainButtons() {
  const session = useSession();
  const t = useTranslations('Header');

  return (
    <div className={styles.actions}>
      {!session && (
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
