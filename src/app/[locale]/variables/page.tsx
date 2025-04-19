'use client';
import dynamic from 'next/dynamic';
import s from './Variables.module.scss';
import { useTranslations } from 'next-intl';

const VariablesTable = dynamic(
  () => import('@/components/VariablesTable/VariablesTable'),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);

export default function VariablesPage() {
  const t = useTranslations('Variables');
  return (
    <div className={s.container}>
      <h2 className={s.title}>{t('title')}</h2>
      <VariablesTable />
    </div>
  );
}
