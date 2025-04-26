'use client';
import { useTranslations } from 'next-intl';
import styles from './History.module.scss';
import { useHistory } from '@/Store/History';
import { useUrl } from '@/Store/useUrlStore';
import { Link, useRouter } from '@/i18n/navigation';
import { encodeBase64 } from '@/utils/base64';

export default function History() {
  const t = useTranslations('History');
  const { history, delHistory, delAllHistory } = useHistory();
  const router = useRouter();
  const { setValueBase } = useUrl();

  function helperClick(method: string, url: string) {
    try {
      const { origin, pathname, search } = new URL(url);
      const base64 = encodeBase64(origin + pathname);
      setValueBase(origin + pathname);
      router.replace({
        pathname: `/${method.toLowerCase()}/${base64}${search}`,
      });
    } catch {
      router.replace({
        pathname: `/${method}`,
      });
    }
  }

  return (
    <div className={styles.container}>
      {history.length === 0 ? (
        <>
          <div className={styles.empty}>
            <p>{t('empty')}</p>
          </div>
          <Link href="/get" className={styles.btn}>
            {t('rest-client')}
          </Link>
        </>
      ) : (
        <>
          <Link href="/get" className={styles.btn}>
            {t('rest-client')}
          </Link>
          <div className={styles.header}>
            <h3>{t('title')}</h3>
            <div>
              <button className={styles.btn} onClick={delAllHistory}>
                {t('deleteAll')}
              </button>
            </div>
          </div>
        </>
      )}
      {history.map(({ id, method, url }) => (
        <div className={styles.item} key={id}>
          <div
            onClick={() => helperClick(method, url)}
            className={styles.method}
          >
            {method}
          </div>
          <div onClick={() => helperClick(method, url)} className={styles.url}>
            {url}
          </div>
          <button className={styles.btn} onClick={() => delHistory(id)}>
            {t('delete')}
          </button>
        </div>
      ))}
    </div>
  );
}
