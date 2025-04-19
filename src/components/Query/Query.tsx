'use client';
import styles from './Query.module.scss';
import {
  SearchInput,
  SelectMethod,
  QueryParameters,
  QueryBody,
  CodeGenerator,
} from '@/components';

export default function Query() {
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
      </div>
    </div>
  );
}
