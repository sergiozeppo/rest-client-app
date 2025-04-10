'use client';
import styles from './QueryBody.module.scss';
import { HeaderType, useHeadersBody } from '@/Store/useHeadersBody';

export default function EditableCodeEditor() {
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
  console.log(header);
  return (
    <>
      <div className={styles.container}>
        <div>
          <p className={styles.title}>Headers</p>
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
        <p className={styles.title}>Body</p>
      </div>
      <div className={styles['resp-viewer']}>
        <div className={styles['resp-editor-wrapper']}>
          <div className={styles['resp-line-numbers']}>
            {header === 'application/json' && (
              <p
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
