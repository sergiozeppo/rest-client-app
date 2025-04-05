'use client';
import { useState } from 'react';
import styles from './Query.module.scss';
import { SearchInput, SelectMethod } from '@/components';

const views = {
  History: <p>Component with History</p>,
  Query: <p>Component with Query</p>,
  Headers: <p>Component with HTTP Headers</p>,
  Body: <p>Component with Body</p>,
};

export default function Query() {
  const [show, setShow] = useState<keyof typeof views>('History');

  return (
    <div className={styles.container}>
      <div className={styles.query}>
        <SelectMethod />
        <SearchInput />
      </div>
      <div className={styles.body}>
        {Object.keys(views).map((key) => (
          <button key={key} onClick={() => setShow(key as keyof typeof views)}>
            {key}
          </button>
        ))}
      </div>
      <div className={styles.content}>{views[show]}</div>
    </div>
  );
}
