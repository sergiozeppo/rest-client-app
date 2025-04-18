import MainButtons from '@/components/MainButtons/MainButtons';
import styles from './About.module.scss';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('About');
  return (
    <>
      <header className={styles.welcome}>
        <h1>NeverREST</h1>
        <p>{t('subtitle')}</p>
        <MainButtons />
      </header>

      <section className={styles.section}>
        <h2 className={styles['section-heading']}>{t('why')}</h2>
        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles['feature-title-container']}>
              <img src="/icons/zap.png" alt="zap" />
              <h3>{t('feature-fast')}</h3>
            </div>
            <p>{t('feature-fast-desc')}</p>
          </div>

          <div className={styles.feature}>
            <div className={styles['feature-title-container']}>
              <img src="/icons/earth.png" alt="globe" />
              <h3>{t('feature-global')}</h3>
            </div>
            <p>{t('feature-global-desc')}</p>
          </div>

          <div className={styles.feature}>
            <div className={styles['feature-title-container']}>
              <img src="/icons/lock.png" alt="lock" />
              <h3>{t('feature-auth')}</h3>
            </div>
            <p>{t('feature-auth-desc')}</p>
          </div>

          <div className={styles.feature}>
            <div className={styles['feature-title-container']}>
              <img src="/icons/history.png" alt="parchment" />
              <h3>{t('feature-history')}</h3>
            </div>
            <p>{t('feature-history-desc')}</p>
          </div>

          <div className={styles.feature}>
            <div className={styles['feature-title-container']}>
              <img src="/icons/header.png" alt="header" />
              <h3>{t('feature-headers')}</h3>
            </div>
            <p>{t('feature-headers-desc')}</p>
          </div>

          <div className={styles.feature}>
            <div className={styles['feature-title-container']}>
              <img src="/icons/sat.png" alt="satellite" />
              <h3>{t('feature-rest')}</h3>
            </div>
            <p>{t('feature-rest-desc')}</p>
          </div>
        </div>

        <h2 className={styles['section-heading']}>{t('team-title')}</h2>
        <div className={styles.team}>
          <div className={styles.member}>
            <div className={styles['member-inner']}>
              <div className={styles['member-front']}>
                <img
                  src="https://avatars.githubusercontent.com/u/149455058?v=4"
                  alt="Dev 1"
                />
                <h3>Sergey Tsepodoy</h3>
              </div>
              <div className={styles['member-back']}>
                <h3>Frontend Developer</h3>
                <p>{t('sergey')}</p>
              </div>
            </div>
          </div>

          <div className={styles.member}>
            <div className={styles['member-inner']}>
              <div className={styles['member-front']}>
                <img
                  src="https://avatars.githubusercontent.com/u/98821210?v=4"
                  alt="Dev 3"
                />
                <h3>Kamil Rogowski</h3>
              </div>
              <div className={styles['member-back']}>
                <h3>Frontend Developer</h3>
                <p>{t('kamil')}</p>
              </div>
            </div>
          </div>

          <div className={styles.member}>
            <div className={styles['member-inner']}>
              <div className={styles['member-front']}>
                <img
                  src="https://avatars.githubusercontent.com/u/117648644?v=4"
                  alt="Dev 2"
                />
                <h3>Viktor Yelantsev</h3>
              </div>
              <div className={styles['member-back']}>
                <h3>Frontend Developer</h3>
                <p>{t('viktor')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
