'use client';
import Link from 'next/link';
import styles from './Query.module.scss';
import {
  SearchInput,
  SelectMethod,
  QueryParameters,
  QueryBody,
  CodeGenerator,
} from '@/components';
import { useTranslations } from 'next-intl';

export default function Query() {
  const t = useTranslations('Header');

  return (
    <div className={styles.container}>
      <div className={styles.query}>
        <SelectMethod />
        <SearchInput />
      </div>
      <div className={styles.content}>
        <QueryParameters />
        <QueryBody />
        <CodeGenerator />
        <div className={styles.buttons}>
          <Link href="/history" className={styles.btn}>
            {t('history')}
          </Link>
          <Link href="/variables" className={styles.btn}>
            {t('variables')}
          </Link>
        </div>
      </div>
    </div>
  );
}
