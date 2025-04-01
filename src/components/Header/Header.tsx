import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components';
import s from './Header.module.scss';

export default function Header() {
  const t = useTranslations('Header');
  return (
    <div className={s.title}>
      <h2>Logo</h2>
      <div>
        <LocaleSwitcher />
      </div>
      <div>
        <button className={s.btn}>{t('Sign_In')}</button>
        <button className={s.btn}>{t('Sign_up')}</button>
      </div>
    </div>
  );
}
