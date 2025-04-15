'use client';

import { useState } from 'react';
import styles from './ResponseViewer.module.scss';
import { useTheme } from '@/Store/Theme';
import { useFetch } from '@/Store/useFetch';
import { useLoader } from '@/Store/useLoader';
import Loader from '../Loader/Loader';

export default function ResponseViewer() {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const response = useFetch((state) => state.response);
  const error = useFetch((state) => state.error);
  const loadingState = useLoader();

  const data = error || response;
  if (!data)
    return (
      <div className={styles['resp-viewer']}>
        {loadingState && <Loader />}
        {!loadingState && 'No response yet. Try to get some data!'}
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
      {loadingState && <Loader />}
      {json && (
        <div className={styles['resp-copy-wrapper']}>
          <button className={styles['resp-copy-btn']} onClick={handleCopy}>
            {copied ? (
              '✅'
            ) : (
              <img
                className={styles['resp-copy-icon']}
                src={
                  theme === 'light'
                    ? '/icons/copy_light.svg'
                    : '/icons/copy_dark.svg'
                }
                alt="Copy"
              />
            )}
          </button>
        </div>
      )}
      {!loadingState && (
        <pre className={styles['resp-code-block']}>
          {lines.map((line, i) => (
            <div key={i} className={styles['resp-code-line']}>
              <span className={styles['resp-line-number']}>{i + 1}</span>
              <span className={styles['resp-line-text']}>{line}</span>
            </div>
          ))}
        </pre>
      )}
    </div>
  );
}
