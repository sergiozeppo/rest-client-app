'use client';
import { useState } from 'react';
import s from './Query.module.scss';

const methods = ['GET', 'POST', 'PUT', 'DELETE'];
const views = {
  History: <p>Component with History</p>,
  Query: <p>Component with Query</p>,
  Headers: <p>Component with HTTP Headers</p>,
  Body: <p>Component with Body</p>,
};

export default function Query() {
  const [vid, setVid] = useState<keyof typeof views>('History');

  return (
    <div className={s.container}>
      <div className={s.query}>
        <select name="method">
          {methods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
        <input name="query" className={s.input} type="text" />
        <button className={s.btn}>GO</button>
      </div>
      <div className={s.body}>
        {Object.keys(views).map((key) => (
          <button key={key} onClick={() => setVid(key as keyof typeof views)}>
            {key}
          </button>
        ))}
      </div>
      {views[vid]}
    </div>
  );
}
