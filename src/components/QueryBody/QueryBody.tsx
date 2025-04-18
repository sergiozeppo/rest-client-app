'use client';
import styles from './QueryBody.module.scss';
import { HeaderType, useHeadersBody } from '@/Store/useHeadersBody';

export default function QueryBody() {
  const headers = ['application/json', 'text/plain'];
  const { header, setHeaders, body, setBody } = useHeadersBody();

  const lineCount = body.split('\n').length;
  const validJson = ((str) => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  })(body);

  return (
    <>
      <div className={styles.container}>
        <div>
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
            {header === 'application/json' && (
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
            value={body}
            onChange={(e) => setBody(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>
    </>
  );
}
