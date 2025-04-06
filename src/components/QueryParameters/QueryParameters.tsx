'use client';

import { useUrl } from '@/Store/useUrlStore';
import { useEffect } from 'react';

export default function QueryParameters() {
  const {
    QueryItems,
    setChecked,
    setValue,
    setQuery,
    setKey,
    delValue,
    addItem,
  } = useUrl();

  useEffect(() => {
    const queryObj = Object.fromEntries(
      QueryItems.filter(({ checked, key }) => checked && key).map(
        ({ key, value }) => [key, value]
      )
    );
    setQuery(queryObj, false);
  }, [QueryItems, setQuery]);

  return (
    <>
      <h3>Query Parameters</h3>
      <button onClick={addItem}>add Query Parameters</button>
      {QueryItems.map(({ checked, id, key, value }) => (
        <div key={id}>
          <input
            type="checkbox"
            defaultChecked={checked}
            onChange={() => setChecked(id)}
          />
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value, id)}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value, id)}
          />
          <button onClick={() => delValue(id)}>Delete</button>
        </div>
      ))}
    </>
  );
}
