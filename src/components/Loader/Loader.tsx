'use client';
import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={styles['loading-container']}>
      <div className={styles.loading}></div>
    </div>
  );
}
