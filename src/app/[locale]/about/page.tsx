'use client';
import { MainButtons } from '@/components';
import styles from './About.module.scss';

export default function Page() {
  return (
    <>
      <header className={styles.welcome}>
        <h1>NeverREST</h1>
        <p>
          The modern way to test and manage your RESTful APIs! Never stop
          exploring, neverREST!
        </p>
        <MainButtons />
      </header>

      <section className={styles.section}>
        <h2 className={styles['section-heading']}>Why NeverREST?</h2>
        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles['feature-title-container']}>
              <img src="/icons/zap.png" alt="zap" />
              <h3>Fast & Intuitive</h3>
            </div>
            <p>
              Send API requests instantly and get real-time responses with
              beautiful formatting.
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles['feature-title-container']}>
              <img src="/icons/earth.png" alt="globe" />
              <h3>Internationalization</h3>
            </div>
            <p>
              Use the app in your preferred language with full i18n support.
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles['feature-title-container']}>
              <img src="/icons/lock.png" alt="lock" />
              <h3>Authentication</h3>
            </div>
            <p>
              Secure access with modern auth patterns like OAuth, JWT, and more.
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles['feature-title-container']}>
              <img src="/icons/history.png" alt="parchment" />
              <h3>History Tracking</h3>
            </div>
            <p>
              Every request is saved — review and re-run any of them whenever
              you need.
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles['feature-title-container']}>
              <img src="/icons/header.png" alt="header" />
              <h3>Custom Headers</h3>
            </div>
            <p>Full support for headers, tokens, cookies, and more.</p>
          </div>

          <div className={styles.feature}>
            <div className={styles['feature-title-container']}>
              <img src="/icons/sat.png" alt="satellite" />
              <h3>REST & Beyond</h3>
            </div>
            <p>Support for REST and more out of the box.</p>
          </div>
        </div>

        <h2 className={styles['section-heading']}>Meet the Team</h2>
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
                <p>TypeScript wizard, UI/UX and Open Source enthusiast.</p>
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
                <p>Supabase maestro, validation and registration guru.</p>
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
                <p>Fullstack innovator, UI/UX enthusiast and simply genius.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
