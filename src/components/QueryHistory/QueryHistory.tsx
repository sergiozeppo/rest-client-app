'use client';
import { useTranslations } from 'next-intl';
import styles from './QueryHistory.module.scss';
import { useHistory } from '@/Store/History';
import { useUrl } from '@/Store/useUrlStore';
import { useRouter } from '@/i18n/navigation';

export default function QueryHistory() {
  const t = useTranslations('QueryHistory');
  const { history, delHistory, delAllHistory } = useHistory();
  const router = useRouter();
  const { setValueBase } = useUrl();

  function helperClick(method: string, url: string) {
    const { origin, pathname, search } = new URL(url);
    const base64 = btoa(encodeURIComponent(origin + pathname));
    setValueBase(origin + pathname);
    router.replace({
      pathname: `/${method}/${base64}${search}`,
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{t('title')}</h3>
        <button className={styles.btn} onClick={delAllHistory}>
          {t('deleteAll')}
        </button>
      </div>
      {history.map(({ id, method, url }) => (
        <div className={styles.item} key={id}>
          <div
            onClick={() => helperClick(method, url)}
            className={styles.method}
          >
            {method}
          </div>
          <div onClick={() => helperClick(method, url)} className={styles.url}>
            <p>{url}</p>
          </div>
          <button className={styles.btn} onClick={() => delHistory(id)}>
            {t('delete')}
          </button>
        </div>
      ))}
    </div>
  );
}
