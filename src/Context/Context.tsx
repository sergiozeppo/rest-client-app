'use client';
import { createContext } from 'react';
import { Theme } from './Provider';

type Context = {
  theme: Theme;
  toggleTheme: () => void;
};

export const Context = createContext({} as Context);
