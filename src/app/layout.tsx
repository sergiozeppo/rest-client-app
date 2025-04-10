import { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'NeverREST - App for testing REST APIs',
  description:
    'React, Typescript, Next.js (App Router API), SCSS, Zustand, Jest, i18n and more.',
  icons: {
    icon: 'logos/NR_light.png',
  },
};

export default function RootLayout({ children }: Props) {
  return children;
}
