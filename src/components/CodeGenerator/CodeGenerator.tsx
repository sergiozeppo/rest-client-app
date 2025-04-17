'use client';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import styles from './CodeGenerator.module.scss';
import { useUrl } from '@/Store/useUrlStore';
import { useHeadersBody } from '@/Store/useHeadersBody';
import { Copy } from '@/components';

const languages = [
  { label: 'JavaScript (Fetch)', client: 'javascript', variant: 'fetch' },
  { label: 'JavaScript (Axios)', client: 'javascript', variant: 'axios' },
  { label: 'JavaScript (XHR)', client: 'javascript', variant: 'xhr' },
  { label: 'Node.js', client: 'node', variant: 'native' },
  { label: 'Node.js (Fetch)', client: 'node', variant: 'fetch' },
  { label: 'Python', client: 'python', variant: 'requests' },
  { label: 'Java', client: 'java', variant: 'okhttp' },
  { label: 'C#', client: 'csharp', variant: 'httpclient' },
  { label: 'Go', client: 'go', variant: 'native' },
];

export default function CodeGenerator() {
  const [lang, setLang] = useState(languages[0]);
  const [code, setCode] = useState('Loading...');

  const method = useUrl((store) => store.method);
  const url = useUrl((store) => store.value);
  const contentType = useHeadersBody((store) => store.header);
  const body = useHeadersBody((store) => store.body);

  const sampleRequest = useMemo(() => {
    return {
      method,
      url,
      ...((method === 'POST' || method === 'PUT') && {
        headers: [{ name: 'Content-Type', value: contentType }],
        postData: {
          mimeType: contentType,
          text: body,
        },
      }),
    };
  }, [method, url, contentType, body]);

  useEffect(() => {
    const generate = async () => {
      try {
        const res = await fetch('/api/generateCode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            request: sampleRequest,
            client: lang.client,
            variant: lang.variant,
          }),
        });

        const data = await res.json();
        setCode(data.code || data.error);
      } catch (err) {
        setCode('Error generating code.');
        console.error(err);
      }
    };

    generate();
  }, [lang, sampleRequest]);

  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    const selected = languages.find((l) => l.label === e.target.value);
    if (selected) setLang(selected);
  }

  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <h3>Generated Code</h3>
        <label htmlFor="lang">Language:</label>
        <select id="lang" value={lang.label} onChange={onChange}>
          {languages.map((l) => (
            <option key={l.label} value={l.label}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <pre className={styles.code}>
        <Copy code={code} />
        <code>{code}</code>
      </pre>
    </div>
  );
}
