'use client';
import { useFetch } from '@/Store/useFetch';
import styles from './Response.module.scss';
import { useState } from 'react';
import { ResponseViewer, HeadersViewer, ResponseStatus } from '@/components';

export default function Response() {
  const views = {
    Response: <ResponseViewer />,
    Headers: <HeadersViewer />,
  };
  type View = keyof typeof views;

  const [show, setShow] = useState<View>('Response');
  const headersCount = useFetch((state) => state.headersCount);

  return (
    <div className={styles.container}>
      <ResponseStatus />
      <div className={styles.body}>
        {Object.keys(views).map((key) => (
          <div
            key={key}
            className={`${styles.tab} ${show === key ? styles.active : ''}`}
            onClick={() => setShow(key as View)}
          >
            {key}
            {key === 'Headers' && headersCount > 0 && (
              <span className={styles.count}>{headersCount}</span>
            )}
          </div>
        ))}
      </div>
      <div className={styles.content}>{views[show]}</div>
    </div>
  );
}
