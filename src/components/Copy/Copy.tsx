'use client';
import { useTheme } from '@/Store/Theme';
import styles from './Copy.module.scss';
import { useState } from 'react';

export default function Copy({ code }: { code: string }) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.btn} onClick={handleCopy}>
        {copied ? (
          '✅'
        ) : (
          <img
            className={styles.icon}
            src={`/icons/copy_${theme}.svg`}
            alt="Copy"
          />
        )}
      </button>
    </div>
  );
}
