import { useTranslations } from 'next-intl';
import { LocaleSwitcher, ThemeSwitcher } from '@/components';
import styles from './Header.module.scss';
import { Link } from '@/i18n/navigation';

export default function Header() {
  const t = useTranslations('Header');
  return (
    <div className={styles.container}>
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
