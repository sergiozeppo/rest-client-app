import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ReactNode } from 'react';
import styles from './App.module.scss';
import { Header, Footer } from '@/components';
import { Geist, Geist_Mono, Fira_Code } from 'next/font/google';
import { ThemeSwitcher as ThemeProvider } from '@/components';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const geistCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <ThemeProvider
        className={`${geistSans.variable} ${geistMono.variable} ${geistCode.variable}`}
      >
        <NextIntlClientProvider>
          <Toaster
            duration={2000}
            expand={true}
            position="top-center"
            richColors
          />
          <div className={styles.app}>
            <Header />
            {children}
            <Footer />
          </div>
        </NextIntlClientProvider>
      </ThemeProvider>
    </html>
  );
}
