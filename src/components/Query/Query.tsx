'use client';
import { useState } from 'react';
import styles from './Query.module.scss';
import {
  SearchInput,
  SelectMethod,
  QueryParameters,
  QueryHistory,
  QueryBody,
} from '@/components';

export default function Query() {
  const views = {
    History: <QueryHistory />,
    Query: <QueryParameters />,
    'Headers and Body': <QueryBody />,
    Variables: <p>Component with Variables</p>,
  };
  type View = keyof typeof views;
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
