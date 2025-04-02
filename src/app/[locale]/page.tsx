import { getTranslations } from 'next-intl/server';
import styles from './App.module.scss';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <main className={styles.main}>
      <h2>{t('title')}</h2>
    </main>
  );
}
