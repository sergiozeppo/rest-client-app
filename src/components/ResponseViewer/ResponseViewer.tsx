import styles from './ResponseViewer.module.scss';

type ResponseViewerProps = {
  data: object | string | null;
};

export default function ResponseViewer({ data }: ResponseViewerProps) {
  if (!data) return <div className={styles.viewer}>No response</div>;

  const json = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const lines = json.split('\n');

  return (
    <div className={styles['resp-viewer']}>
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
