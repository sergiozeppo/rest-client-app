'use client';

import styles from './HeadersViewer.module.scss';
import { useFetch } from '@/Store/useFetch';

export default function HeadersViewer() {
  const headers = useFetch((state) => state.headers);
  const error = useFetch((state) => state.error);
  const data = error || headers;

  if (!data) {
    return (
      <div className={styles['hdrs-viewer']}>
        No headers yet. Try to get some data!
      </div>
    );
  }

  let parsed: Record<string, string> = {};

  const raw =
    typeof data === 'string' ? data.replace(/\\/g, '') : JSON.stringify(data);
  parsed = JSON.parse(raw);

  return (
    <div className={styles['hdrs-viewer']}>
      <div className={styles['hdrs-table']}>
        <div className={styles['hdrs-row'] + ' ' + styles['hdrs-header']}>
          <div className={styles['hdrs-cell']}>Header</div>
          <div className={styles['hdrs-cell']}>Value</div>
        </div>
        {Object.entries(parsed).map(([key, value], i) => (
          <div key={i} className={styles['hdrs-row']}>
            <div className={styles['hdrs-cell']}>{key}</div>
            <div className={styles['hdrs-cell']}>
              {typeof value === 'object'
                ? JSON.stringify(value, null, 2).replace(/\\/g, '')
                : value?.toString().replace(/\\/g, '')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
