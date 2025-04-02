import { useTranslations } from 'next-intl';
import { LocaleSwitcher, ThemeSwitcher } from '@/components';
import styles from './Header.module.scss';

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
          <button className={styles.btn}>{t('Sign_In')}</button>
          <button className={styles.btn}>{t('Sign_up')}</button>
        </div>
      </div>
    </div>
  );
}
