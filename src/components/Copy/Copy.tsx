'use client';
import { useTheme } from '@/Store/Theme';
import styles from './Copy.module.scss';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Copy({ code }: { code: string }) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
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
