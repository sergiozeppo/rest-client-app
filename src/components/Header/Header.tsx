import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components';
import styles from './Header.module.scss';

export default function Header() {
  const t = useTranslations('Header');
  return (
    <div className={styles.title}>
      <img
        src="https://raw.githubusercontent.com/rolling-scopes-school/tasks/refs/heads/master/react/assets/rss-logo.svg"
        alt="Course Logo"
        className={styles.logo}
      />
      <div>
        <LocaleSwitcher />
      </div>
      <div>
        <button className={styles.btn}>{t('Sign_In')}</button>
        <button className={styles.btn}>{t('Sign_up')}</button>
      </div>
    </div>
  );
}
