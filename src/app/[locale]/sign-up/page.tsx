import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import s from './SignUp.module.scss';
import { Link } from '@/i18n/navigation';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import { FormData } from '@/utils/validation';
import { createClient } from '@/utils/supabase/server';
import { redirect } from '@/i18n/navigation';
import GitHubLogo from '@/components/GitHubLogo/GitHubLogo';

async function signUpAction(data: FormData) {
  'use server';
  const locale = await getLocale();
  const supabase = await createClient();

  const signUpData = {
    email: data.email,
    password: data.passwordForm.password,
  };

  const { error } = await supabase.auth.signUp(signUpData);

  if (error) {
    return { error: error.message };
  }

  redirect({
    locale: locale,
    href: '/',
  });
}

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

export default async function SignUp() {
  const t = await getTranslations('Sign-up');

  return (
    <main className={s.main}>
      <div className={s.container}>
        <h1 className={s.title}>{t('title')}</h1>
        <h2 className={s.subtitle}>{t('subtitle')}</h2>
        <button className={s.authButton} onClick={signInWithGithub}>
          {t('github')} <GitHubLogo width={30} height={30} />
        </button>
        <div className={s.divider}>
          <hr className={s.line} />
          <span>{t('divider')}</span>
          <hr className={s.line} />
        </div>
        <SignUpForm onSubmit={signUpAction} />
        <h3 className={s.redirect}>
          {`${t('account')} `}
          <Link className={s.redirectLink} href="/sign-in">
            {t('redirect')}
          </Link>
        </h3>
      </div>
    </main>
  );
}
