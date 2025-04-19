'use client';
import React from 'react';
import { replaceVariables } from '@/utils/variables/variableInsert';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './QueryBody.module.scss';
import { HeaderType, useHeadersBody } from '@/Store/useHeadersBody';
import { useRouter } from '@/i18n/navigation';
import { encodeBase64 } from '@/utils/base64';
import { useUrl } from '@/Store/useUrlStore';

export default function QueryBody() {
  const router = useRouter();
  const { params, query } = useUrl();
  const headers = ['application/json', 'text/plain'];
  const { header, setHeaders, body } = useHeadersBody();
  const [value, setValue] = useState('');
  useEffect(() => {
    try {
      setValue(JSON.stringify(JSON.parse(body), null, 2));
    } catch {
      setValue(body);
    }
  }, [body]);
  const lineCount = value.split('\n').length;
  const validJson = ((str) => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  })(value);

  const handleBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const processedBody = replaceVariables(e.target.value);
    const base = encodeBase64(processedBody);
    router.replace({
      pathname: `/${params.method || 'get'}/${params.url || ''}/${base}`,
      query,
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headers}>
          <h3>Headers</h3>
          <label className={styles.select} htmlFor="Content-Type">
            Content-Type:{' '}
          </label>
          <select
            id="Content-Type"
            className={styles.select}
            value={header}
            onChange={(e) => setHeaders(e.target.value as HeaderType)}
          >
            {headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>
        <h3>Body</h3>
      </div>
      <div className={styles['resp-viewer']}>
        <div className={styles['resp-editor-wrapper']}>
          <div className={styles['resp-line-numbers']}>
            {header === 'application/json' && value.length > 0 && (
              <p
                data-testid="json-status"
                className={`${styles.status}  ${validJson ? styles.valid : styles.invalid}`}
              >
                {validJson ? 'Valid' : 'inValid'} JSON
              </p>
            )}
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i} className={styles['resp-line-number']}>
                {i + 1}
              </div>
            ))}
          </div>
          <textarea
            className={styles['resp-textarea']}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBody}
            spellCheck={false}
          />
        </div>
      </div>
    </>
  );
}
