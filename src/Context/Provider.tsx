'use client';
import { ReactNode } from 'react';
import { Context } from './Context';
import { useTheme } from '@/Store/Theme';

export type Theme = 'light' | 'dark';

type Props = {
  children: ReactNode;
  className: string;
};

export default function Provider({ children, className }: Props) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <Context.Provider value={{ theme, toggleTheme }}>
      <body className={theme + ' ' + className}>{children}</body>
    </Context.Provider>
  );
}
