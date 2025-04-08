import { useState } from 'react';
import styles from './ResponseViewer.module.scss';

type ResponseViewerProps = {
  data: object | string | null;
};

export default function ResponseViewer({ data }: ResponseViewerProps) {
  const [copied, setCopied] = useState(false);

  if (!data)
    return (
      <div className={styles.viewer}>
        No response yet. Try to get some data!
      </div>
    );

  const json = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const lines = json.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={styles['resp-viewer']}>
      {json && (
        <div className={styles['resp-copy-wrapper']}>
          <button className={styles['resp-copy-btn']} onClick={handleCopy}>
            {copied ? '✅' : 'Copy'}
          </button>
        </div>
      )}
      <div className={styles['resp-line-numbers']}>
        {lines.map((_, i) => (
          <div key={i} className={styles['resp-line-number']}>
            {i + 1}
          </div>
        ))}
      </div>
      <pre className={styles['resp-code-block']}>
        {lines.map((line, i) => (
          <div key={i} className={styles['resp-code-line']}>
            {line || '\u00A0'}
          </div>
        ))}
      </pre>
    </div>
  );
}
