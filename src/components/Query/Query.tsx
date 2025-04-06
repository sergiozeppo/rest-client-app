'use client';
import { useState } from 'react';
import styles from './Query.module.scss';
import { SearchInput, SelectMethod, QueryParameters } from '@/components';

const views = {
  History: <p>Component with History</p>,
  Query: <QueryParameters />,
  Headers: <p>Component with HTTP Headers</p>,
  Body: <p>Component with Body</p>,
};
type View = keyof typeof views;

export default function Query() {
  const [show, setShow] = useState<View>('History');

  return (
    <div className={styles.container}>
      <div className={styles.query}>
        <SelectMethod />
        <SearchInput />
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
