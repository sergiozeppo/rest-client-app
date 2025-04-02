'use client';
import { useContext } from 'react';
import { Context } from '@/Context/Context';
import s from './ThemeSwitcher.module.scss';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(Context);
  return (
    <div className={s.theme} onClick={toggleTheme}>
      {theme == 'dark' ? '🌓' : '🌗'}
    </div>
  );
}
