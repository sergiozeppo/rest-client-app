import { getTranslations } from 'next-intl/server';
import s from './SignIn.module.scss';
import { Link } from '@/i18n/navigation';
import SignInForm from '@/components/SignInForm/SignInForm';
import GithubSignInButton from '@/components/GithubSignInButton/GithubSignInButton';

export default async function SignIn() {
  const t = await getTranslations('Sign-in');

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
        <SignInForm />
        <h3 className={s.redirect}>
          {`${t('account')} `}
          <Link className={s.redirectLink} href="/sign-up">
            {t('redirect')}
          </Link>
        </h3>
      </div>
    </main>
  );
}
