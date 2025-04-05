'use client';
import { useTranslations } from 'next-intl';
import styles from './ButtonGO.module.scss';
import { useFetch } from '@/Store/useFetch';

export default function ButtonGO() {
  const t = useTranslations('ButtonGO');
  const fetch = useFetch((state) => state.fetch);

  return (
    <button onClick={fetch} className={styles.btn}>
      {t('go')}
    </button>
  );
}
