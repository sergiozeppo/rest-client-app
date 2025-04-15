'use client';
import { useFetch } from '@/Store/useFetch';
import styles from './Response.module.scss';
import { useState } from 'react';
import { ResponseViewer, HeadersViewer } from '@/components';
import getColoringStatus from '@/utils/getColoringStatus/getColoringStatus';
import { getStatusText } from '@/utils/getStatusText/getStatusText';

const views = {
  Response: <ResponseViewer />,
  Headers: <HeadersViewer />,
};

type View = keyof typeof views;
export default function Response() {
  const [show, setShow] = useState<View>('Response');
  const status = useFetch((state) => state.status);
  const statusText = getStatusText(status);
  const time = useFetch((state) => state.time);
  const size = useFetch((state) => state.size);
  const coloringStatus = getColoringStatus({ status, time, size });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {status > 0 ? (
          <>
            <p>
              Status:{' '}
              <span
                style={{
                  fontWeight: 'bold',
                  color: coloringStatus.statusColor,
                }}
              >
                {status} {` "${statusText}"`}
              </span>
            </p>
            <p>
              Size:{' '}
              <span
                style={{ fontWeight: 'bold', color: coloringStatus.sizeColor }}
              >
                {size} kb
              </span>
            </p>
            <p>
              Time:{' '}
              <span
                style={{ fontWeight: 'bold', color: coloringStatus.timeColor }}
              >
                {time} ms
              </span>
            </p>
          </>
        ) : (
          <>
            <p>Status: </p>
            <p>Size: </p>
            <p>Time: </p>
          </>
        )}
      </div>
      <div className={styles.body}>
        {Object.keys(views).map((key) => (
          <button
            className={show == key ? `${styles.active}` : ''}
            key={key}
            onClick={() => setShow(key as View)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className={styles.content}>{views[show]}</div>
    </div>
  );
}
