'use client';
import s from './GithubSignInButton.module.scss';
import GitHubLogo from '../GitHubLogo/GitHubLogo';
import signInWithGithub from './signInWithGithub';

import { useTranslations } from 'next-intl';
export default function GithubSignInButton() {
  const t = useTranslations('Sign-up');

  return (
    <button className={s.authButton} onClick={signInWithGithub}>
      {t('github')} <GitHubLogo width={30} height={30} />
    </button>
  );
}
