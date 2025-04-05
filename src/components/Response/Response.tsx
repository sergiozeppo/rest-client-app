'use client';
import { useFetch } from '@/Store/useFetch';
import styles from './Response.module.scss';
import { useState } from 'react';

const Resp = () => {
  const response = useFetch((state) => state.response);
  return <pre>{JSON.stringify(response, null, 2)}</pre>;
};
const Head = () => {
  const response = useFetch((state) => state.headers);
  return <pre>{JSON.stringify(response, null, 2)}</pre>;
};

const views = {
  Response: <Resp />,
  Headers: <Head />,
};

type View = keyof typeof views;
export default function Response() {
  const [show, setShow] = useState<View>('Response');

  return (
    <div className={styles.container}>
      <div className={styles.heder}>
        <p>Status: 123</p>
        <p>Size: 123 kb</p>
        <p>Time: 123 ms</p>
      </div>
      <div className={styles.body}>
        {Object.keys(views).map((key) => (
          <button key={key} onClick={() => setShow(key as View)}>
            {key}
          </button>
        ))}
      </div>
      {views[show]}
    </div>
  );
}
