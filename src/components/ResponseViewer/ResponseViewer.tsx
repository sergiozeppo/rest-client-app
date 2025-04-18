'use client';
import styles from './ResponseViewer.module.scss';
import { useFetch } from '@/Store/useFetch';
import { useLoader } from '@/hooks/useLoader';
import { Copy, Loader } from '@/components';

export default function ResponseViewer() {
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

  return (
    <div className={styles['resp-viewer']}>
      {loadingState && <Loader />}
      {json && <Copy code={json} />}
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
