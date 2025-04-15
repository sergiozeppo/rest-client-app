'use client';

import styles from './HeadersViewer.module.scss';
import { useFetch } from '@/Store/useFetch';

export default function HeadersViewer() {
  const headers = useFetch((state) => state.headers);
  const error = useFetch((state) => state.error);
  const data = error || headers;

  if (!data)
    return (
      <div className={styles['hdrs-viewer']}>
        No headers yet. Try to get some data!
      </div>
    );

  const json = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const lines = json.split('\n');

  return (
    <div className={styles['hdrs-viewer']}>
      {json && (
        <div className={styles['hdrs-copy-wrapper']}>
          <button className={styles['hdrs-copy-btn']}></button>
        </div>
      )}
      <pre className={styles['hdrs-code-block']}>
        {lines.map((line, i) => (
          <div key={i} className={styles['hdrs-code-line']}>
            <span className={styles['hdrs-line-text']}>{line}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}
