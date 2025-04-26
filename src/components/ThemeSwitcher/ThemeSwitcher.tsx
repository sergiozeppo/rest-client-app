'use client';
import { ReactNode } from 'react';
import s from './ThemeSwitcher.module.scss';
import { useTheme } from '@/Store/Theme';

type Props = {
  children?: ReactNode;
  className?: string;
};

export default function ThemeSwitcher({ children, className }: Props) {
  const { theme, setTheme } = useTheme();

  if (children) {
    return <body className={`${theme} ${className}`}>{children}</body>;
  }

  return (
    <div className={s.theme} onClick={setTheme}>
      {theme == 'dark' ? '🌓' : '🌗'}
    </div>
  );
}
