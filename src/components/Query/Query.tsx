'use client';
import styles from './Query.module.scss';
import {
  SearchInput,
  SelectMethod,
  QueryParameters,
  QueryBody,
  CodeGenerator,
  VariablesTable,
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
        <VariablesTable />
      </div>
    </div>
  );
}
