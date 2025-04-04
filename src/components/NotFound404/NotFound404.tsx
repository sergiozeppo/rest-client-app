import Link from 'next/link';
import styles from './NotFound404.module.css';

export default function NotFound404() {
  return (
    <div className={styles['not-found-404-container']}>
      <div className={styles['not-found-404']}>
        <h2>Oops! Page Not Found</h2>
        <div className={styles['not-found-404-img']} />
        <Link className={styles['not-found-404-link']} href="/">
          Back to main page
        </Link>
      </div>
    </div>
  );
}
