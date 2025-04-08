'use client';
import { useFetch } from '@/Store/useFetch';
import styles from './Response.module.scss';
import { useState } from 'react';
import ResponseViewer from '../ResponseViewer/ResponseViewer';

const Resp = () => {
  const response = useFetch((state) => state.response);
  const error = useFetch((state) => state.error);
  return <ResponseViewer data={error || response} />;
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
  const status = useFetch((state) => state.status);
  const time = useFetch((state) => state.time);
  const size = useFetch((state) => state.size);
  return (
    <div className={styles.container}>
      <div className={styles.heder}>
        <p>Status: {status}</p>
        <p>Size: {size} kb</p>
        <p>Time: {time} ms</p>
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
