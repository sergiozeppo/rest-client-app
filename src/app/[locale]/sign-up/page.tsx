import { getLocale, getTranslations } from 'next-intl/server';
import s from './SignUp.module.scss';
import { Link } from '@/i18n/navigation';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import { FormData } from '@/utils/validation';
import { redirect } from '@/i18n/navigation';
import { createClient } from '@/utils/supabase/server';
import GithubSignInButton from '@/components/GithubSignInButton/GithubSignInButton';

async function signUpAction(data: FormData) {
  'use server';
  const locale = await getLocale();
  const supabase = await createClient();

  const signUpData = {
    email: data.email,
    password: data.passwordForm.password,
    options: {
      data: {
        user_name: data.username,
      },
    },
  };

  const { error } = await supabase.auth.signUp(signUpData);

  if (error) {
    return { error: error.message };
  }

  await supabase.auth.signOut();
  redirect({
    locale: locale,
    href: '/sign-in',
  });
}

export default async function SignUp() {
  const t = await getTranslations('Sign-up');

  return (
    <main className={s.main}>
      <div className={s.container}>
        <h1 className={s.title}>{t('title')}</h1>
        <h2 className={s.subtitle}>{t('subtitle')}</h2>
        <GithubSignInButton />
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
