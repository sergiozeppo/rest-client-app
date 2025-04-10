import { getTranslations } from 'next-intl/server';
import s from './GithubSignInButton.module.scss';
import { createClient } from '@/utils/supabase/server';
import { getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';

import GitHubLogo from '../GitHubLogo/GitHubLogo';

async function signInWithGithub() {
  'use server';

  const supabase = await createClient();
  const locale = await getLocale();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect({
      locale: locale,
      href: data.url,
    });
  }
}

export default async function GithubSignInButton() {
  const t = await getTranslations('Sign-up');

  return (
    <button className={s.authButton} onClick={signInWithGithub}>
      {t('github')} <GitHubLogo width={30} height={30} />
    </button>
  );
}
