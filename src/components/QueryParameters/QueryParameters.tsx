'use client';

import { useUrl } from '@/Store/useUrlStore';
import { useEffect } from 'react';
import styles from './QueryParameters.module.scss';
import { useTranslations } from 'next-intl';

export default function QueryParameters() {
  const t = useTranslations('QueryParameters');

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{t('title')}</h3>
        <button className={styles.btn} onClick={addItem}>
          {t('add')}
        </button>
      </div>
      {QueryItems.map(({ checked, id, key, value }) => (
        <div className={styles.item} key={id}>
          <input
            type="checkbox"
            id={id}
            className={styles.checkbox}
            defaultChecked={checked}
            onChange={() => setChecked(id)}
          />
          <label htmlFor={id} className={styles.label}></label>
          <input
            type="text"
            placeholder={t('key')}
            value={key}
            onChange={(e) => setKey(e.target.value, id)}
          />
          <input
            type="text"
            placeholder={t('value')}
            value={value}
            onChange={(e) => setValue(e.target.value, id)}
          />
          <button className={styles.btn} onClick={() => delValue(id)}>
            {t('delete')}
          </button>
        </div>
      ))}
    </div>
  );
}
