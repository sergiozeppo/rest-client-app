import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/en.json';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import { ReactElement } from 'react';

export const mockRouter = (ui: ReactElement) => {
  return render(
    <ThemeSwitcher>
      <NextIntlClientProvider locale="en" messages={messages}>
        {ui}
      </NextIntlClientProvider>
    </ThemeSwitcher>
  );
};
