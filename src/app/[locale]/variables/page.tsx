'use client';
import dynamic from 'next/dynamic';
import s from './Variables.module.scss';

const VariablesTable = dynamic(
  () => import('@/components/VariablesTable/VariablesTable'),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);

export default function VariablesPage() {
  return (
    <div className={s.container}>
      <VariablesTable />
    </div>
  );
}
