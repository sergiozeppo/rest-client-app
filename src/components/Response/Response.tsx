'use client';
import styles from './Response.module.scss';
import { useState } from 'react';

const views = {
  Response: <p>Component with Response</p>,
  Headers: <p>Component with Headers</p>,
};

export default function Response() {
  const [show, setShow] = useState<keyof typeof views>('Response');

  return (
    <div className={styles.container}>
      <div className={styles.heder}>
        <p>Status: 123</p>
        <p>Size: 123 kb</p>
        <p>Time: 123 ms</p>
      </div>
      <div className={styles.body}>
        {Object.keys(views).map((key) => (
          <button key={key} onClick={() => setShow(key as keyof typeof views)}>
            {key}
          </button>
        ))}
      </div>
      {views[show]}
    </div>
  );
}
